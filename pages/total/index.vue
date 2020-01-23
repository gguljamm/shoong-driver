<template>
  <div v-if="init" class="wrapper">
    <div class="header">
      <button></button>
      <div>{{ selectedSchedule }}</div>
      <button></button>
    </div>
    <ul>
      <li>
        <div>종로 → 인천공항 제1터미널</div>
        <div>09:00 ~ 11:00</div>
        <div>예약인원 (7/13)</div>
      </li>
      <li>
        <div>인천공항 제1터미널 → 종로</div>
        <div>09:00 ~ 11:00</div>
        <div>예약인원 (7/13)</div>
      </li>
      <li>
        <div>종로 → 인천공항 제1터미널</div>
        <div>09:00 ~ 11:00</div>
        <div>예약인원 (7/13)</div>
      </li>
      <li>
        <div>인천공항 제1터미널 → 종로</div>
        <div>09:00 ~ 11:00</div>
        <div>예약인원 (7/13)</div>
      </li>
    </ul>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../../components/footer.vue';

export default {
  components: {
    Footer,
  },
  data() {
    const schedule = {};
    return {
      init: false,
      schedule,
      selectedSchedule: `${new Date().getFullYear()}-${this.zeros(new Date().getMonth() + 1)}-${this.zeros(new Date().getDate())}`,
    };
  },
  methods: {
    zeros(n) {
      let zero = '';
      let newN = n;
      newN = n.toString();
      if (newN.length < 2) {
        for (let i = 0; i < 2 - newN.length; i += 1) {
          zero += '0';
        }
      }
      return zero + newN;
    },
  },
  mounted() {
    this.init = true;
  },
};
</script>

<style lang="scss" scoped>
  .wrapper{
    .header{
      padding: 16px 40px 4px;
      padding-top: calc(constant(safe-area-inset-top) + 16px);
      padding-top: calc(env(safe-area-inset-top) + 16px);
      background-color: #FFF;
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      box-shadow: 0 0 4px 2px rgba(0,0,0,.1);
      > button{
        flex: 0 0 40px;
        height: 40px;
        background-position: center;
        background-size: 32px;
        background-image: url(~assets/chevron-left.svg);
        &:nth-of-type(2){
          transform: rotate(180deg);
        }
      }
      > div{
        flex: auto;
        text-align: center;
        line-height: 40px;
        height: 40px;
        font-weight: bold;
      }
    }
    > ul:not(.footer){
      padding: 80px 20px 44px;
      > li{
        margin-bottom: 20px;
        line-height: 24px;
        width: 100%;
        padding: 20px;
        background-color: #FFF;
      }
    }
  }
</style>
