<template>
  <div>
    <div class="board">
      안녕하세요. <strong>{{ user }}</strong> 크루님
      <div class="date">{{ date }}</div>
    </div>
    <div class="content">
      <ul v-for="(x, index) in schedule" :key="index">
        <div class="caption">
          {{ x.departure }} {{ x.route === 0 ? '종로 to 인천공항 1터미널' : '인천공항 1터미널 to 종로' }}<br>
          탑승인원 ({{ x.passenger.now }}/{{ x.passenger.max }})
        </div>
        <li v-for="(y, index2) in x.stops" :key="index2" :ref="`li_${index}_${index2}`" @click="openDetail()"
          :class="(x.route === 1 && index2 === 0) || (x.route === 0 && index2 === x.stops.length - 1) ? 'airport' : ''"
        >
          <div><div v-show="active === `${index}_${index2}`"></div></div>
          <div>{{ y.time }}</div>
          <div>
            {{ y.place }}<br>
            <strong>{{ y.passenger }}</strong>명 {{ x.route === 1 ? index2 === 0 ? '탑승' : '하차' : index2 === x.stops.length -1 ? '하차' : '탑승' }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      date: '',
      dow: ['일', '월', '화', '수', '목', '금', '토'],
      interval: null,
      active: '0_0',
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
      timeout: '',
    };
  },
  methods: {
    openDetail() {
      this.$router.push('/detail');
    },
    setTime() {
      // const date = new Date('2020-01-09T21:51:00');
      const date = new Date();
      this.date = `${date.getMonth() + 1}월 ${date.getDate()}일 (${this.dow[date.getDay()]}) ${this.zeros(date.getHours())}시 ${this.zeros(date.getMinutes())}분`;
      const time = parseInt(`${date.getHours()}${this.zeros(date.getMinutes())}`, 10);
      for (let x = 0; x < this.schedule.length; x += 1) {
        if (time <= parseInt(this.schedule[x].arrival.replace(':', ''), 10)) {
          let active = 0;
          for (let y = 0; y < this.schedule[x].stops.length; y += 1) {
            if (time < parseInt(this.schedule[x].stops[y].time.replace(':', ''), 10)) {
              break;
            }
            active = y;
          }
          this.active = `${x}_${active}`;
          break;
        }
      }
    },
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
    getActiveTop() {
      window.scrollTo({
        top: this.$refs[`li_${this.active}`][0].offsetTop - (window.innerHeight / 2) + 52,
        behavior: 'smooth',
      });
    },
    moveScroll() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = '';
      }
      this.timeout = setTimeout(this.getActiveTop, 5000);
    },
  },
  mounted() {
    this.setTime();
    this.interval = setInterval(this.setTime, 1000);
    this.$nextTick(this.getActiveTop);
    window.addEventListener('touchend', this.moveScroll);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    window.removeEventListener('touchend', this.moveScroll);
  },
};
</script>

<style lang="scss" scoped>
  .board{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #FFF;
    width: 100%;
    background-color: deepskyblue;
    padding: 16px 0 64px;
    line-height: 24px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    z-index: 2;
    box-shadow: 0 0 4px 2px rgba(0,0,0,.2);
    > strong{
      color: #000;
    }
    .date{
      font-size: 16px;
      color: #000;
      font-weight: bold;
      top: 52px;
      left: 50%;
      background-color: #FFF;
      transform: translateX(-50%);
      position: absolute;
      width: fit-content;
      box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
      padding: 8px 20px;
      text-align: center;
      border-radius: 4px;
    }
  }
  .content{
    padding: 104px 12px 57px;
    ul{
      margin-top: 40px;
      background-color: #FFF;
      box-shadow: 0 0 4px 2px rgba(0,0,0,.1);
      padding: 8px;
      padding-top: 40px;
      .caption{
        box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
        margin-top: -64px;
        padding: 8px 12px;
        background-color: rgb(183, 192, 195);
        color: #FFF;
        position: absolute;
        font-weight: bold;
        margin-bottom: 12px;
      }
      > li{
        display: flex;
        cursor: pointer;
        padding: 12px;
        margin-bottom: 8px;
        position: relative;
        &:before{
          content: '';
          display: block;
          border-right: 2px dashed #eee;
          position: absolute;
          top: 30px;
          left: 23px;
          height: 100%;
        }
        &:last-of-type:before{
          display: none;
        }
        &.airport > div:first-of-type:before{
          background-color: rgb(255, 127, 120);
        }
        > div{
          flex: auto;
          &:first-of-type{
            position: relative;
            &:before{
              margin-top: 6px;
              margin-left: 6px;
              display: block;
              content: '';
              width: 12px;
              height: 12px;
              border-radius: 6px;
              background-color: rgb(255, 210, 66);
            }
            flex: 0 0 40px;
            > div{
              background-color: #FFF;
              top: 0;
              left: 0;
              position: absolute;
              background-image: url(~assets/64283.png);
              width: 24px;
              height: 24px;
              background-size: cover;
              margin-top: 3px;
              animation: move-bus 2s infinite linear;
            }
          }
          &:nth-of-type(2){
            flex: 0 0 60px;
          }
          &:nth-of-type(3){
            > strong{
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  @keyframes move-bus {
    from {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-2px);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(2px);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
