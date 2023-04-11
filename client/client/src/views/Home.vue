<script>
import Login from "./Login.vue";
import ChatPage from "./ChatPage.vue"
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import Card from '../components/Card.vue';

export default {
  computed: {
    ...mapState(useCounterStore, ['user', 'steam'])
  },

  components: {
    Login,
    ChatPage,
    Navbar,
    Footer,
    Card
  },

  methods: {
    ...mapActions(useCounterStore, ['fetchNews', 'fetchSteam', 'donation'])
  },

  data() {
    return {
      amount: null
    }
  },

  created() {
    this.fetchSteam()
  }
};
</script>

<template>
  <!-- <Login v-if="!user" @onAuth="handleAuth" />]
      <ChatPage />
      /> -->
  <Navbar />
  <div class="flex flex-wrap justify-center">
    <div class="hero min-h-screen"
      style="background-image: url(https://static.techspot.com/images2/news/bigimage/2019/09/2019-09-20-image-3.jpg);">
      <div class="hero-overlay bg-opacity-30"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-xl bg-black p-16 rounded-2xl">
          <h1 class=" mb-5 text-5xl font-bold">Welcome to Steam forum!</h1>
          <p class="mb-5">This is the place where gamers come together to discuss their favorite games, share tips and
            tricks, and connect with other members of the community. Whether you're new to Steam or have been a member for
            years, we're thrilled to have you here.</p>
          <div class="mt-10">
            <RouterLink to="/games" class="btn btn-primary mr-4">Browse Games</RouterLink>

            <RouterLink to="/chatPage" class="btn btn-secondary ml-4">Discuss in Forum</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row rounded-2xl">
    <img class="rounded-2xl" src="https://dailyspin.id/wp-content/uploads/2021/02/Gaben-1.jpg" />
    <div>
      <h1 class="text-5xl font-bold">Support our developers</h1>
      <p class="py-6">Your donation helps our developer create and maintain games. The more you donate, the more "free" games we will make. </p>
      <input v-model="amount" type="number" placeholder="Donation amount" class="input input-bordered input-primary w-full max-w-xs" /><br>
      <button @click.prevent="donation(amount)" class="btn btn-primary w-40">Donate</button>
    </div>
  </div>
</div>
  </div>
<Footer /></template>
