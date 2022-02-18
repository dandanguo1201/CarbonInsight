<template>
  <!-- <div style="position:relative"> -->
  <div class="home" :style="{ position: pos }">
    <!-- <div class="page1" id="page1" :style="{'height':height+'px'}" @wheel="handleWheel()"> -->
    <div
      class="page1"
      id="page1"
      :style="{ height: height + 'px' }"
      @wheel="handleScroll($event)"
      @touchmove="handleScroll($event)"
      @scroll="handleScroll($event)"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    >
      <img
        class="img"
        alt=""
        id="bigimg"
        :src="bgImg"
        :style="{ width: width + '%', height: h + '%' }"
      />
      <div class="nav">
        <header-new
          @toemission="toemission"
          @tosink="tosink"
          @tosign="tosign"
          @toflag="toflag"
          @toaboutus="toaboutus"
          @tomenu="tomenu"
          :sign="true"
          :flag="flag"
          :menu="menu"
          :name="'home'"
          ref="head"
        />
      </div>
      <div class="title_box">
        <div class="btitle">Carbon Insight</div>
        <div class="stitle">
          <div class="animate" id="animate">
            {{ stitle }}
          </div>
        </div>
      </div>
      <div class="bottom">
        <!-- <a href="#emission" @click="nextPage"> -->
        <a>
          <div class="scroll">Scroll Down</div>
          <img src="../assets/arrow.png" alt="" />
        </a>
      </div>
    </div>
    <!-- <div class="page2" id="page2">
      <Source />
    </div> -->
    <!-- <div class="page3" id="emission"  :style="{'height':height+'px'}"> -->
    <div class="page3" id="emission">
      <Emission @toemission="toemission" :height="height" />
    </div>
    <!-- <div class="page4">
      <Sink @tosink="tosink" />
    </div> -->
    <!-- <div class="future" id="future" :style="{ height: height + 'px' }">
      <div class="title">Future Work</div>
      <div class="text1 text">
        Help policy makers quickly identify the emission reduction plan with the
        best emission reduction effect and the lowest cost.
      </div>
      <div class="text2 text">
        Propose carbon-negative ideas for countries at different stages of
        development.
      </div>
      <div class="text3 text">Power Generation Optimization in Wind Farm.</div>
      <div class="text4 text">
        New Material Discovery for Energy Storage and Carbon Capturing.
      </div>
      <div class="text5 text">to be continued.</div>
    </div> -->
    <div class="page6">
      <Problem />
    </div>
    <!-- <div class="page7">
      <Us />
    </div> -->
    <!-- <div class="page7">
      <div class="title">Contributors</div>
      <div class="content">
        <span @click="tomicrosoft"><img src="../assets/logo1.png" alt="" /></span>
        <span @click="totsinghua"><img src="../assets/logo2.png" alt="" /></span>
        <span @click="tocarbonmonitor"><img src="../assets/logo3.png" alt="" /></span>
      </div>
    </div> -->
    <div class="page8">
      <FooterNew
        @toemission="toemission"
        @tosink="tosink"
        @toaboutus="toaboutus"
        :bgc="bgc"
      />
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import Slider from "../components/Slider.vue";
import Source from "../components/Source.vue";
import Emission from "../components/Emission.vue";
import Sink from "../components/Sink.vue";
import Problem from "../components/Problem.vue";
import Us from "../components/Us.vue";
import FooterNew from "../components/FooterNew.vue";
import HeaderNew from "@/components/HeaderNew.vue";
import authentication from "../request/authentication";
import bg from "../assets/bg.png";
import bg_phone from "../assets/bg_phone.png";

