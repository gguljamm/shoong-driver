<template>
  <div>
    <div class="board">
      안녕하세요. <strong>{{ user }}</strong> 크루님
      <div class="date">{{ date }}</div>
    </div>
    <div class="content" v-if="schedule && schedule.length > 0">
      <ul v-for="(x, index) in schedule" :key="index">
        <div class="caption">
          {{ x.departure }} {{ x.route === 0 ? '종로 to 인천공항 1터미널' : '인천공항 1터미널 to 종로' }}<br>
          탑승인원 ({{ x.passenger.now }}/{{ x.passenger.max }})
        </div>
        <li v-for="(y, index2) in x.stops" :key="index2" :ref="`li_${index}_${index2}`" @click="openDetail(index, index2)"
          :class="{
            airport: (x.route === 1 && index2 === 0) || (x.route === 0 && index2 === x.stops.length - 1),
            active: active === `${index}_${index2}`,
          }"
        >
          <div><div :class="{ isMoving }"></div></div>
          <div>{{ y.time }}</div>
          <div>
            {{ y.place }}<br>
            <strong>{{ y.passenger }}</strong>명 {{ x.route === 1 ? index2 === 0 ? '탑승' : '하차' : index2 === x.stops.length -1 ? '하차' : '탑승' }}
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="content">
      <h3 style="padding-top: 40px; text-align: center">금일 예정된 스케줄이 없습니다.</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user', 'schedule'],
  data() {
    return {
      date: '',
      dow: ['일', '월', '화', '수', '목', '금', '토'],
      interval: null,
      active: '0_0',
      timeout: '',
      isMoving: false,
    };
  },
  methods: {
    openDetail(index, index2) {
      this.$emit('open-detail', index, index2);
    },
    setTime() {
      // const date = new Date('2020-01-09T10:54:00');
      const date = new Date();
      this.date = `${date.getMonth() + 1}월 ${date.getDate()}일 (${this.dow[date.getDay()]}) ${this.zeros(date.getHours())}시 ${this.zeros(date.getMinutes())}분`;
      const time = parseInt(`${date.getHours()}${this.zeros(date.getMinutes())}`, 10);
      for (let x = 0; x < this.schedule.length; x += 1) {
        if (parseInt(this.schedule[x].arrival.replace(':', ''), 10) >= time) {
          for (let y = 0; y < this.schedule[x].stops.length; y += 1) {
            const stopTime = parseInt(this.schedule[x].stops[y].time.replace(':', ''), 10);
            if (stopTime >= time) {
              this.active = `${x}_${y}`;
              const strTime = this.schedule[x].stops[y].time.split(':');
              this.isMoving = ((strTime[0] * 60) + parseInt(strTime[1], 10)) - ((date.getHours() * 60) + date.getMinutes()) > 5;
              break;
            }
          }
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
    getActiveTop(isMount) {
      if (this.schedule.length > 0) {
        const obj = {
          top: this.$refs[`li_${this.active}`][0].offsetTop - (window.innerHeight / 2) + 52,
        };
        if (!isMount) {
          obj.behavior = 'smooth';
        }
        window.scrollTo(obj);
      }
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
    this.$nextTick(this.getActiveTop(true));
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
    padding-top: calc(constant(safe-area-inset-top) + 16px);
    padding-top: calc(env(safe-area-inset-top) + 16px);
    line-height: 24px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    z-index: 10;
    box-shadow: 0 0 4px 2px rgba(0,0,0,.2);
    > strong{
      color: #000;
    }
    .date{
      white-space: nowrap;
      font-size: 16px;
      color: #000;
      font-weight: bold;
      bottom: 12px;
      left: 50%;
      background-color: #FFF;
      transform: translateX(-50%);
      position: absolute;
      width: auto;
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
      box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
      padding: 8px;
      padding-top: 40px;
      font-size: 15px;
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
          z-index: 2;
        }
        &:last-of-type:before{
          display: none;
        }
        &:not(:first-of-type) > div:first-of-type > div.isMoving{
          margin-top: -35px;
        }
        &.airport > div:first-of-type:before{
          background-color: rgb(255, 127, 120);
        }
        &.active{
          background-color: papayawhip;
          > div:first-of-type > div{
            display: block;
          }
        }
        > div{
          flex: auto;
          line-height: 20px;
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
              position: relative;
              z-index: 3;
            }
            flex: 0 0 40px;
            > div{
              display: none;
              top: 0;
              left: 0;
              position: absolute;
              background-image: url(~assets/64283.png);
              width: 24px;
              height: 24px;
              background-size: cover;
              margin-top: 3px;
              z-index: 5;
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
