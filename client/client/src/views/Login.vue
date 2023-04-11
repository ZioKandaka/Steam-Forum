<script>
import { loginRest, signupRest } from "../api"
import { mapActions, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
    data() {
        return {
            username: "",
            password: "",
            email: "",
            first_name: "",
            last_name: "",
        };
    },
    computed: {
        ...mapWritableState(useCounterStore, 'user')
    },
    created() {
        if (localStorage.getItem('userData')) {
            console.log('ADA BOS');
            this.user = localStorage.getItem('userData')
        } else {
            console.log('GAK');
        }
    },
    methods: {
        ...mapActions(useCounterStore, ['login', 'signup'])
    },
};
</script>

<template>
    <!-- <div class="login-page">
        <div class="card">
            <form @submit.prevent="login({ username: username, password: password })">
                <div class="title">Login</div>
                <input placeholder="Username" type="text" v-model="username" />
                <br />
                <input placeholder="Password" type="password" v-model="password" />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    </div> -->
    <div class='grid grid-cols-12'>
        <div class="col-span-4 text-white font-sans font-bold bg-black min-h-screen pl-7">
            <div class="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
                <form @submit.prevent="login({ username: username, password: password })" class="row-span-4 row-start-2 text-4xl">
                    Sign In                    
                    <div class="pt-10 pr-20">                        
                        <label class="text-xl font-sans font-medium">
                            Username
                        </label>
                        <input 
                            v-model="username"
                            type="text" 
                            name="username" 
                            placeholder="Write your username" 
                            class="w-full bg-black py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"/>                            
                    </div>
                    <div class="pt-2 pr-20">
                        <label class="text-xl font-sans font-medium">
                            Password
                        </label>
                        <input 
                            v-model="password"
                            type="password" 
                            name="password" 
                            placeholder="Write your password" 
                            class=" w-full bg-black py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"/>
                        
                    </div>
                    <!-- Button -->
                    <div class="text-sm font-sans font-medium w-full pr-20 pt-14">
                        <button 
                            type="sumbit"   
                            class="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white">
                                SIGN IN
                        </button>
                    </div>
                </form>
                <!-- Text -->
                <RouterLink to="/register"  class="text-lg font-sans font-medium text-gray-400 underline">
                    Don´t have an account? Sign up
                </RouterLink>
            </div>         
        </div>

        <!-- Second column image -->
        <div class="banner col-span-8 text-white font-sans font-bold -ml-40 -z-10">
            <!-- Aquí iría algún comentario -->
        </div>    
</div>
</template>
  
<style scoped>
    .banner {
        background: url( 'https://cdn.akamai.steamstatic.com/store/home/store_home_share.jpg' );
        background-repeat: no-repeat;
        background-size: cover        
    }
</style>
