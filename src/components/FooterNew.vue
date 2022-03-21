<template>
  <div class="footer" :style="bgc">
    <!-- <div class="joinus">
      <div class="left">
          <span>Get more carbon insight newsletter, then join us.</span>
          <span>Stay connected to our latest data and researches on carbon emission, sink, and mitigation.</span>
      </div>
      <div class="right">
        <input type="text" placeholder="Your email"><button>Subscribe</button>
        <span>Explore our other datas</span>
      </div>
    </div>
    <div class="line"></div> -->
    <div class="top">
      <div class="left">
        <div>
          <button aria-label="Microsoftlogo1" @click="tomsra">
            <img src="../assets/Microsoftlogo1.png" alt="" />
          </button>
          <button aria-label="CarbonInsightlogo1">
            <img src="../assets/CarbonInsightlogo1.png" alt="" />
          </button>
        </div>
        <div>
          <a target="_blank" href="https://github.com/microsoft/Carbon-Insight"
            ><img
              src="../assets/icon_github.svg"
              alt=""
            />https://github.com/microsoft/Carbon-Insight</a
          >
        </div>
        <div>
          Carbon Insight is a visualized data platform of global carbon emission
          and sink data and a technology platform that simulates pathways to
          carbon neutralization. It presents computational innovations to
          address the grand challenges of Global Warming.
        </div>
      </div>
      <div class="right">
        <div>
          <span>Learn</span>
          <button
            v-for="(item, index) in tablist"
            :key="index"
            @click="toJump($event, item.key)"
          >
            {{ item.title }}
          </button>
        </div>
        <div>
          <span>Connect</span>
          <button @click="toaboutus">About Us</button>
          <div>
            <a target="_blank" href="mailto:carboninsight@microsoft.com"
              >Contact Us</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div>
          <a target="_blank" href="https://go.microsoft.com/?linkid=2028325"
            >Contact Microsoft</a
          >
        </div>
        <div>
          <a
            target="_blank"
            href="https://privacy.microsoft.com/privacystatement"
            >Privacy & Cookies</a
          >
        </div>
        <div>
          <a
            target="_blank"
            href="https://www.microsoft.com/en-us/legal/terms-of-use"
            >Terms of Use</a
          >
        </div>
        <div>
          <a
            target="_blank"
            href="https://www.microsoft.com/en-us/legal/intellectualproperty/Trademarks/EN-US.aspx"
            >Trademarks</a
          >
        </div>
      </div>
      <div>© Microsoft 2021</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: ["bgc"],
  data() {
    return {
      tablist: [
        { title: "Carbon emission", key: "emission1" },
        { title: "Carbon emission & COVID", key: "emission2" },
        { title: "Carbon emission & Social Economy", key: "emission3" },
      ],
    };
  },
  methods: {
    toJump(e, param) {
      if (param.indexOf("emission") !== -1) {
        this.$router.push("/carbonemission/" + param.charAt(param.length - 1));
      } else {
        this.$router.push("/aboutus");
      }
    },
    tomsra() {
      window.open("https://www.msra.cn/");
    },
    toaboutus() {
      this.$emit("toaboutus");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  a {
    text-decoration: none; //去掉下划线
    color: inherit;
  }
  width: 100%;
  height: 100%;
  .joinus,
  .top,
  .bottom {
    max-width: 1464px;
    padding: 0 40px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  // .joinus{
  //   width: 100%;
  //   height: 388px;
  //   padding-top: 119px;
  //   flex-wrap: wrap;
  //   .left {
  //     width: 644px;
  //     // margin-right: 146px;
  //     margin-right: 7.6%;
  //     span{
  //       display: block;
  //       color: #000000;
  //     }
  //     span:first-child{
  //       width: 607px;
  //       font-weight: bold;
  //       font-size: 32px;
  //       line-height: 36px;
  //     }
  //     span:last-child{
  //       font-size: 18px;
  //       line-height: 27px;
  //       opacity: 0.8;
  //       margin-top: 26px;
  //     }
  //   }
  //   .right{
  //     width: 594px;
  //     height: 84px;
  //     display: block;

  //     input{
  //       background:none;
  //       outline:none;
  //       border:none;
  //       width: 485px;
  //       height: 48px;
  //       background: #FFFFFF;
  //       border-radius: 2px;
  //       padding-left: 16px;
  //       font-size: 18px;
  //       line-height: 18px;
  //       color: #6F6F6F;
  //     }
  //     input::placeholder {
  //       font-size: 18px;
  //       line-height: 18px;
  //       color: #6F6F6F;
  //     }
  //     button{
  //       width: 108px;
  //       height: 48px;
  //       background: #008575;
  //       border-radius: 2px;
  //       color: #FFFFFF;
  //       opacity: 0.8;
  //       font-size: 18px;
  //       line-height: 18px;
  //     }
  //     span{
  //       display: block;
  //       font-size: 18px;
  //       line-height: 24px;
  //       color: #6F6F6F;
  //       margin-top: 12px;
  //     }
  //   }
  // }
  // .line {
  //   // position: absolute;
  //   // left: -10%;
  //   // top: 388px;
  //   width: 100%;
  //   border-bottom: 1px solid #e1e1e1;
  // }
  .top {
    margin-bottom: 72.36px;
    // padding-top: 120px;
    display: flex;
    flex-wrap: wrap;
    .left {
      padding-top: 80px;
    }
    @media screen and (max-width: 639px) {
      flex-wrap: wrap;
      margin-bottom: 12px;
      .left > div:nth-child(2) {
        width: 100%;
      }
      .left > div:nth-child(1) {
        flex-wrap: wrap;
      }
      .right {
        width: 100%;
        padding-top: 30px;
        > button {
          width: 50%;
          text-align: left;
        }
        > div {
          margin-bottom: 20px;
        }
      }
    }
  }

  .left > div:nth-child(1) {
    font-weight: bold;
    font-size: 24px;
    color: #000000;
    white-space: nowrap;
    display: flex;
    align-items: center;
    img {
      height: 24px;
    }
    button:nth-child(1) {
      cursor: pointer;
    }
    button:nth-child(2) {
      margin-left: 40px;
    }
    button:nth-child(2)::before {
      content: "";
      position: absolute;
      height: 16px;
      width: 1px;
      margin-left: -20px;
      margin-top: 12px;
      background: #737373;
    }
  }
  .left > div:nth-child(2) {
    margin-top: 56px;
    img {
      width: 25.12px;
      height: 24px;
      margin-right: 8.88px;
    }
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #6f6f6f;
  }
  .left > div:nth-child(3) {
    max-width: 831px;
    font-size: 16px;
    line-height: 24px;
    color: #666666;
    margin-top: 40.49px;
  }
  .right {
    font-size: 16px;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 80px;
    > div:first-child {
      margin-right: 70px;
    }
    > div {
      span,
      button {
        display: block;
        font-size: 16px;
        color: #6f6f6f;
      }
      span {
        font-weight: bold;
        line-height: 21px;
        margin-bottom: 26.33px;
      }
      button {
        line-height: 32px;
        cursor: pointer;
        margin-bottom: 24px;
      }
    }
  }
  .bottom {
    width: 100%;
    padding-bottom: 71.58px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 16px;
    color: #6d6d6d;
    > div:nth-child(1) {
      div {
        display: inline-block;
        margin-right: 40px;
      }
    }
    @media screen and (max-width: 639px) {
      position: relative;
      // height: 68px;
      padding-bottom: 31.58px;
      margin-top: 32px;
      div {
        font-size: 14px;
        line-height: 28px;
        line-height: 40px;
        flex-wrap: wrap;
      }
      padding-top: 6px;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
