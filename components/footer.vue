<template>
  <ul class="footer">
    <li :class="url === '/' ? 'selected' : ''" @click="$router.push('/')">현재 스케줄</li>
    <li :class="url.indexOf('/total') === 0 ? 'selected' : ''" @click="$router.push('/total')">전체 스케줄</li>
    <li :class="url.indexOf('/mypage') === 0 ? 'selected' : ''" @click="$router.push('/mypage')">내정보</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      url: '/',
    };
  },
  mounted() {
    this.url = this.$route.path;
  },
};
</script>

<style lang="scss" scoped>
  .footer{
    z-index: 2;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 4px 2px rgba(0,0,0,.1);
    display: flex;
    margin: 0;
    padding: 0;
    background-color: #FFF;
    > li{
      font-size: 13px;
      background-color: #FFF;
      flex: 33.33%;
      cursor: pointer;
      text-align: center;
      line-height: 44px;
      border-right: 1px solid #ccc;
      &.selected{
        font-weight: bold;
        color: #FFF;
        background-color: deepskyblue;
      }
      &:last-of-type{
        border-right: 0;
      }
    }
  }
</style>
