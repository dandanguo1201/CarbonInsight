<template>
  <div class="header">
      <div class="left">
        <span>Source</span>
        <span>Management</span>
        <span>Benefit</span>
      </div>
      <div class="middle">
          <span>CARBON INSIGHT</span>
      </div>
      <div class="right">
        <span>Research</span>
        <span>Data</span>
        <span>Join us</span>
        <span>EN<a-icon type="down" /></span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header{
  height: 90.13px;
  background: url('~@/assets/header_bg.png');
  background-size: 100% 100%; 
  padding: 0 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Segoe UI;
  color: #FFFFFF;
  .left{
    font-size: 14px;
    line-height: 24px;
      span{
        display: inline-block;
        margin-right: 20px;
      }
  }
  .middle{
    font-weight: 900;
    font-size: 36px;
    line-height: 24px;
  }
  .right{
    font-size: 14px;
    line-height: 24px;
    span{
      display: inline-block;
      margin-left: 36px;
      &:last-child{
        margin-left: 20px;
        position: relative;
        i {
          position: relative;
          top: -2px;
          left: 4.67px;
          font-size: 8px;
        }
      }
    }
  }
}
</style>
