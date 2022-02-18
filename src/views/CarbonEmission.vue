<template>
  <div class="emission" :style="{ position: pos }">
    <div class="emissionheader">
      <header-new
        @tohome="tohome"
        @tomenu="tomenu"
        :sign="false"
        :tab="tab"
        :menu="menu"
      />
    </div>
    <div  class="datadashboard">
      <div class="title">
        <span>{{title}}</span>
        <span>{{time}} </span>
      </div>
      <div class="word">
        <span>{{words}}</span>
        <span v-show="tips">Explore data based on your interest in our interactable Power BI reports</span>
        <a target="_blank" href="https://github.com/microsoft/Carbon-Insight/tree/main/powerbi" @mouseover="tips = !tips" @mouseleave="tips = !tips">Download Power BI Reports<img src="../assets/icon_go.svg" alt="" /></a>
      </div>
    </div>
    <div class="powerbi_gif">
      <!-- <img :src="gifurl" alt="" /> -->
      <video
        class="video-js vjs-default-skin vjs-big-play-centered img"
        id="myVideo"
        controls:false
        autoplay
        muted
        loop="loop"
      >
        <source :src="gifurl" type="video/mp4" />
      </video>
    </div>
    <div class="bigTitle">Carbon emission featured data </div>
    <viewer :images="images">
      <div class="imgbox">
        <div v-for="src in imagesDetails" :key="src.url">
          <div class="tips" v-html="src.title"></div>
          <div class="img">
            <img :src="src.url" :alt="src.url | toSrc" />
          </div>
        </div>
        <div class="temp"></div>
      </div>
    </viewer>
    <div class="bottom">
      <footer-new
        @toemission="toemission"
        @tosink="tosink"
        @toaboutus="toaboutus"
        :bgc="bgc"
      />
    </div>
  </div>
</template>
<script>
import tabimg1 from "@/assets/tab1.png";
import HeaderNew from "@/components/HeaderNew.vue";
import FooterNew from "@/components/FooterNew.vue";

import emission1 from "@/assets/Emission-updated.mp4";
import emission2 from "@/assets/COVID.mp4";
import emission3 from "@/assets/GDP.mp4";
import tab1_1 from "@/assets/EmissionMap_World_Oct31_2021.jpg";
import tab1_2 from "@/assets/EmissionMap_US_Oct31_2021.jpg";
import tab1_3 from "@/assets/EmissionMap_China_2019-2021.jpg";
import tab1_4 from "@/assets/EmissionMap_US_2019-2021.jpg";
import tab1_5 from "@/assets/Top 10 Emission_AmericanCountries_Oct2021.png";
import tab1_6 from "@/assets/Top 10 Emission_AsianCountries_Oct2021.png";
import tab1_7 from "@/assets/Top 10 Emission_EuropeanCountries_Oct2021.png";
import tab1_8 from "@/assets/Top 10 Emission_USStates_Oct2021.png";
import tab1_9 from "@/assets/EmissionCharts_China_2019-2021.jpg";
import tab1_10 from "@/assets/EmissionCharts_US_2019-2021.jpg";
import tab1_11 from "@/assets/EmissionChart_World_2019-2021.jpg";

import tab2_1 from "@/assets/COVID_Emission_China.jpg";
import tab2_2 from "@/assets/COVID_Emission_US.jpg";
import tab2_3 from "@/assets/StringencyIndex_Emission_China.jpg";
import tab2_4 from "@/assets/StringencyIndex_Emission_US.png";
import tab3_1 from "@/assets/PerCapitaGDP_Emission_China.jpg";
import tab3_2 from "@/assets/PerCapitaGDP_Emission_US.jpg";
import tab3_3 from "@/assets/GDP_CarbonIntensity_World.jpg";

