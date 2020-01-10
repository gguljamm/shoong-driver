<template>
  <div v-if="init">
    <Main v-if="user" :user="user" @set-user="setUser"></Main>
    <log-in v-else @set-user="setUser"></log-in>
    <Footer v-if="user"></Footer>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import LogIn from '../components/login.vue';
import Main from '../components/main.vue';
import Footer from '../components/footer.vue';

export default {
  components: {
    LogIn,
    Main,
    Footer,
  },
  data() {
    return {
      init: false,
      user: null,
    };
  },
  methods: {
    setUser(val) {
      this.user = val;
    },
  },
  mounted() {
    this.user = this.$cookies.get('user') || null;
    this.init = true;
  },
};
</script>

<style lang="scss" scoped>

</style>
