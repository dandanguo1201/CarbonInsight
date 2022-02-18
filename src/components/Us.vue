<template>
    <div class="us">
       <div class="left">
            <div>Collaborate With Us</div>
            <div>MSRA welcomes collaborations with other organizations to find innovativesolutions to problems faced by our environment. </div>
            <div>
              Learn more
               <img src="../assets/next.png" alt=""/>
            </div>
       </div>
       <div class="right">
          <img src="../assets/us.png" alt="" />
          <img class="backtop" src="../assets/top.png"  alt=""/>
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

  }
}
</script>
<style scoped lang='scss'>
.us{
  display: flex;
  justify-content: space-between;
  margin: 0 120px;
  position: relative;
  .left{
    width: 449px;
    color: #000000;
    div:nth-child(1){
      font-weight: bold;
      font-size: 46px;
      margin-top: 162px;
      line-height: 24px;
    }
    div:nth-child(2){
      font-size: 16px;
      color: #6D6D6D;
      margin-top: 39px;
    }
    div:nth-child(3){
      margin-top: 85px;
      width: 240px;
      height: 64px;
      border: 1px solid #000000;
      box-sizing: border-box;
      border-radius: 80px;
      line-height: 64px;
      font-size: 16px;
      text-align: center;
      img{
        margin-left: 23px;
      }
    }
  }
  .right{
    margin-top: 98px;
  }
  .backtop{
    position: absolute;
    bottom: 0;
    right: -72px;
    z-index: 10;
  }
}
</style>