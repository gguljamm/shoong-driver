<template>
  <div class="popBack">
    <div :class="init ? 'open' : ''">
      <div><button @click="$router.back()"></button>상세 정보<button @click="openMap()"></button></div>
      <div>
        <h3>{{ nowDate }} {{ schedule.stops[stopNum].time }} | {{ schedule.stops[stopNum].place }}</h3>
        <div class="content">
          <h3>탑승 예정 인원 총 {{ schedule.stops[stopNum].passenger }}인</h3>
          <ul>
            <li v-for="(x, index) in detailSchedule" :key="index">
              <div>{{ x.name }}</div>
              <div>총 {{ x.passenger }}인</div>
              <div>
                <div class="selectBack">
                  {{ x.value }}
                  <select v-model="x.value">
                    <option value="0">0</option>
                    <option v-for="y in x.passenger" :value="y" :key="y">{{ y }}</option>
                  </select>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button class="add" @click="$emit('open-detail-popup', 'add')">현장 인원 추가 (잔여석: {{ schedule.passenger.max - schedule.passenger.now }})</button>
        <button class="submit" @click="$emit('open-detail-popup', 'confirm')">완료</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['schedule', 'stopNum'],
  data() {
    const date = new Date();
    const dow = ['일', '월', '화', '수', '목', '금', '토'];
    return {
      nowDate: `${date.getMonth() + 1}월 ${date.getDate()}일 (${dow[date.getDay()]})`,
      init: false,
      detailSchedule: [
        { name: 'ted', passenger: 1, value: 1 },
        { name: 'jimmy', passenger: 2, value: 2 },
        { name: 'kyle', passenger: 2, value: 2 },
      ],
      scrollPosition: 0,
    };
  },
  methods: {
    openMap() {
      const url = 'https://google.com/maps/search/37.4491222,126.4528918';
      window.open(url, '_blank');
    },
  },
  mounted() {
    this.scrollPosition = window.pageYOffset;
    window.document.body.style.overflow = 'hidden';
    window.document.body.style.position = 'fixed';
    window.document.body.style.top = `-${this.scrollPosition}px`;
    window.document.body.style.width = '100%';
    setTimeout(() => {
      this.init = true;
    }, 100);
  },
  beforeDestroy() {
    window.document.body.style.removeProperty('overflow');
    window.document.body.style.removeProperty('position');
    window.document.body.style.removeProperty('top');
    window.document.body.style.removeProperty('width');
    window.scrollTo(0, this.scrollPosition);
  },
};
</script>

<style lang="scss" scoped>
  .popBack{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    overflow: hidden;
    background-color: rgba(0,0,0,.3);
    > div{
      transition: .3s ease;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
      transform: translateX(100%);
      background-color: #FFF;
      &.open{
        transform: translateX(0);
      }
      > div:first-of-type{
        line-height: 50px;
        background-color: #FFF;
        position: absolute;
        left: 0;
        top: 0;
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
        text-align: center;
        width: 100%;
        font-weight: bold;
        font-size: 18px;
        box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
        > button{
          position: absolute;
          bottom: 0;
          height: 50px;
          width: 50px;
          background-position: center center;
          background-repeat: no-repeat;
          &:first-of-type{
            background-size: 32px;
            left: 0;
            background-image: url(~assets/chevron-left.svg);
          }
          &:nth-of-type(2){
            background-size: 20px;
            background-image: url(~assets/map.svg);
            right: 0;
          }
        }
      }
      > div:nth-of-type(2){
        position: absolute;
        top: 50px;
        top: calc(constant(safe-area-inset-top) + 50px);
        top: calc(env(safe-area-inset-top) + 50px);
        left: 0;
        right: 0;
        bottom: 116px;
        bottom: calc(constant(safe-area-inset-bottom) + 116px);
        bottom: calc(env(safe-area-inset-bottom) + 116px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding: 20px;
        > h3{
          font-size: 15px;
        }
        .content{
          h3{
            margin-top: 8px;
            font-size: 15px;
          }
          ul{
            padding: 24px 0;
            font-size: 15px;
            li{
              display: flex;
              height: 32px;
              line-height: 32px;
              margin-bottom: 8px;
              > div:first-of-type{
                flex: auto;
                font-weight: bold;
              }
              > div:nth-of-type(2){
                flex: 0 0 60px;
              }
              > div:nth-of-type(3){
                flex: 0 0 100px;
                .selectBack{
                  position: relative;
                  background-color: #fff;
                  text-align: center;
                  border-radius: 12px;
                  width: 100px;
                  height: 32px;
                  box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
                  border: 1px solid #999;
                  > select{
                    border-radius: 12px;
                    width: 100px;
                    height: 32px;
                    opacity: 0;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                  }
                  &:after{
                    content: '';
                    position: absolute;
                    border-right: 4px solid transparent;
                    border-left: 4px solid transparent;
                    border-top: 6px solid #000;
                    right: 8px;
                    top: 12px;
                  }
                }
              }
            }
          }
        }
      }
      > div:nth-of-type(3){
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px 20px;
        padding-bottom: calc(constant(safe-area-inset-bottom) + 12px);
        padding-bottom: calc(env(safe-area-inset-bottom) + 12px);
        box-shadow: 0 0 4px 2px rgba(0,0,0,.1);
        > button{
          width: 100%;
          height: 40px;
          font-size: 16px;
          font-weight: bold;
          &.add{
            margin-bottom: 12px;
            border: 1px solid #ccc;
          }
          &.submit{
            background-color: deepskyblue;
            color: #FFF;
          }
        }
      }
    }
  }
</style>
