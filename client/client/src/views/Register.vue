<script>
import { loginRest, signupRest } from "../api"
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter';

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
    methods: {
        ...mapActions(useCounterStore, ['login', 'signup'])
    },
};
</script>

<template>
    <!-- <div class="login-page">
        <div class="card">
            <form @submit.prevent="signup({
                    username: username,
                    password: password,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                })">
                    <div class="title">Sign Up</div>
                    <input class="input" placeholder="Username" type="text" v-model="username" />
                    <br />
                    <input placeholder="Password" type="password" v-model="password" />
                    <br />
                    <input placeholder="Email" type="text" v-model="email" />
                    <br />
                    <input placeholder="First name" type="text" v-model="first_name" />
                    <br />
                    <input placeholder="Last name" type="text" v-model="last_name" />
                    <br />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div> -->
    


        <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12" style="background-image: url('https://imageio.forbes.com/specials-images/imageserve/5d946bf2793bd50006e99e8b/A-huge-portion-of-my-existing-Steam-library-is-perfectly-playable-on-Linux/960x0.jpg?format=jpg&width=960');">
	<div class="relative py-3 sm:max-w-xl sm:mx-auto">
		
		<div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div class="max-w-md mx-auto">
				<div>
					<h1 class="text-2xl font-semibold">Login Form with Floating Labels</h1>
				</div>
				<form @submit.prevent="signup({
                    username: username,
                    password: password,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                })" class="divide-y divide-gray-200">
					<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div class="relative">
							<input v-model="username" autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Username" />
							<label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
						</div>
                        <div class="relative">
							<input v-model="password" autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
							<label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						<div class="relative">
							<input v-model="email" autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
							<label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div class="relative">
							<input v-model="first_name" autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="First Name" />
							<label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">First Name</label>
						</div>
						<div class="relative">
							<input v-model="last_name" autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Last Name" />
							<label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Last Name</label>
						</div>
						
						<div class="relative">
							<button class="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</template>

<style scoped>
    .banner {
        background: url( 'https://www.nme.com/wp-content/uploads/2020/09/EA-Play-Xbox.jpg' );
        background-repeat: no-repeat;
        background-size: cover        
    }
</style>
