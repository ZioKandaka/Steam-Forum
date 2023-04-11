import { defineStore } from "pinia"
import { loginRest, signupRest } from "../api";
import axios from 'axios';
const ORIGIN = `http://localhost:3300`

export const useCounterStore = defineStore("counter", {
  persist: true,
  state: () => ({
     user: undefined,
     username: undefined,
     secret: undefined,
    //  ORIGIN: `http://localhost:3300`,
     news: undefined,
     steam: undefined,
     gameDetail: undefined,
     gameReview: undefined,
     QR: undefined,
     search: undefined
    }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  
  actions: {
    async login(input) {
      try {
        let {data} = await axios({
          method: 'POST',
          url: `${ORIGIN}/login`,
          data: {
            username: input.username,
            password: input.password
          }
        })
        let response = await loginRest(input.username, input.password)
        // console.log(data, '+_+_+_+_+');
        let userData = { ...response.data, secret: input.password }
        this.user = userData
        localStorage.setItem('userData', userData)
        localStorage.setItem('access_token', data.access_token)
        this.router.push('/')
      } catch (err) {
        console.log("Login error", err)
      }
    },

    async logout() {
      try {
        this.user  = undefined,
        this.username = undefined,
        this.secret = undefined,
        this.news = undefined,
        this.steam = undefined,
        this.gameDetail = undefined,
        this.gameReview = undefined,
        this.QR = undefined,
        this.search = undefined,

        localStorage.clear()

        this.router.push('/login')
      } catch (err) {
        console.log(err)
      }
    },

    async signup(input) {
      try {
        let {data} = await axios({
          method: 'POST',
          url:`${ORIGIN}/register`,
          data: {
            username: input.username,
            password: input.password,
            email: input.email,
            firstName: input.first_name,
            lastName: input.last_name
          }
      })
      // console.log(data, '+_+_+_');
        if(!data) {
          throw err
        }
        let response = await signupRest(
          input.username,
          input.password,
          input.email,
          input.first_name,
          input.last_name
        )
        // let userData = { ...response.data, secret: input.password }
        // this.user = userData
        // localStorage.setItem('userData', userData)
        this.router.push('/login')
      } catch (err) {
        console.log("Sign up error", err)
      }
    },

    async fetchSteam() {
      try {
        let find
        if(!this.search) {
          find = 'counter'
        } else {
          find = this.search
        }

        let {data} = await axios({
          method: 'GET',
          url: `${ORIGIN}/steam/${find}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        // console.log(data);
        this.steam = data
        console.log(this.search, 'MASUK SERCH');
        // this.router.push('/games')
      } catch (err) {
        console.log(err);
      }
    },

    async fetchGameDetail(id) {
      try {
        console.log(id);
        let {data} = await axios({
          method: 'GET',
          url: `${ORIGIN}/gameDetail/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.gameDetail = data
        // fetchGameReview(id)
        // console.log(data);
        console.log(data, 'KKKKK');
        this.generateQR(data.developer.link)
        this.router.push('/gameDetail')

      } catch (err) {
        console.log(err)
      }
    },

    async fetchGameReview(id) {
      console.log('MASUKSINI');
      try {
        let {data} = await axios({
          method: 'GET',
          url: `${ORIGIN}/gameReview/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.gameReview = data
        // console.log(data);
        this.router.push('/gameDetail')
      } catch (err) {
        console.log(err)
      }
    },

    async generateQR(link) {
      try {
          console.log(link, 'QR CALLED');
          let response = await axios({
              method: 'POST',
              url: `${ORIGIN}/QR`,
              data: {
                  link: link
              },
              headers: {
                access_token: localStorage.getItem('access_token')
              }
          })
          // console.log(response, 'QR +++')
          this.QR = response.data
      } catch (err) {
          console.log("failed QR")
      }
    },

    async donation(amount) {
      try {
        console.log(amount, 'MASUK');
        let {data} = await axios({
          method: 'POST',
          url: `${ORIGIN}/midtransToken`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            donation: amount
          }
        })
        // console.log(data);
        let cb = this.successDonate
        window.snap.pay(data.token, {
          onSuccess: function(result){
            console.log(result, 'OKOK');
            cb(result.gross_amount)

          },
          onError: function(result){
            /* You may add your own implementation here */
            alert("payment failed!"); console.log(result);
          },
          onClose: function(){
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment');
          }
        })
      } catch (err) {
        
      }
    },

    async successDonate(amount) {
      try {
        console.log('SuccessDon');
        let {data} = await axios({
          method: 'PATCH',
          url: `${ORIGIN}/donate`,
          data: {
            donation: amount
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log('SUCCESSSS');
      } catch (err) {
        console.log(err, '__++__++__++')
      }
    }



  },
});