export default {
  name: "CarbonEmission",
  components: {
    FooterNew,
    HeaderNew,
  },
  data() {
    return {
      emission1,
      emission2,
      emission3,
      imagesTab1: [
        { url: tab1_1, title: "Global Daily Carbon Emissions (Updated to Oct 31, 2021)"},
        { url: tab1_2, title: "Daily carbon emissions in the US (Updated to Oct 31, 2021) " },
        { url: tab1_3, title: "Carbon emissions by sectors in China overtime" },
        { url: tab1_4, title: "Carbon emissions by sectors in the US overtime" },
        { url: tab1_5, title: "10 countries/regions with the highest carbon emissions in Europe in October 2021 (Russia, Poland, Germany, Netherlands, the UK, Italy, France, Spain, Belgium, Czechia)"},
        { url: tab1_6, title: "10 countries/regions with the highest carbon emissions in Americas in October 2021 (the US, Canada, Brazil, Mexico, Argentina, Chile, Venezuela, Columbia, Peru, Ecuador)"},
        { url: tab1_7, title: "10 countries/regions with the highest carbon emissions in Europe in October 2021 (Russia, Poland, Germany, Netherlands, the UK, Italy, France, Spain, Belgium, Czechia)" },
        { url: tab1_8, title: "10 states with the highest carbon emissions in the US in October 2021  (Texas, California, Florida, Pennsylvania, Louisiana, Ohio, Indiana, Illinois, Missouri, Michigan)"},
        { url: tab1_9, title: "Top left: Carbon emissions in China overtime; Top right: Sector breakdown of emissions in China overtime; Lower left: Monthly variations in carbon emissions from different sectors in China"},
        { url: tab1_10, title: "Top left: Carbon emissions in the US overtime; Top right: Sector breakdown of emissions in the US overtime; Lower left: Monthly variations in carbon emissions from different sectors in the US" },
        { url: tab1_11, title: "Variations of carbon emissions across different countries/regions since January 2019" },
      
      ],
      imagesTab2: [
        { url: tab2_1, title: "Variations in carbon emissions and confirmed COVID-19 cases in China "},
        { url: tab2_2, title: "Variations in carbon emissions and confirmed COVID-19 cases in the US " },
        { url: tab2_3, title: "Variations in carbon emissions and stringency index* in China <br/>*Stringency index is a number from 0 to 100 that reflects how strict a country’s measures were, including lockdown, school closures, travel bans, etc. A higher score indicates a stricter response (i.e. 100 = strictest response) "},
        { url: tab2_4, title: "Variations in carbon emissions and stringency index* in the US <br/>*Stringency index is a number from 0 to 100 that reflects how strict a country’s measures were, including lockdown, school closures, travel bans, etc. A higher score indicates a stricter response (i.e. 100 = strictest response) "},
      ],
      imagesTab3:[
        { url: tab3_1, title: "Changes in CO2 per capita (tons) and GDP per capita (USD) in China" },
        { url: tab3_2, title: "Changes in CO2 per capita (tons) and GDP per capita (USD) in the US "},
        { url: tab3_3, title: "Changes in carbon intensity* and emissions from the previous year across different countries overtime <br/>*Carbon intensity is the measure of CO2 produced per US dollar GDP. A rapidly decreasing carbon intensity is beneficial for the environment and economy"},
      ],
      images: [
        tab1_1,
        tab1_2,
        tab1_3,
        tab1_4,
        tab1_5,
        tab1_6,
        tab1_7,
        tab1_8,
        tab1_9,
        tab1_10,
        tab1_11,
      ],
      imagesDetails:[],
      gifurl: emission1,
      bgc: "background:#F9F9F9;",
      pos: "relative",
      flag: false,
      word: false,
      selectName: "Carbon Emission",
      selectflag: false,
      selectBtn: 1,
      selectChart: 1,
      selectImg: tabimg1,
      report: "1",
      menu: false,
      tab: "emission1",
      title: "Carbon Emission Data Dashboard",
      time: "DATA AS OF 10/31/2021",
      words:"Carbon Insight tracks anthropogenic CO2 emissions with a near-global coverage. In this section, you can browse the near-live carbon emissions of 206 countries and their historical emissions since January 2019. For the United States, state-level emissions are also available.",
      tips:false
    };
  },
  created() {
    this.changechart(this.$route.params.tab)
    this.height =
      document.documentElement.clientHeight || document.body.clientHeight;
    var width =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 639) {
      this.word = true;
    } else {
      this.word = false;
    }
    this.imagesDetails = this.imagesTab1;
  },
  filters: {
    toSrc(e) {
      let src = e.toString().split("/")[2];
      return src.substring(0, src.length - 13) + ".png";
    },
  },
  mounted() {
    this.settab(this.$route.params.tab)
    document.addEventListener("click", (e) => {
      this.flag = false;
      if (e.path[1].id == "tab") {
      } else {
        this.selectflag = false;
      }
    });
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        //监听浏览器窗口大小改变
        this.height =
          document.documentElement.clientHeight || document.body.clientHeight;
        var width =
          document.documentElement.clientWidth || document.body.clientWidth;
        if (width < 639) {
          this.word = true;
        } else {
          this.word = false;
        }
      });
    });
  },
  watch: {
    $route(to, from){
      if(to.params.tab != from.params.tab){
        this.settab(to.params.tab)
        if(to.params.tab){
          this.setInfor(to.params.tab)
          this.changechart(to.params.tab)
          this.playVideo(this["emission" + to.params.tab])
        }
      }
    },
    menu: {
      handler(newval, oldVal) {
        if (newval == true) {
          this.pos = "fixed";
        } else {
          this.pos = "relative";
        }
      },
      immediate: true,
    },
  },
  methods: {
    toflag() {
      this.flag = true;
    },
    settab(params){
      if(params){
        this.tab = 'emission' + params
      }
    },
    tomenu(param) {
      this.menu = param;
    },
    setInfor(params){
      if(params === '1'){
        this.title= "Carbon Emission Data Dashboard"
        this.time = "DATA AS OF 10/31/2021"
        this.words = "Carbon Insight tracks anthropogenic CO2 emissions with a near-global coverage. In this section, you can browse the near-live carbon emissions of 206 countries and their historical emissions since January 2019. For the United States, state-level emissions are also available."
      }else if(params === '2'){
        this.title= "Carbon Emission & COVID Data Dashboard"
        this.time = "DATA AS OF 10/31/2021"
        this.words = "This section lets you observe how carbon emissions in different countries change with the trends of the COVID-19 pandemic. The severity of the epidemic is shown in two aspects: the number of new diagnoses and the stringency and policy indices of governments."
      }else{
        this.title= "Carbon Emission & Economy Data Dashboard"
        this.time = "DATA AS OF 2019"
        this.words = "This section lets you compare the carbon intensity and the per capita emissions of different countries. You can observe how per capita emissions change over time in different countries and observe which countries have reduced their carbon intensity over time."
      }
    },
    playVideo(url){
      let vdo = document.getElementById("myVideo")
      vdo.src='';
      vdo.src=url;
      vdo.play();
    },
    changechart(param) {
      // this.gifurl = this["emission" + item.key];
      this.selectChart = param;
      this.report = param;
      if (param === "1") {
        this.images = [
          tab1_1,
          tab1_2,
          tab1_3,
          tab1_4,
          tab1_5,
          tab1_6,
          tab1_7,
          tab1_8,
          tab1_9,
          tab1_10,
          tab1_11,
        ];
        this.imagesDetails = this.imagesTab1
      } else if (param === "2") {
        this.images = [tab2_1, tab2_2, tab2_3, tab2_4];
        this.imagesDetails = this.imagesTab2
      } else {
        this.images = [tab3_1, tab3_2, tab3_3];
        this.imagesDetails = this.imagesTab3
      }
    },
    getMenu() {
      console.log("ok");
      this.selectflag = true;
    },
    downloadfun(key) {
      console.log(key, "2");
    },
    toemission(param) {
      
      this.$router.push("/carbonemission/"+ param);
    },
    tohome() {
      this.$router.push("/carbonhome");
    },
    tosink() {
      this.$router.push("/carbonsink");
    },
    tomenu(param) {
      this.menu = param;
    },
    toaboutus() {
      this.$router.push("/aboutus");
    },
  },
};
</script>
<style lang='scss' scoped>
.emissionheader {
  height: 100%;
  height: 100%;
  // border-bottom: 1px solid #3d342f;
}
#itemshield {
  position: relative;
  float: right;
  width: 34px;
  height: 750px;
  background: #eaeaea;
  font-family: Segoe UI;
}
.panel {
  position: relative;
  height: 0;
  overflow: hidden;
}

