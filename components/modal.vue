<template>
  <div class="modalWrapper" @click="$router.back()">
    <div @click.stop>
    <div v-if="$route.params.popup === 'confirm'" class="confirm">
      <div><label><input type="radio" name="confirmRadio" v-model="confirmStatus" value="ok">정상</label></div>
      <div><label><input type="radio" name="confirmRadio" v-model="confirmStatus" value="wrong">이슈있음</label></div>
      <div><textarea :style="{ opacity: confirmStatus === 'ok' ? 0 : 1 }" v-model="text" :disabled="confirmStatus === 'ok'"></textarea></div>
      <div><button @click="submit()">제출</button></div>
    </div>
    <div v-if="$route.params.popup === 'add'" class="add">
      <div><label>승객 이름<br><input></label></div>
      <div><label>도착지<br><select>
        <option>호텔A</option>
        <option>호텔B</option>
        <option>호텔C</option>
      </select></label></div>
      <div class="changeNum">
        승객 수
        <div>
          <button @click="addNum > 1 ? addNum-- : ''"></button>
          <div>{{ addNum }}</div>
          <button @click="addNum < maxNum ? addNum++ : ''"></button>
        </div>
      </div>
      <div><button class="submit" @click="add()">제출</button></div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmStatus: 'ok',
      addNum: 1,
      maxNum: 10,
      text: '',
    };
  },
  methods: {
    submit() {
      if (this.confirmStatus === 'wrong' && this.text === '') {
        alert('이슈사항을 입력해주세요.');
        return;
      }
      this.$router.back();
      alert('제출되었습니다. 감사합니다.');
    },
    add() {
      this.$router.back();
      alert('제출되었습니다. 감사합니다.');
    },
  },
};
</script>

<style lang="scss" scoped>
  .modalWrapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    background-color: rgba(0,0,0,.3);
    > div{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      box-shadow: 0 0 4px 2px rgba(0,0,0,.1);
      background-color: #FFF;
      > div{
        padding: 20px 24px;
        &.confirm{
          > div:first-of-type, > div:nth-of-type(2){
            line-height: 26px;
            padding-top: 2px;
            height: 30px;
            input{
              margin-right: 12px;
            }
          }
          textarea{
            padding: 12px;
            margin-top: 10px;
            width: 100%;
            resize: none;
            border: 1px solid #eeeeee;
            height: 140px;
            display: block;
          }
          button{
            margin-top: 10px;
            height: 40px;
            border: 1px solid #ddd;
            width: 100%;
          }
        }
        &.add{
          label{
            display: block;
            font-size: 14px;
            padding-bottom: 10px;
            input, select{
              margin-top: 8px;
              width: 100%;
              height: 34px;
              border: 1px solid #eeeeee;
              padding: 0 12px;
              background-color: #FFF;
            }
          }
          .changeNum{
            font-size: 14px;
            > div{
              padding-top: 10px;
              display: flex;
              > div{
                font-size: 16px;
                flex: auto;
                border: 1px solid #eee;
                border-right: 0;
                height: 34px;
                line-height: 32px;
                text-align: center;
              }
              > button{
                flex: 0 0 30%;
                border: 1px solid #eee;
                border-right: 0;
                background-repeat: no-repeat;
                background-position: center center;
                &:first-of-type{
                  background-image: url(~assets/minus.svg);
                }
                &:last-of-type{
                  border-right: 1px solid #eee;
                  background-image: url(~assets/plus.svg);
                }
              }
            }
          }
          button.submit{
            margin-top: 24px;
            height: 40px;
            border: 1px solid #ddd;
            width: 100%;
          }
        }
      }
    }
  }
</style>
