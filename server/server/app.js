const mongoose = require("mongoose");
const User = require("./models/User");
const { loginRest, signupRest } = require("./functions/api");
const express = require("express");
const app = express();
const port = process.env.PORT || 3300
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
mongoose.connect(
  "mongodb://mongo:R5DgDJKMImzdVeMbDnek@containers-us-west-38.railway.app:6574"
);
app.use(cors());
const axios = require("axios");
const midtransClient = require('midtrans-client');

app.post("/register", async (req, res, next) => {
  try {
    let { username, password, email, firstName, lastName } = req.body;
    if(!username || !password || !email) {
      throw {name: 'emptyInput'}
    }
    // console.log('masuk');
    const user = await User.create({
      username: username,
      password: bcrypt.hashSync(password, 10),
      email: email,
      firstName: firstName,
      lastName: lastName,
      premium: false,
      verified: false,
      donation: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // console.log(user);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    // res.status(400).json({ message: err.message });
    next(err)
    
  }
});

app.post("/login", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    if (!username) {
      throw { name: "emptyUsername" };
    }
    if (!password) {
      throw { name: "emptyPassword" };
    }

    let user = await User.where({ username: username }).findOne();
    if (!user) {
      throw { name: "invalidCredential" };
    }

    let decoded = bcrypt.compare(password, user.password);
    if (!decoded) {
      throw { name: "invalidCredential" };
    }

    let access_token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        username: user.username,
      },
      "secret"
    );
    // let response = await loginRest(username, password)
    // console.log('YA/');
    res.status(200).json({ access_token: access_token});
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//authentication
app.use(async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalidToken" };
    }

    let decoded = jwt.verify(access_token, "secret");
    let user = await User.where({ username: decoded.username }).findOne();
    if (!user) {
      throw { name: "invalidToken" };
    }
    req.user = {
      email: user.email,
      id: user.id,
      username: user.username,
    };
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get('/steam/:search', async(req, res, next) => {
  let search = req.params.search
  // console.log(search);
  const options = {
      method: 'GET',
      url: `https://steam2.p.rapidapi.com/search/${search}/page/1`,
      headers: {
          'X-RapidAPI-Key': '1fe214384amsha2c25189db25f1fp1820cajsn065a8a6e4904',
          'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
      }
      };
      
      axios.request(options).then(function (response) {
      //   console.log(response.data);
      response.data.forEach(el => {
          // console.log(el.reviewSummary);
          if(el.reviewSummary) {
              el.reviewSummary = el.reviewSummary.split('<br>')
          } else {
              el.reviewSummary = ['','']
          }
      })
      res.status(200).json(response.data)
      }).catch(function (error) {
          console.error(error);
          next(error)
      });
})

app.get('/gameDetail/:id', async (req, res, next) => {
  let id = req.params.id
  // console.log(id, 'IDLOH');
  const options = {
      method: 'GET',
      url: `https://steam2.p.rapidapi.com/appDetail/${id}`,
      headers: {
        'X-RapidAPI-Key': '1fe214384amsha2c25189db25f1fp1820cajsn065a8a6e4904',
        'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
        // console.log(response.data);
      res.status(200).json(response.data)
    }).catch(function (error) {
        console.error(error);
        
    });
})

app.get('/gameReview/:id', async (req, res, next) => {
  let id = req.params.id
  const options = {
      method: 'GET',
      url: `https://steam2.p.rapidapi.com/appReviews/${id}/limit/40/*`,
      headers: {
        'X-RapidAPI-Key': '1fe214384amsha2c25189db25f1fp1820cajsn065a8a6e4904',
        'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
      }
  };
  // console.log(req.params.id, 'AKULOH');
  axios.request(options).then(function (response) {
      // console.log(response.data);
      res.status(200).json(response.data)
  }).catch(function (error) {
      console.error(error);
  });
})

app.post('/QR', async (req, res, next) => {
  try {
    let {link} = req.body
    // console.log(req.body, 'MASUK QR');
      let { data } = await axios({
          method: 'POST',
          url: `https://api.qr-code-generator.com/v1/create?access-token=eHjGkHeaGcR7okFj_6aK_4twKD281w1j_JXfZ2fbCaGuD-cjPETH4PoqhBXEwYdD`,
          data: {
              "frame_name": "no-frame",
              "qr_code_text": `${link}`,
              "image_format": "SVG",
              "background_color": "#ffffff",
              "foreground_color": "#fa6e79",
              "marker_right_inner_color": "#2d7cda",
              "marker_right_outer_color": "#00bfff",
              "marker_left_template": "version13",
              "marker_right_template": "version13",
              "marker_bottom_template": "version13"
          }
      })
      // console.log('LEWAT QR');
      // console.log(data, 'QR+++++')
      res.status(200).json(data)
  } catch (err) {
      console.log(err)
      next(err)
  }
})

app.patch('/donate', async (req, res, next) => {
  try {
    console.log('MASUK DON');
    let donation = req.body.donation
    let userId = req.user.id
    console.log(userId);
    let user = await User.updateOne({_id: userId}, {$inc: {donation: donation}})
    // console.log(user, 'Success donate');
    res.status(201).json({message: 'OK'})
  } catch (err) {
    console.log(err)
    next(err)
  }
})

app.post('/midtransToken', async (req, res, next) => {
  try {
    let user = User.findById(req.user.id)
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction : false,
      serverKey : 'SB-Mid-server-2E3D0SXDuX9ed-pPsPMGUn2p'
    })
    
    let donation = req.body.donation
    let parameter = {
      "transaction_details": {
          "order_id": "Transaction_ID_" + Math.floor(100000 + Math.random() * 99999),
          "gross_amount": donation
      },
      "credit_card":{
          "secure" : true
      },
      "customer_details": {
          "first_name": user.firstName,
          "last_name": user.lastName,
          "email": user.email
      }
    }
    // console.log(donation, 'MASUK bwh');
    const midtransToken = await snap.createTransaction(parameter)
    // console.log(midtransToken ,'MASUK bwhnya');
    res.status(201).json(midtransToken)
  } catch (err) {
    console.log(err)
  }
})

app.get("/user", async (req, res, next) => {
  try {
    let all = await User.find();
    // console.log(all);
    res.status(200).json(all);
  } catch (err) {
    console.log(err);
  }
});

//error handler
app.use((err, req, res, next) => {
  if (err.name === "invalidCredential") {
    res.status(401).json({ message: "Wrong email or password" });
  } else if (err.name === "emptyUsername") {
    res.status(400).json({ message: "Username is required" });
  } else if (err.name === "emptyPassword") {
    res.status(400).json({ message: "Password is required" });
  } else if (err.name === "JsonWebTokenError") {
    res.status(400).json({ message: "Invalid token" });
  } else if (err.name === "invalidToken") {
    res.status(400).json({ message: "Invalid token" });
  } else if (err.name === "emptyInput") {
    res.status(400).json({ message: "Please fill all required input" });
  } else if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((err) => err.message);
    res.status(400).json({ errors });
  } else if (err.code === 11000 && err.keyPattern.username === 1) {
    res.status(400).json({ error: 'Username must be unique' });
  } else if (err.code === 11000 && err.keyPattern.email === 1) {
    res.status(400).json({ error: 'Email must be unique' });
  }
  else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
