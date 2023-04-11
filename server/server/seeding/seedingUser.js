const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

mongoose.connect('mongodb+srv://ziokaelani:ZioBonlap30@iproject.wgwvuxh.mongodb.net/test')

let data = [
  {
    username: 'wikarsa',
    password: bcrypt.hashSync('123456', 10),
    email: 'kars@gmail.com',
    firstName: 'kars',
    lastName: 'kun',
    premium: false,
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'admin',
    password: bcrypt.hashSync('123456', 10),
    email: 'admin@gmail.com',
    firstName: 'admin',
    lastName: '',
    premium: false,
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'fitra',
    password: bcrypt.hashSync('123456', 10),
    email: 'fitra@gmail.com',
    firstName: 'fitra',
    lastName: 'chan',
    premium: false,
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'bedul',
    password: bcrypt.hashSync('123456', 10),
    email: 'bedul@gmail.com',
    firstName: 'bedul',
    lastName: 'sama',
    premium: false,
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// async function seeding() {
//     let seed = await User.insertMany(data)
//     console.log(seed, 'OK');
// }
User.insertMany(data)
    .then(response => {
        console.log(response);
    })
    .catch(err => console.log(err))

// seeding()

