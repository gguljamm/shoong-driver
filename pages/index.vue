<template>
  <div v-if="init">
    <Main v-if="user"
      :user="user"
      :schedule="schedule"
      @set-user="setUser"
      @open-detail="openDetail"
    ></Main>
    <log-in v-else @set-user="setUser"></log-in>
    <Footer v-if="user"></Footer>
<!--    <nuxt-child></nuxt-child>-->
    <Detail v-if="$route.path.indexOf('/detail') >= 0 && schedule[index] && schedule[index].stops[index2]"
      @open-detail-popup="openDetailPopup"
      :schedule="schedule[index]"
      :stopNum="index2"
    ></Detail>
    <Modal
      v-if="$route.params.popup"
    ></Modal>
  </div>
</template>

<script>
import LogIn from '../components/login.vue';
import Main from '../components/main.vue';
import Footer from '../components/footer.vue';
import Detail from '../components/detail.vue';
import Modal from '../components/modal.vue';

export default {
  components: {
    LogIn,
    Main,
    Footer,
    Detail,
    Modal,
  },
  data() {
    return {
      init: false,
      user: null,
      index: 0,
      index2: 0,
      schedule: [
        /* eslint-disable */
        { departure: '09:00', arrival: '11:00', route: 0, passenger: { max: 13, now: 7 }, stops: [
          { time: '09:00', place: '센트럴 관광호텔 (스팟1)', passenger: 2 },
          { time: '09:10', place: '호텔 베뉴지 (스팟2)', passenger: 2 },
          { time: '09:20', place: '둘로스빌딩 앞 (스팟3)', passenger: 2 },
          { time: '09:30', place: '몽호텔 앞 (스팟4)', passenger: 1 },
          { time: '11:00', place: '인천공항 1터미널', passenger: 7 },
        ]},
        { departure: '12:00', arrival: '14:00', route: 1, passenger: { max: 13, now: 5 }, stops: [
          { time: '12:00', place: '인천공항 1터미널', passenger: 5 },
          { time: '13:30', place: '센트럴 관광호텔 (스팟1)', passenger: 1 },
          { time: '13:40', place: '호텔 베뉴지 (스팟2)', passenger: 1 },
          { time: '13:50', place: '둘로스빌딩 앞 (스팟3)', passenger: 1 },
          { time: '14:00', place: '몽호텔 앞 (스팟4)', passenger: 2 },

        ]},
        { departure: '17:00', arrival: '19:00', route: 0, passenger: { max: 13, now: 12 }, stops: [
          { time: '17:00', place: '센트럴 관광호텔 (스팟1)', passenger: 6 },
          { time: '17:10', place: '호텔 베뉴지 (스팟2)', passenger: 2 },
          { time: '17:20', place: '둘로스빌딩 앞 (스팟3)', passenger: 2 },
          { time: '17:30', place: '몽호텔 앞 (스팟4)', passenger: 2 },
          { time: '19:00', place: '인천공항 1터미널', passenger: 12 },
        ]},
        { departure: '20:00', arrival: '22:00', route: 1, passenger: { max: 13, now: 10 }, stops: [
          { time: '20:00', place: '인천공항 1터미널', passenger: 10 },
          { time: '21:30', place: '센트럴 관광호텔 (스팟1)', passenger: 2 },
          { time: '21:40', place: '호텔 베뉴지 (스팟2)', passenger: 3 },
          { time: '21:50', place: '둘로스빌딩 앞 (스팟3)', passenger: 4 },
          { time: '22:00', place: '몽호텔 앞 (스팟4)', passenger: 1 },
        ]},
        /* eslint-enable */
      ],
    };
  },
  methods: {
    setUser(val) {
      this.user = val;
    },
    openDetail(index, index2) {
      this.index = index;
      this.index2 = index2;
      this.$router.push('/detail');
    },
    openDetailPopup(flag) {
      console.log(flag);
      this.$router.push(`detail/${flag}`);
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
