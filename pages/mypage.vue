<template>
  <div class="mypage" v-if="init">
    <button @click="logOut()">로그아웃</button>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/footer.vue';

export default {
  components: {
    Footer,
  },
  data() {
    return {
      init: false,
    };
  },
  methods: {
    logOut() {
      this.$cookies.remove('user');
      this.$router.replace('/');
    },
  },
  mounted() {
    this.init = true;
  },
};
</script>

<style lang="scss" scoped>
  .mypage{
    padding: 24px;
    > button{
      width: 100%;
      height: 40px;
      background-color: deepskyblue;
      color: #FFF;
    }
  }
</style>
