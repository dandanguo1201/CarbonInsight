<template>
  <div class="home" :style="{ position: pos }">
    <div
      class="pagenav"
      id="pagenav"
      :style="{
        width: width + '%',
        height: height + 'px',
      }"
      @wheel="handleScrollpagenav($event)"
      @touchmove="handleScrollpagenav($event)"
      @scroll="handleScrollpagenav($event)"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    >
      <div
        class="logo"
        :style="{
          width: width + '%',
          height: height + 'px',
        }"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
      >
        <div class="box">
          <img class="img1 logoanimated1" alt="" src="../assets/theme1.svg" />
          <img class="img2 logoanimated2" alt="" src="../assets/theme2.svg" />
        </div>
      </div>
      <img
        class="img"
        alt=""
        :src="
          phone
            ? require('@/assets/bg1_phone.png')
            : require('@/assets/bg1.png')
        "
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
      <div class="title" :style="{}">
        <span
          >Human-caused CO2 <br />emissions have <br />increased by 60%
          <br />from 1992. <br
        /></span>
      </div>
      <div class="bottom">
        <a>
          <div class="scroll">Scroll to explore</div>
          <div class="animated"></div>
        </a>
      </div>
    </div>
    <div
      class="pageclone"
      id="pageclone"
      @wheel="handleScrollpageclone($event)"
      @touchmove="handleScrollpageclone($event)"
      @scroll="handleScrollpageclone($event)"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      :style="{ height: height + 'px' }"
    >
      <div class="imgbox" v-show="clone">
        <img
          id="clone"
          :class="phone ? 'phoneanimated' : 'animated'"
          alt=""
          :src="
            phone
              ? require('@/assets/bg2_phone.png')
              : require('@/assets/bg2.png')
          "
          :style="phone ? { height: auto } : { height: h + '%' }"
        />
      </div>
      <div class="number-grow-warp">
        <div><p>Every Year, The World Adds</p></div>
        <div>
          <span
            ref="numberGrow"
            :data-time="time"
            class="number-grow"
            :data-value="value"
            >33.00</span
          >
          <span>Gt of</span><br />
        </div>
        <div>Carbon Dioxide Gases</div>
        <div>to the Atmosphere</div>
      </div>
    </div>
    <div class="contentbg">
      <img
        class="pageworks"
        id="pageworks"
        :style="{
          width: width + '%',
          height: height + 'px',
        }"
        :src="
          phone
            ? require('@/assets/bg3_phone.png')
            : require('@/assets/bg3.png')
        "
        alt=""
      />
      <div
        id="contentbox"
        @wheel="handleScrollpageworks($event)"
        @touchmove="handleScrollpageworks($event)"
        @scroll="handleScrollpageworks($event)"
      >
        <div
          class="works"
          :style="{
            width: width + '%',
            height: height + 'px',
          }"
        >
          <p>
            For a long time, we did not know where exactly do these CO2 come
            from
          </p>
        </div>
        <div
          class="works"
          :style="{
            width: width + '%',
            height: height + 'px',
          }"
        >
          <p>
            Now, we can track carbon emission and mitigation data by years,
            months and even days
          </p>
        </div>
        <div class="pagewords" id="pagewords">
          <div>
            To limit global warming below 1.5℃, the world can only emit another
            420 billion tons of CO2, equivalent to 13 years of the current
            global emissions.
          </div>
          <div>
            With the global consensus of the 1.5°C goal of the Paris Agreement,
            the world must achieve carbon neutralization by 2050. The current
            global emission rate leaves us only 13 years to reach net-zero
            emission. To tackle the climate crisis together, we must lower
            emissions and reduce the already emitted carbon in the atmosphere.
            First, we must understand where carbon comes from and where it goes.
            At Carbon Insight, we provide the world's cutting-edge research on
            carbon emissions, carbon sinks and carbon neutralization. With
            visualization and computational tools, we are making these studies
            easily accessible to researchers, policymakers, and that cares about
            the environment to drive climate actions across the world.
          </div>
        </div>
        <span class="line"></span>
        <div class="page3" id="emission">
          <Emission @toemission="toemission" :height="height" />
        </div>

        <div class="page6">
          <CovidChart :phone="phone" />
        </div>
        <div class="page6">
          <GDPChart :phone="phone" />
        </div>
        <div
          class="pageforest"
          ref="pageforest"
          :style="{
            width: width + '%',
            height: height + 'px',
          }"
        >
          <img
            :src="
              phone
                ? require('@/assets/bg4_phone.png')
                : require('@/assets/bg4.png')
            "
            alt=""
          />
          <div v-show="forest" class="forest">
            <span>Future Work, Our Passion, Our Purpose</span>
            <span
              >Carbon capture, storage and utilisation: the opportunity for a
              world with net-zero carbon
            </span>
          </div>
        </div>
        <div class="page6">
          <Problem />
        </div>
        <div class="page7">
          <Us :phone="phone" />
        </div>
        <div class="page8">
          <FooterNew
            @toemission="toemission"
            @tosink="tosink"
            @toaboutus="toaboutus"
            :bgc="bgc"
          />
        </div>
      </div>
    </div>
  </div>
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
import CovidChart from "../components/CovidChart.vue";
import GDPChart from "../components/GDPChart.vue";

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
    CovidChart,
    GDPChart,
  },
  data() {
    return {
      time: 1,
      value: 33,
      bgc: "background:#F9F9F9",
      width: 100,
      h: 100,
      height: "",
      stitleIndex: 0,
      index: 0,
      toPage: 0,
      pos: "relative",
      opacity: 1,
      top: 0,
      flag: false,
      Interval: null,
      menu: false,
      timeout: null,
      lock: 0,
      scrollTop: null,
      phone: false,
      nav: false,
      line: false,
      clone: false,
      works: false,
      forest: false,
      logo: false,
    };
  },
  created() {
    this.height =
      document.documentElement.clientHeight || document.body.clientHeight;
    var width =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 639) {
      this.phone = true;
    } else {
      this.phone = false;
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      //监听浏览器窗口大小改变
      this.height =
        document.documentElement.clientHeight || document.body.clientHeight;
      var width =
        document.documentElement.clientWidth || document.body.clientWidth;
      if (width < 639) {
        this.phone = true;
      } else {
        this.phone = false;
      }
    });
    setTimeout(() => {
      this.nav = true;
    }, 4000);
    window.addEventListener("scroll", this.handleScroll);
  },
  destory() {
    clearInterval(this.Interval);
  },
  methods: {
    handleScroll() {
      let pageforest = this.$refs.pageforest.offsetTop;
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.body.clientHeight;
      if (pageforest + 2 * height - scrollTop < height) {
        this.forest = true;
      }
    },
    numberGrow(ele) {
      let _this = this;
      let step = 1;
      let current = 0;
      let start = 10;
      let t = setInterval(function () {
        start += step;
        if (start > _this.value) {
          clearInterval(t);
          start = _this.value;
          t = null;
        }
        if (current === start) {
          return;
        }
        current = start;
        ele.innerHTML = current.toFixed(2);
      }, 30);
    },
    handleScrollpagenav(e) {
      if (e.deltaY >= 0) {
        this.line = true;
        document
          .getElementById("pageclone")
          .scrollIntoView({ block: "start", behavior: "smooth" });
        this.clone = true;
        setTimeout(() => {
          this.nav = false;
        }, 1000);
        this.numberGrow(this.$refs.numberGrow);
      } else {
        this.clone = false;
        this.logo = false;
      }
    },
    handleScrollpageclone(e) {
      if (e.deltaY >= 0) {
        document
          .getElementById("contentbox")
          .scrollIntoView({ block: "start", behavior: "smooth" });
        this.works = true;
      } else {
        setTimeout(() => {
          this.clone = false;
        }, 500);
        this.nav = true;
        document
          .getElementById("pagenav")
          .scrollIntoView({ block: "start", behavior: "smooth" });
      }
    },
    handleScrollpageworks(e) {
      if (e.deltaY >= 0) {
      } else {
        this.clone = true;
        document
          .getElementById("pageclone")
          .scrollIntoView({ block: "start", behavior: "smooth" });
      }
    },
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
      this.$router.push("/carbonemission/" + param);
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
  },
};
</script>
<style scoped lang="scss">
.home {
  position: relative;
  width: 100%;
  // height: auto;
  overflow-x: hidden;
  // overflow-y: scroll;
  .contentbg {
    position: relative;
    .pageworks {
      position: fixed;
      top: 0;
      z-index: -1;
    }
    .works {
      position: relative;
      top: 0;
      z-index: 10;
      background-color: rgba($color: #000000, $alpha: 0);
      color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 1145px;
      font-weight: bold;
      font-size: 84px;
      line-height: 92px;
      color: #fff;
      margin: 0 auto;
      text-align: center;
    }
  }
  .pagenav {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 100;
    text-align: center;
    overflow: hidden;
    .logo {
      position: absolute;
      background-color: #0a423c;
      z-index: 2000;
      animation-name: fadeLogo;
      -webkit-animation-name: fadeLogo;
      animation-duration: 1.5s;
      -webkit-animation-duration: 1.5s;
      animation-fill-mode: forwards;
      -webkit-animation-fill-mode: forwards;
      animation-iteration-count: both;
      -webkit-animation-iteration-count: both;
      @keyframes fadeLogo {
        0% {
          z-index: 2000;
          transform: none;
          -webkit-transform: none;
        }
        66% {
          z-index: 2000;
          transform: none;
          -webkit-transform: none;
        }
        100% {
          z-index: 0;
          transform: translate3d(0, 100%, 0);
          -webkit-transform: translate3d(0, 100%, 0);
        }
      }
      .box {
        width: 298px;
        height: 106px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .logoanimated1 {
          -webkit-animation-duration: 0.5s;
          animation-duration: 0.5s;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
        }
        .logoanimated2 {
          -webkit-animation-duration: 1s;
          animation-duration: 1s;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
        }
        .img1 {
          height: 100px;
          width: 81px;
          animation-name: fadeRightIn;
          -webkit-animation-name: fadeRightIn;
        }
        .img2 {
          height: 100px;
          width: 200px;
          margin-left: 100px;
          animation-name: fadeLeftIn;
          -webkit-animation-name: fadeLeftIn;
        }
        @keyframes fadeLeftIn {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes fadeRightIn {
          0% {
            transform: translate3d(100%, 0, 0);
          }
          100% {
            transform: none;
          }
        }
      }
    }
    .animated {
      animation-name: fadeInOutLine;
      -webkit-animation-name: fadeInOutLine;
      animation-duration: 2s;
      -webkit-animation-duration: 2s;
      animation-iteration-count: infinite;
      -webkit-animation-iteration-count: infinite;
    }
    @keyframes fadeInOutLine {
      0% {
        transform: translate3d(0, 0, 0);
        -webkit-transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(0, 200%, 0);
        -webkit-transform: translate3d(0, 200%, 0);
      }
    }
    // @keyframes fadeInOut {
    //   0% {
    //     opacity: 1;
    //   }
    //   100% {
    //     opacity: 0;
    //   }
    // }
    // .anim_fade_image {
    //   position: absolute;
    //   animation-name: fadeInOut;
    //   -webkit-animation-name: fadeInOut;
    //   animation-timing-function: ease-in-out;
    //   -webkit-animation-timing-function: ease-in-out; //ease-in-out 动画以低速开始和结束。
    //   animation-duration: 4s;
    //   -webkit-animation-duration: 4s;
    //   animation-fill-mode: both;
    //   -webkit-animation-fill-mode: both;
    // }
    .title {
      position: relative;
      z-index: 100;
      // top: 50%;
      // transform: translateY(-100%);
      max-width: 1464px;
      padding: 0 40px 0;
      text-align: left;
      margin: 0 auto;
      margin-top: 310px;
      font-weight: bold;
      font-size: 84px;
      line-height: 100px;
      color: #ffffff;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .nav {
      height: 80px;
      width: 100%;
      position: absolute;
      top: 0;
      z-index: 1000;
    }
  }
  .pageclone {
    background-color: #0a423c;
    position: relative;
    overflow: hidden;
    width: 100%;
    .imgbox {
      position: absolute;
      right: 0;
      z-index: 2;
      height: 100%;
    }
    .animated {
      animation-name: fadeClone;
      -webkit-animation-name: fadeClone;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    .phoneanimated {
      animation-name: fadeClonePhone;
      -webkit-animation-name: fadeClonePhone;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    img {
      float: right;
    }
    @keyframes fadeClone {
      0% {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
        -webkit-transform: translate3d(0, 100%, 0);
      }
      100% {
        opacity: 1;
        transform: none;
        -webkit-transform: none;
      }
    }
    @keyframes fadeClonePhone {
      0% {
        opacity: 0;
        transform: translate3d(0, 320%, 0);
        -webkit-transform: translate3d(0, 320%, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 160%, 0);
        -webkit-transform: translate3d(0, 160%, 0);
      }
    }
    .number-grow-warp {
      position: relative;
      margin: 0 auto;
      max-width: 1464px;
      padding: 0 40px 0;
      margin-top: 280px;
      div {
        color: #ffffff;
        font-size: 32px;
      }
      div:nth-child(1) {
        margin-bottom: 52px;
      }
      .number-grow {
        display: inline-block;
        margin-right: 30px;
      }
      div:nth-child(2),
      div:nth-child(3) {
        font-weight: bold;
        font-size: 130px;
        line-height: 140px;
      }
      div:nth-child(4) {
        margin-top: 52px;
      }
    }
  }

  .pagewords {
    color: #000000;
    width: 100%;
    height: 100%;
    word-wrap: break-word;
    background-color: #fff;
    div {
      max-width: 800px;
      margin: 0 auto;
    }
    div:first-child {
      font-weight: bold;
      font-size: 32px;
      line-height: 48px;
      padding-top: 112px;
      padding-bottom: 64px;
    }
    div:last-child {
      font-size: 18px;
      line-height: 40px;
      padding-bottom: 120px;
    }
  }
  .pageforest {
    position: relative;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .forest {
      position: absolute;
      animation-name: fadeForest;
      -webkit-animation-name: fadeForest;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    @keyframes fadeForest {
      0% {
        transform: translate3d(0, 50%, 0);
        -webkit-transform: translate3d(0, 50%, 0);
      }
      100% {
        transform: none;
        -webkit-transform: none;
      }
    }
    div {
      max-width: 1464px;
      padding: 0 40px 0;
      text-align: center;
      color: #ffffff;
      span {
        display: block;
        max-width: 1017px;
        height: 100%;
        margin: 0 auto;
        word-wrap: break-word;
      }
      span:first-child {
        font-size: 18px;
        line-height: 16px;
      }
      span:last-child {
        font-weight: bold;
        font-size: 46px;
        line-height: 54px;
        margin-top: 33px;
      }
    }
  }
  video {
    object-fit: fill;
  }
  a {
    text-decoration: none; //去掉下划线
    color: inherit;
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
    div:last-child {
      height: 64px;
      width: 1px;
      background-color: #fff;
      margin-top: 3px;
    }
  }
  .page2 {
    padding: 0 9.9%;
    padding-top: 76px;
    padding-bottom: 108px;
    color: #000000;
  }
  .line {
    display: block;
    width: 100%;
    height: 1px;
    background-color: #e6e6e6;
  }
  .page3 {
    background-color: #fff;
    padding: 0 9.9%;
  }
  .page4 {
    background-color: #fff;

    padding: 0 9.9%;
    background: #f9f9f9;
  }
  .page6 {
    background-color: #fff;
    box-sizing: border-box;
    margin: 0 auto;
    width: 100%;
    padding: 0 9.9%;
    padding-bottom: 120px;
    background: #ffffff;
    height: 100%;
  }
  .page7 {
    width: 100%;
    background: #ffffff;
  }
  .page8 {
    width: 100%;
    background: #f9f9f9;
  }
  .future {
    background-color: #fff;
    width: 100%;
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
@media screen and (max-width: 1920px) {
  .home {
    .pagenav {
      .title {
        font-size: 64px;
        line-height: 72px;
        margin-top: 200px;
      }
    }

    .pageclone {
      .number-grow-warp {
        margin-top: 140px;
        font-size: 80px;
        line-height: 80px;
        div:nth-child(1) {
          margin-bottom: 42px;
        }
        div:nth-child(2),
        div:nth-child(3) {
          font-weight: bold;
          font-size: 100px;
          line-height: 110px;
        }
        div:nth-child(4) {
          margin-top: 42px;
        }
      }
    }
    // .contentbg .pageworks {
    //   // border: 1px solid green;
    // }
    .contentbg .works {
      // padding: 0 20px;
      font-size: 64px;
      line-height: 64px;
    }
    .pageworks div {
      font-size: 67.2px;
      line-height: 73.6px;
    }
    .pagewords {
      // padding: 0 20px;
    }
    .page3 {
      padding: 0;
    }
    .page6 {
      padding: 0;
    }
  }
}
@media screen and (max-width: 1440px) {
  .home {
    .pagenav {
      .title {
        font-size: 64px;
        line-height: 72px;
        margin-top: 170px;
      }
    }
    .works {
      p {
        font-size: 44px;
        line-height: 52px;
      }
    }
    .pageclone {
      .number-grow-warp {
        margin-top: 80px;
        font-size: 80px;
        line-height: 80px;
        div:nth-child(1) {
          margin-bottom: 42px;
        }
        div:nth-child(2),
        div:nth-child(3) {
          font-weight: bold;
          font-size: 100px;
          line-height: 110px;
        }
        div:nth-child(4) {
          margin-top: 42px;
        }
      }
    }
    .contentbg .works {
      padding: 0 20px;
      font-size: 64px;
      line-height: 64px;
    }
    .pageworks div {
      font-size: 67.2px;
      line-height: 73.6px;
    }
    .pagewords {
      padding: 0 20px;
      div:last-child {
        padding-bottom: 88px;
      }
    }
    .page3 {
      padding: 0;
    }
    .page6 {
      padding: 0;
    }
  }
}
@media screen and (max-width: 639px) {
  .home {
    .pagenav {
      .title {
        font-size: 42px;
        line-height: 48px;
        margin-top: 140px;
        padding: 20px;
      }
    }
    .works {
      p {
        font-size: 38px;
        line-height: 42px;
      }
    }
    .line {
      height: 0.5px;
    }
    .pageclone {
      .number-grow-warp {
        margin-top: 150px;
        div {
          font-size: 20px;
          line-height: 20px;
          white-space: wrap !important;
        }
        .number-grow {
          margin-right: 15px;
        }
        div:nth-child(1) {
          margin-bottom: 32px;
        }
        div:nth-child(2),
        div:nth-child(3) {
          white-space: none;
          font-weight: bold;
          font-size: 48px;
          // border: 1px solid red;
          line-height: 48px;
        }
        div:nth-child(4) {
          margin-top: 32px;
        }
      }
    }
    .contentbg .works {
      font-size: 32px;
      line-height: 48px;
    }
    .pageforest {
      position: relative;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        padding: 0 20px;
        span {
          width: 100%;
          height: 100%;
        }
        span:first-child {
          font-size: 16px;
          line-height: 14px;
        }
        span:last-child {
          font-size: 24px;
          line-height: 28px;
          margin-top: 16px;
        }
      }
    }
    .pagewords {
      div:first-child {
        font-size: 28px;
        line-height: 40px;
        padding-top: 80px;
        padding-bottom: 48px;
      }
      div:last-child {
        font-size: 16px;
        line-height: 28px;
        padding-bottom: 56px;
      }
    }
  }
}
@media screen and (max-width: 375px) {
  // .home {
  //   .pageclone {
  //     .number-grow-warp {
  //       margin-top: 80px;
  //       font-size: 18px;
  //       line-height: 18px;
  //       div:nth-child(1) {
  //         margin-bottom: 22px;
  //       }
  //       div:nth-child(2),
  //       div:nth-child(3) {
  //         font-weight: bold;
  //         font-size: 44px;
  //         line-height: 44px;
  //       }
  //       div:nth-child(4) {
  //         margin-top: 22px;
  //       }
  //     }
  //   }
  // }
  .pagenav {
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