export default {
  name: "CarbonHome",
  components: {
    Slider,
    Source,
    Sink,
    Emission,
    Problem,
    Us,
    FooterNew,
    HeaderNew,
  },
  data() {
    return {
      bgImg: bg,
      bgc: "background:#F9F9F9",
      width: 100,
      h: 100,
      height: "",
      titleList: [
        "A visualized data platform of carbon source and carbon sink.",
        "A computer technology platform to formulate and optimize carbon neutralization pathway and technology, to simulate and forecast the outcome.",
        "Presents computational innovations to address the grand challenges of Global Warming.",
      ],
      stitle: "A visualized data platform of carbon source and carbon sink.",
      stitleIndex: 0,
      index: 0,
      toPage: 0,
      pos: "relative",
      opacity: 1,
      top: 0,
      flag: false,
      Interval: null,
      menu: false,
    };
  },
  created() {
    this.height =
      document.documentElement.clientHeight || document.body.clientHeight;
    var width =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 639) {
      this.bgImg = bg_phone;
    } else {
      this.bgImg = bg;
    }
  },
  mounted() {
    // window.addEventListener(
    //   "mousewheel",
    //   this.handleScroll,
    //   true
    // ) ||
    // window.addEventListener(
    //   "DOMMouseScroll",
    //   this.handleScroll,
    //   false
    // );
    this.Interval = setInterval(() => {
      if (this.stitleIndex < 2) {
        this.stitleIndex += 1;
        this.stitle = this.titleList[this.stitleIndex];
      } else {
        this.stitleIndex = 0;
        this.stitle = this.titleList[0];
      }
    }, 5000);
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        //监听浏览器窗口大小改变
        this.height =
          document.documentElement.clientHeight || document.body.clientHeight;
        var width =
          document.documentElement.clientWidth || document.body.clientWidth;
        if (width < 639) {
          this.bgImg = bg_phone;
        } else {
          this.bgImg = bg;
        }
      });
      document.addEventListener("click", (e) => {
        if (e.path[0].id == "username") {
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
    });
  },
  destory() {
    clearInterval(this.Interval);
  },
  methods: {
    handleWheel(event) {
      if (this.index < 2) {
        this.pos = "fixed";
      } else {
        this.pos = "relative";
      }
    },
    nextPage() {
      this.pos = "relative";
    },
    toemission(param) {
      this.$router.push("/carbonemission/"+ param);
    },
    tosink() {
      this.$router.push("/carbonsink");
    },
    toaboutus() {
      this.$router.push("/aboutus");
    },
    tosign() {
      if (authentication.isAuthenticated()) {
        authentication.signOut();
      } else {
        authentication.signIn();
        authentication.getUserProfile();
      }
    },
    toflag() {
      this.flag = true;
    },
    tomenu(param) {
      this.menu = param;
    },
    tomicrosoft() {
      window.open("http://www.microsoft.com/");
    },
    totsinghua() {
      window.open("https://www.tsinghua.edu.cn/en/");
    },
    tocarbonmonitor() {
      window.open("https://carbonmonitor.org/");
    },
    //函数防抖
    debounce(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    },
    //滚动翻页
    handleScroll(e) {
      if (this.menu == true) return;
      const height = document.body.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // if (Math.abs(scrollTop - this.toPage * height) > 1) return;
      // const onPage = Math.round(scrollTop / height);
      // if (onPage === 0 && e.deltaY <= 0) return;
      // if (onPage === 5 && e.deltaY >= 0) return;
      // this.toPage = onPage + (e.deltaY > 0 ? 1 : -1);
      // console.log(onPage, this.toPage);
      if (this.toPage === 1) {
        return;
      } else if (scrollTop >= height || e.deltaY <= 0) {
        window.scrollBy({
          left: 0,
          top: e.deltaY,
          behavior: "smooth",
        });
        return;
      } else {
        this.toPage = 1;
      }
      // sigmoid
      const damp = (
        getVal,
        setVal,
        source,
        target,
        sharpness,
        now,
        cycle,
        tick
      ) => {
        if (now < cycle) {
          setTimeout(() => {
            setVal(
              source +
                (target - source) *
                  (1 / (1 + Math.exp(-sharpness * (now / cycle - 0.5))))
            );
            damp(
              getVal,
              setVal,
              source,
              target,
              sharpness,
              now + 1,
              cycle,
              tick
            );
          }, tick);
        } else {
          setVal(target);
          this.toPage = 0;
        }
      };
      damp(
        () => document.documentElement.scrollTop || document.body.scrollTop,
        (x) => {
          document.documentElement.scrollTop = x;
          document.body.scrollTop = x;
        },
        scrollTop,
        this.toPage * height + 1,
        10,
        0,
        50,
        20
      );
    },
  },
};
</script>
<style scoped lang='scss'>
.home {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  video {
    object-fit: fill;
  }
  a {
    text-decoration: none; //去掉下划线
    color: inherit;
  }
  .page1 {
    width: 100%;
    height: 900px;
    margin: 0 auto;
    // background: url('~@/assets/bg.png');
    // background-size: 100% 100%;
    position: relative;
    z-index: 100;
    text-align: center;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
      transition: all 1s;
    }
  }
  .nav {
    height: 80px;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1000;
    // max-width: 1384px;
    // margin: 0 auto;
    // padding: 0 9.9%;
  }
  .title_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .btitle,
  .stitle {
    display: flex;
    justify-content: center;
    color: #ffffff;
  }

  .btitle {
    font-weight: bold;
    font-size: 48px;
    white-space: nowrap;
    // margin-top: 228px;
  }
  .stitle {
    display: block;
    // width: 846px;
    width: 70%;
    margin-left: 15%;
    height: 78px;
    font-size: 18px;
    line-height: 28px;
    font-weight: regular;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
    > div {
      text-align: center;
      display: block;
    }
  }
  .animate {
    width: 100%;
    font-size: 18px;
    padding-left: 20px;
    font-weight: 500;
    display: inline-block;
    /* 动画时间10秒，动画名称worldsLoop，动画速度从头到尾一样，无限循环，正常播放 */
    animation: 5s wordsLoop linear infinite normal;
  }
  @keyframes wordsLoop {
    0% {
      transform: translateY(50px);
      -webkit-transform: translateY(50px);
      opacity: 0;
    }
    35% {
      transform: translateY(20px);
      -webkit-transform: translateY(20px);
      opacity: 1;
    }
    65% {
      transform: translateY(20px);
      -webkit-transform: translateY(20px);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      -webkit-transform: translateY(-100%);
      opacity: 0;
    }
  }
  @-webkit-keyframes wordsLoop {
    0% {
      transform: translateY(50px);
      -webkit-transform: translateY(50px);
    }
    35% {
      transform: translateY(20px);
      -webkit-transform: translateY(20px);
      opacity: 1;
    }
    65% {
      transform: translateY(20px);
      -webkit-transform: translateY(20px);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      -webkit-transform: translateY(-100%);
      // background-color: #5C7C99;
      opacity: 0;
    }
  }
  .bottom {
    color: #fff;
    position: absolute;
    bottom: 3%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    a {
      text-decoration: none;
      // outline: none;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: auto;
    }
    .icon1 {
      margin-top: -6px;
    }
    .icon2 {
      margin-top: -12px;
    }
    .icon1 i {
      opacity: 0.4;
    }
  }
  .page2 {
    padding: 0 9.9%;
    padding-top: 76px;
    padding-bottom: 108px;
    color: #000000;
  }
  .page3 {
    padding: 0 9.9%;
    padding-top: 138px;
    padding-bottom: 40px;
    @media screen and (max-width: 639px) {
      padding-bottom: 60px;
      padding-top: 28px;
    }
  }
  .page4 {
    padding: 0 9.9%;
    background: #f9f9f9;
  }
  .page6 {
    box-sizing: border-box;
    margin: 0 auto;
    margin-bottom: 120px;
    width: 100%;
    padding: 0 9.9%;
    background: #ffffff;
    height: 100%;
  }
  .page7 {
    width: 100%;
    background: #ffffff;
    max-width: 1384px;
    margin: 0 auto;
    .title {
      display: flex;
      justify-content: center;
      padding-top: 120px;
      font-weight: bold;
      font-size: 32px;
      line-height: 54px;
      color: #3d342f;
    }
    // /deep/ .ant-row{
    //   width: 100%;
    //   .ant-col{
    //     text-align: center;
    //     a{
    //       display: inline-block;
    //       img{
    //         margin-left: 30px;
    //       }
    //     }
    //     &:nth-child(1)>a img{
    //       width: 182px;
    //       height: 52px;
    //     }
    //     &:nth-child(2)>a img{
    //       width: 148px;
    //       height: 52px;
    //     }
    //     &:nth-child(3)>a img{
    //       width: 125px;
    //       height: 52px;
    //     }
    //   }
    // }
    .content {
      padding-left: 16.14%;
      padding-right: 19.27%;
      padding-bottom: 120px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      span {
        display: inline-block;
        margin-right: 30px;
        padding-top: 57px;
      }
      span:nth-child(1) img {
        // width: 182px;
        width: 148px;
        height: auto;
      }
      span:nth-child(2) img {
        width: 148px;
        // height: 52px;
        height: auto;
      }
      span:nth-child(3) img {
        // width: 125px;
        width: 148px;
        height: auto;
      }
      @media screen and (max-width: 639px) {
        display: block;
        padding-bottom: 90px;
        span {
          padding-top: 40px;
          display: flex;
          justify-content: center;
          margin: 0 auto;
        }
      }
    }
  }
  .page8 {
    // border-top: 1px solid#CDCDCD;
    width: 100%;
    // padding: 5.6% 9.9% 0;
    background: #f9f9f9;
    // height:434px;
  }
  .future {
    width: 100%;
    // height: 900px;
    // border: 1px solid red;
    background: url("~@/assets/future.png");
    background-size: 100% 100%;
    position: relative;
    // background-repeat: no-repeat;
    // background-position: center 0;
    .title {
      position: absolute;
      left: 3%;
      top: 5%;
      font-weight: 600;
      font-size: 32px;
      line-height: 70px;
      color: #ffffff;
    }
    .text {
      // width: 191px;
      height: 80px;
      width: 15.78%;
      position: absolute;
      //bottom: 6%;
      bottom: 120px;
      // bottom: 20%;
      font-size: 18px;
      line-height: 27px;
      letter-spacing: 0.02em;
      color: #ffffff;
    }
    .text1 {
      left: 3%;
    }
    .text2 {
      left: 23%;
    }
    .text3 {
      left: 43%;
    }
    .text4 {
      left: 63%;
    }
    .text5 {
      left: 83%;
    }
    .web_bg {
      background: url("~@/assets/future.png");
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      min-width: 1000px;
      z-index: -10;
      zoom: 1;
      background-color: #fff;
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -o-background-size: cover;
      background-position: center 0;
    }
  }
}
@media screen and (max-width: 639px) {
  .page1 .title_box {
    .btitle {
      font-size: 42px;
    }
    .stitle {
      height: 140px;
      margin-top: -10px;
    }
  }
  .page7 .title {
    padding-top: 40px;
    padding-bottom: 16px;
  }
}
@media screen and (max-width: 375px) {
  .page1 .title_box {
    .btitle {
      font-size: 42px;
    }
    .stitle {
      height: 210px;
      margin-top: 10px;
    }
  }
  .page7 .title {
    padding-top: 40px;
    padding-bottom: 16px;
  }
}
.banner {
  position: relative;
}
.list-item {
  width: 100%;
  position: absolute;
}
.imgs-enter-active,
.imgs-leave-active {
  transition: all 1s ease;
}
.imgs-enter {
  transform: translateX(100%);
}
.imgs-enter-to {
  transform: translateX(0);
}
.imgs-leave {
  transform: translateX(0);
}
.imgs-leave-to {
  transform: translateX(-100%);
}
</style>
