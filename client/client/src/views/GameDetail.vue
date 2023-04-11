<script>
import { mapState } from 'pinia';
import { useCounterStore } from '../stores/counter'
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
    computed: {
        ...mapState(useCounterStore, ['gameDetail', 'gameReview', 'QR'])
    },

    components: {
        Navbar,
        Footer
    }
}
</script>

<template>
    <!-- <pre>{{ gameDetail }}</pre> -->
    <!-- <pre>{{gameReview }}</pre> -->
    <Navbar />
    <div>
        <div class="flex justify-center text-4xl font-bold mt-5 -mb-8">
            <h1>{{ gameDetail.title }}</h1>
        </div>
        <div class="flex justify-center mb-10">
            <div class="w-3/6 mt-16">
                <div class="">
                    <img class="w-full rounded-2xl" :src="gameDetail.imgUrl" alt="">
                </div>
                <div>
                    <h3>{{ gameDetail.description }}</h3>
                    <div class="flex justify-between text-lg">
                        <div>
                            <p>Released{{ gameDetail.released }}</p>
                            <p>Reviews: {{ gameDetail.allReviews.summary }}</p>
                        </div>
                        <div class="font-bold text-xl mr-10">
                            <p>{{ gameDetail.price }}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="w-2/6 -z-10 scale-95">
                <div>
                    <div v-html="QR">
                    </div>
                    <h2 class="flex justify-center text-3xl font-semibold">Scan to visit store</h2>
                </div>
            </div>
        </div>
        <div class="mt-20 flex flex-col justify-center">
            <div class="flex justify-center text-4xl font-bold">
                <h1>Gamer Reviews</h1>
            </div>
            <div class="flex flex-col justify-center items-center">
                <div class="flex flex-col w-3/6 m-3 bg-slate-800  p-10 rounded-2xl text-white"
                v-for="game in gameReview.reviews">
                    <h4 class="text-xl">"{{ game.review }}"</h4>
                    <div class="flex justify-end mt-5 -mb-5">
                        <h4>Upvote: {{ game.votes_up }}</h4>
                        <h4 class="ml-3">Funny: {{ game.votes_funny }}</h4>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <Footer />
</template>

<style scoped>
h3 {
    font-weight: 600;
    margin-top: 20px;
    text-align: justify;
    font-size: large;
    margin-bottom: 10px;
}
</style>