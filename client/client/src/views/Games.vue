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
        ...mapActions(useCounterStore, ['fetchNews', 'fetchSteam'])
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
        <Card v-for="(game, index) in steam" :game="game" />
    </div>
    <Footer />
</template>
