<template>
  <div class="us">
    <div class="left">
      <div>Let us join hands in the future</div>
      <div>
        MSRA welcomes collaborations with other organizations to find innovative
        solutions to problems faced by our environment.
      </div>
      <div class="btn">
        <a target="_blank" href="mailto:carboninsight@microsoft.com">JOIN US</a>
        <span></span>
      </div>
    </div>
    <div class="right">
      <img
        :src="
          phone
            ? require('@/assets/joinus_phone.png')
            : require('@/assets/joinus.png')
        "
        alt=""
      />
    </div>
    <div class="btn btnphone">
      <a target="_blank" href="mailto:carboninsight@microsoft.com">JOIN US</a>
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
  props: ["phone"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.us {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // flex-wrap: wrap;
  max-width: 1464px;
  margin: 0 auto;
  padding: 0 40px 0;
  position: relative;
  padding-bottom: 192px;
  .left {
    max-width: 590px;
    min-width: 320px;
    color: #000000;
    div:nth-child(1) {
      margin-top: 162px;
      font-weight: normal;
      font-size: 18px;
      line-height: 16px;
    }
    div:nth-child(2) {
      // font-size: 16px;
      // color: #6D6D6D;
      margin-top: 18px;
      font-weight: bold;
      font-size: 46px;
      line-height: 54px;
    }
  }
  .btn {
    width: 200px;
    height: 72px;
    margin-top: 59px;
    background: #030303;
    border: 2px solid #000000;
    box-sizing: border-box;
    border-radius: 80px;
    color: #ffffff;
    line-height: 72px;
    padding-left: 45px;
    font-size: 18px;
    cursor: pointer;
    a {
      color: #ffffff;
    }
    span {
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid #fff;
      background-color: #000000;
      position: relative;
      margin-left: 22px;
    }
    span:after {
      content: "";
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      border-left: 4px solid #000000;
      position: absolute;
      top: -3px;
      left: -6.7px;
    }
  }
  .right {
    margin-top: 164px;
    height: 100%;
    max-width: 640px;
    min-width: 320px;
    img {
      width: 100%;
    }
  }
  .btnphone {
    display: none;
  }
  .backtop {
    position: absolute;
    bottom: 0;
    right: -72px;
    z-index: 10;
  }
}
@media screen and (max-width: 1980px) {
  .us {
    padding-bottom: 120px;
    .left {
      div:nth-child(1) {
        font-size: 16px;
        line-height: 14px;
      }
      div:nth-child(2) {
        font-size: 40px;
        line-height: 48px;
      }
    }
    .right {
      margin-top: 98px;
      img {
        max-width: 560px;
        max-height: 560px;
      }
    }
  }
}
@media screen and (max-width: 720px) {
  .us {
    flex-wrap: wrap;
    .left {
      .btn {
        display: none;
      }
    }
    .btnphone {
      display: block;
      width: 100%;
      padding-left: 20px;
      text-align: center;
      margin-top: 48px;
    }
  }
}
@media screen and (max-width: 639px) {
  .us {
    padding-bottom: 100px;
    padding: 0 20px;
    .left {
      div:nth-child(1) {
        font-size: 16px;
        line-height: 14px;
        margin-top: 100px;
      }
      div:nth-child(2) {
        font-size: 32px;
        line-height: 42px;
      }
    }
    .right {
      width: 100%;
      margin-top: 48px;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
