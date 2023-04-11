<script>
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { applyReactInVue } from "veaury";
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
    data() {
        return {
            projectId: 'a668d539-1ce9-4b3d-8a97-d92c97f07535',
        };
    },
    components: {
        PrettyChatWindow: applyReactInVue(PrettyChatWindow),
        Navbar,
        Footer
    },
    computed: {
        ...mapState(useCounterStore, ['user'])
    },
};
</script>

<template>
    <div>
        <Navbar />
        <div class="scale-100" style="height: 100vh;">
            <PrettyChatWindow class="rounded-2xl" :projectId="projectId" :username="user.username" :secret="user.secret" style="font-family: Arial, Helvetica, sans-serif;" />
            <!-- <pre>{{ user }}</pre> -->
        </div>
        <Footer />
    </div>
</template>
  
<style>
.ce-new-chat-button {
    width: 32px;
    position: relative;
    bottom: 22px;
    font-family:'Times New Roman', Times, serif
}
</style>
  
