<template>
  <section class="main">
    <h1>슝 FOR 크루</h1>
    <div>
      <div>
        <input id="id" v-model="id">
        <label for="id" :class="id.length > 0 ? 'filled' : ''">크루 아이디</label>
      </div>
      <div>
        <input type="password" id="ps" v-model="ps">
        <label for="ps" :class="ps.length > 0 ? 'filled' : ''">크루 패스워드</label>
      </div>
      <button @click="login()">로그인</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      ps: '',
    };
  },
  methods: {
    login() {
      this.$cookies.set('user', this.id);
      this.$emit('set-user', this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
  .main{
    min-height: 100vh;
    background-color: deepskyblue;
    h1{
      margin: 0;
      padding: 40px 0;
      font-size: 36px;
      text-align: center;
      color: #FFF;
    }
    > div{
      background-color: #FFF;
      border-radius: 4px;
      margin: 0 auto;
      width: 300px;
      padding: 20px;
      box-shadow: 0 0 8px 4px rgba(0,0,0,.1);
      > div{
        padding: 12px 0;
        position: relative;
        label{
          left: 8px;
          top: 24px;
          transition: .1s ease;
          position: absolute;
          color: #999;
        }
        input:focus + label{
          top: 16px;
          font-size: 10px;
        }
        label.filled{
          top: 16px;
          font-size: 10px;
        }
        input{
          font-weight: bold;
          background-color: #FFF;
          padding: 8px 8px 0;
          height: 40px;
          width: 100%;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
      }
      button {
        margin-top: 40px;
        width: 100%;
        height: 40px;
        background-color: deepskyblue;
        color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 4px 2px rgba(0,0,0,.1);
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
</style>
