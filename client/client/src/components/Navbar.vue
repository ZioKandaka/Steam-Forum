<script>
    import {mapActions, mapState, mapWritableState} from 'pinia';
    import {useCounterStore} from '../stores/counter'
    import { RouterLink, RouterView } from 'vue-router'

    export default {
        computed: {
            ...mapWritableState(useCounterStore, ['user', 'search'])
        },

        methods: {
            ...mapActions(useCounterStore, ['logout', 'fetchSteam'])
        }
    }
</script>

<template>
    <div class="navbar bg-black h-20">
        <div class="flex-1 from-neutral-50">
            <RouterLink to="/" class="btn bg-black border-none ml-12 text-2xl normal-case" href="#">Steam Forum</RouterLink>
        </div>
        <div class="flex-none gap-2 mr-12 mb-2">
            <div class="flex mr-80">
                <div class="mr-3">
                    <RouterLink to="/games" class="btn hover:scale-110 bg-black border-none text-lg">Our Games</RouterLink>
                </div>
                <div class="ml-3">
                    <RouterLink to="/chatPage" class="btn hover:scale-110 bg-black border-none text-lg">Forum Chat</RouterLink>
                </div>
            </div>
            
            <form @submit.prevent="fetchSteam()" class="form-control mb-2 flex ">
                <input v-model="search" type="text" placeholder="Search game" class="input input-bordered" />
                <!-- <button class="btn">Search</button> -->
            </form>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://cdna.artstation.com/p/assets/images/images/050/089/394/large/steven-lo-ji-1.jpg?1654031250" />
                    </div>
                </label>
                <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li><button @click.prevent="logout()" >Logout</button ></li>
                </ul>
            </div>
        </div>
    </div>
</template>