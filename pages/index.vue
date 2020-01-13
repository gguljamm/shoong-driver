<template>
  <div v-if="init">
    <Main v-if="user" :user="user" @set-user="setUser"></Main>
    <log-in v-else @set-user="setUser"></log-in>
    <Footer v-if="user"></Footer>
<!--    <nuxt-child></nuxt-child>-->
    <Detail v-if="$route.path.indexOf('/detail') >= 0"></Detail>
  </div>
</template>

<script>
import LogIn from '../components/login.vue';
import Main from '../components/main.vue';
import Footer from '../components/footer.vue';
import Detail from '../components/detail.vue';

export default {
  components: {
    LogIn,
    Main,
    Footer,
    Detail,
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
  .popup{
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.3);
  }
</style>
