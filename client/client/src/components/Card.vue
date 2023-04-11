<script>
    import {mapActions, mapState} from 'pinia';
    import {useCounterStore} from '../stores/counter'
    import { RouterLink, RouterView } from 'vue-router'

    export default {
        computed: {
            ...mapState(useCounterStore, ['user'])
        },
        props: ['game'],
        methods: {
            ...mapActions(useCounterStore, ['fetchGameDetail', 'fetchGameReview'])
        }
    }
    // @click.prevent="fetchGameDetail(game.appId)"
</script>

<template>
    
    <button @click.prevent="fetchGameDetail(game.appId); fetchGameReview(game.appId)" class="m-6 h-40  w-2/5 border-2 rounded-xl border-solid border-black flex shadow-2xl hover:scale-110 duration-150">
        <div class="  w-2/6">
            <img class="w-40 h-24 rounded-tl-xl rounded-br-xl" :src="game.imgUrl" alt="">
            <div class="flex justify-center items-center h-16">
                <h3>{{ game.price }}</h3>
            </div>
        </div>
        <div class="w-full ml-3">
            <h1>{{ game.title }}</h1>
            <p>Released: {{ game.released }}</p>
            <p>Rating: {{ game.reviewSummary[0] }}</p>
            
            <h2>{{ game.reviewSummary[1] }}</h2>
        </div>
    </button>
</template>

<style scoped>
    h1 {
        font-size:x-large;
        font-weight: bold;
    }
    h2 {
        font-size: large;
        margin-top: 5px;
    }
    h3 {
        font-size: x-large;
    }
</style>