<template>
    <div class="sink" >
        <div class="left">
            <div>Carbon Sink</div>
            <div>A carbon sink accumulates and stores carbon from the atmosphere. This section highlights variations in the amount of carbon stored in different parts of the ocean and land in the recent few decades.</div>
            <button @click="goSink">
              <div class="learn">Learn more</div>
              <div class="img"></div>
            </button>
        </div>
        <div class="right">
            <div class="gif"></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'About',
   data() {
    return {

    };
  },
  mounted(){

  },
  methods: {
    goSink(){
      this.$emit('tosink')
    }
  }
}
</script>
<style scoped lang='scss'>
.sink{
  width: 100%;
  max-width: 1384px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-top: 13.74%;
  padding-top: 130px;
  padding-bottom: 160px;
  .left{
      height: 100%;
      width: 31.32%;
      color: #696767;
      div:nth-child(1){
        color:#000000;
        font-weight: bold;
        font-size: 32px;
        line-height: 24px;
        white-space: nowrap;
      }
      div:nth-child(2){
        font-size: 18px;
        color: #000000;
        line-height: 27px;
        // margin-top: 60px;
        margin-top: 8.8%;
      }
      button{
        overflow: hidden;
        margin-top: 48px;
        width: 240px;
        height: 64px;
        border: 1.5px solid #5E483A;
        box-sizing: border-box;
        border-radius: 80px;
        color: #5E483A;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .learn{
          line-height: 64px;
          font-size: 16px;
          width: 100%;
          height: 100%;
          margin-left: 51.12px;
          white-space:nowrap;
          margin-top: 0;
          color: #5E483A;
        }
        .img{
          width: 100%;
          height: 100%;
          margin-left: 23px;
          margin-top: 58px;
          background: url('~@/assets/next1.svg') no-repeat;
        }
      }
      div:nth-child(3):hover{
        background-color: #5E483A;
        .img{
          width: 100%;
          height: 100%;
          margin-left: 23px;
          background: url('~@/assets/next2.svg') no-repeat;
        }
        .learn{
          color: #ffffff;
        }
      }
  }
  .right{
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 68.68%;
    height: 100%;
    .gif{
      height: 464px; 
      width: 720px;
      background: url("~@/assets/CarbonSinkLandPage1.gif") no-repeat;  //在这里可以进行更改
      background-size: 100% auto;
      background-position: center center;
    }
    >div{
      color: #666666;
    }
  }
  @media screen and (max-width: 639px) {
    flex-wrap: wrap;
    padding-bottom: 24px;
    .left{
      width: 100%;
      div:nth-child(3){
        width: 180px;
        margin-top: 30px;
        .learn{
          margin-left: 28px;
        }
        .img{
          margin-left: 16px;
        }
      }
    }
    .right{
      display: block;
      width: 100%;
      height: 308px;
      background: url("~@/assets/CarbonSinkLandPage1.gif") no-repeat;  //在这里可以进行更改
      background-size: 100%  auto;
      margin-top: 56px;
      .gif{
        height: 0;
        width: 0;
        background: none;
      }
    }
  }
  @media screen and (max-width: 375px) {
    .right{
      height: auto;
    }
  }
}
</style>