<template>
  <div class="popBack">
    <div :class="init ? 'open' : ''">
      <div><button @click="$router.back()"></button>상세 정보<button @click="openMap()"></button></div>
      <div>
        <h3>1월 10일 (금) 12:00 | 인천공항 제1터미널</h3>
        <div class="content">
          <h3>탑승 예정 인원 총 5인</h3>
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
        <button class="add">현장 인원 추가 (잔여석: 8)</button>
        <button class="submit">출발</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      init: false,
      detailSchedule: [
        { name: 'ted', passenger: 1, value: 1 },
        { name: 'jimmy', passenger: 2, value: 2 },
        { name: 'kyle', passenger: 2, value: 2 },
      ],
    };
  },
  methods: {
    openMap() {
      const url = 'https://google.com/maps/search/37.4491222,126.4528918';
      window.open(url, '_blank');
    },
  },
  mounted() {
    window.document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.init = true;
    }, 100);
  },
  beforeDestroy() {
    window.document.body.style.overflow = '';
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
        height: 50px;
        line-height: 50px;
        background-color: #FFF;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        width: 100%;
        font-weight: bold;
        font-size: 18px;
        box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
        > button{
          position: absolute;
          top: 0;
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
        left: 0;
        right: 0;
        bottom: 116px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding: 20px;
        .content{
          h3{

          }
          ul{
            padding: 24px 0;
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
        height: 116px;
        padding: 12px 20px;
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
