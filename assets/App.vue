<template>
    <div>
        <NavBar></NavBar>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script lang="ts">
    import NavBar from './components/NavBar';
    import Footer from './components/Footer';

    export default {
        components: {
            NavBar,
            Footer
        },
        data: () => ({
            test: 'foo',
        })
    }
</script>