.panelcontainer {
  padding-bottom: 56.25%;
}

.panel iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
}
.emission {
  width: 100%;
  height: 100%;
  .datadashboard {
    margin: 0 auto;
    max-width: 1464px;
    padding: 0 40px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // border: 1px solid red;
    .title {
      margin-top: 102px;
      span{
        display: block;
      }
      span:first-child {
        // width: 447.4px;
        width: 550.4px;
        font-weight: bold;
        font-size: 44px;
        line-height: 48px;
        color: #000000;
        word-wrap: break-word;
      }
      span:last-child {
        font-size: 16px;
        line-height: 24px;
        color: #666666;
        margin-top: 22.19px;
        font-size: 16px;
      }
    }
    .word {
      margin-top: 102px;
      position: relative;
      span{
        display: block;
      }
      span:nth-child(1){
        max-width: 674px;
        font-size: 18px;
        line-height: 27px;
        display: flex;
        align-items: center;
        text-align: justify;
        color: #0B0B0B;
      }
      span:nth-child(2){
        position: absolute;
        bottom: 27px;
        left: 0;
        // margin-top: 20px;
        height: 24px;
        box-sizing: border-box;
        background: #FFFFFF;
        border: 1px solid #F2F2F2;
        box-sizing: border-box;
        border-radius: 60px;
        font-size: 12px;
        line-height: 22px;
        color: #6F6F6F;
        padding: 0 8px;
      } 
      a{
        font-weight: bold;
        font-size: 16px;
        line-height: 27px;
        display: flex;
        align-items: center;
        text-align: justify;
        color: #137759;
        margin-top: 44px;
        cursor:pointer;
        img{
          margin-left: 8px;
        }
      }
      a:hover{
        text-decoration-line: underline;
        color: #137759;
      }
    }
  }
  .charts {
    margin: 19px auto 72px;
    height: 810px;
    max-width: 1464px;
    padding: 0 40px;
    background-color: #fff;
    text-align: center;
    .powerbi {
      width: 100%;
      margin: 0 auto;
      .powerbi-container {
        height: 810px;
        width: 100%;
      }
    }
  }
  .powerbi_gif {
    margin: 73px auto 64px;
    // height: 810px;
    max-width: 1464px;
    padding: 0 40px;
    background-color: #fff;
    text-align: center;
    height: auto;
    img {
      width: 100%;
    }
    #myVideo{
      width: 100%;
      height: 100%;
    }
  }
  .bigTitle{
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    text-transform: capitalize;
    color: #000000;
    margin: 64px auto 33px;
    max-width: 1464px;
    padding: 0 40px;
  }
  .imgbox {
    margin: 0 auto;
    max-width: 1464px;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    // align-items: start;
    flex-wrap: wrap;
    color: #000000;
    margin-bottom: -40px;
    > div  {
      margin-bottom: 40px;
      max-width: 672px;
      // max-width: 632px;
      // max-width: 672px;
      // height: 522px;
      padding: 20px;
      border: 1px solid #F2F2F2;
      >div:first-child{
        width: 100%;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
        color: #000000;
        margin-bottom: 24px;
      }
      >div:last-child{
        max-width: 632px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: auto;
          overflow: hidden;
        }
      }
    }
    
    .title{
      font-weight: bold;
      font-size: 20px;
      line-height: 27px;
      max-width: 314px;
      margin-top: 24px;
    }
    .temp {
      width: 322px;
      height: 210px;
      height: 0;
      margin-bottom: 0;
      border: none;
      padding: 0;
    }
   
  }

  @media screen and (max-width: 639px) {
    .imgbox,
    .datadashboard,
    .powerbi_gif {
      padding: 0 24px;
    }
    .datadashboard {
      padding: 40px 24px 0;
      .word {
        margin-top: 25px;
        a{
          margin-top: 32px;
        }
      }
      .title {
        margin-top: 15px;
        width: 100%;
        span:first-child{
          word-break: break-word;
          width:100%;
        }
        span:last-child {
          margin-top: 6px;
          line-height: 21px;
        }
      }
      .morebtn {
        display: none;
      }
    }
    .powerbi_gif {
      margin: 40px auto 48px;
    }
    .charts {
      height: 272px;
      .powerbi .powerbi-container {
        height: 272px;
      }
    }
  }
  @media screen and (max-width: 1240px) {
    .datadashboard{
      .word{
        margin-top: 64px;

      }
    }
  }

  @media screen and (min-width: 1280px) and (max-width: 1440px) {
    .imgbox >div{
      width: calc((100vw - 276px)/8*4 + 78px);
      margin-bottom: 28px;
    }
  }
  @media screen and (min-width: 730px) and (max-width: 1280px) {
    .imgbox >div{
      // width: calc((100vw - 276px)/8*4 + 84px);
      width: calc((100vw - 276px)/8*4 + 78px);
      margin-bottom: 28px;
    }
  }
}
.bottom {
  width: 100%;
  background: #f9f9f9;
}
/deep/ .powerbi_gif .video-js{
  background-color:#fff;
}
</style>