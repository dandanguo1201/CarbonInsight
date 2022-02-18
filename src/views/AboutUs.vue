<template>
  <div class="aboutus" :style="{ position: pos }">
    <div class="usheader">
      <header-new
        @tohome="tohome"
        @tomenu="tomenu"
        :sign="false"
        :tab="tab"
        :menu="menu"
      />
    </div>
    <div class="uscontent">
      <div class="ustitle">
         <div>About us</div>
         <div>Carbon Insight is a visualized data platform of global carbon flux and provides the world’s first dataset of near-live daily anthropogenic CO2 emissions. Our mission is to visualize the world's most updated carbon emission and sink data and bring insights of carbon and the society. We strive to accelerate climate studies and global climate actions with computational innovations.</div>
         <div>Organizations:&nbsp;&nbsp;Microsoft&nbsp;&nbsp;&nbsp;Tsinghua University           </div>
      </div>
      <div class="micteams">
        <div>Microsoft Team</div>
        <div class="photobox">
           <div v-for="(item,index) in microsoftList" :key="index">
              <img :src="item.img" alt="">
              <div>
                <span>{{item.name}}</span>
                <span>{{item.post}}</span>
              </div>
            </div>
        </div>
      </div>
      <div class="Tsinghuateams">
        <div>Tsinghua Team</div>
        <div class="photobox">
           <div v-for="(item,index) in tsqinghuaList" :key="index">
              <img :src="item.img" alt="">
              <span v-html="item.name"></span>
              <!-- <div :class="item.flag?'text-box visibleintro':'text-box hiddenintro'"> -->
              <div v-if="item.flag" class="text-box visibleintro">
                <div v-html="item.intro"></div>
              </div>
              <div v-else class="text-box hiddenintro">
                <div v-html="item.intro.slice(0, 150)"></div>
              </div>
              <div class="morebtn" @click="item.flag = !item.flag">
                <button>{{item.flag?'show less':'Learn more'}}</button>
              </div>
          </div>
        </div>
      </div>
      <div class="usline"></div>
      <div class="usthanks">
        <span>Special Thanks:</span>
        <span><a target="_blank" href="https://www.carbonmonitor.org.cn/">Carbon Monitor</a></span>
      </div>
    </div>
    <div class="bottom">
      <footer-new @toemission="toemission" @tosink="tosink" @toaboutus="toaboutus"  />
    </div>
  </div>
</template>
<script>
import HeaderNew from "@/components/HeaderNew.vue";
import FooterNew from "@/components/FooterNew.vue";

export default {
  name: 'AboutUs',
  components: {
    FooterNew,
    HeaderNew,
  },
  data() {
    return {
      pos: "relative",
      menu: false,
      flag:false,
      microsoftList:[
        {img:require('../assets/headportrait/Dandan GUO.png'),name:"Dandan GUO", post:"— Front-end Power BI"},
        {img:require('../assets/headportrait/Scarlett LI.png'),name:"Scarlett LI", post:"— Product Manager"},
        {img:require('../assets/headportrait/Tieyan LIU.png'),name:"Tieyan LIU", post:"— Assistant Managing Director"},
        {img:require('../assets/headportrait/Lina LU.png'),name:"Lina LU", post:"— UX"},
        {img:require('../assets/headportrait/Yulan LU.png'),name:"Yulan LU", post:"— Product Manager"},
        {img:require('../assets/headportrait/Xin MA.png'),name:"Xin MA", post:"— Outreach Director"},
        {img:require('../assets/headportrait/Yang OU.png'),name:"Yang OU", post:"— UX"},
        {img:require('../assets/headportrait/Naifei PAN.png'),name:"Naifei PAN", post:"— Product Manager"},
        {img:require('../assets/headportrait/Tim PAN.png'),name:"Tim PAN", post:"— Senior Director of Outreach"},
        {img:require('../assets/headportrait/Luna QIU.png'),name:"Luna QIU", post:"— Product Manager"},
        {img:require('../assets/headportrait/Beibei SHI.png'),name:"Beibei SHI", post:"— Outreach"},
        {img:require('../assets/headportrait/Jonathon TIEN.png'),name:"Jonathon TIEN", post:"— Senior Director of Engineering"},
        {img:require('../assets/headportrait/Tong WU.png'),name:"Tong WU", post:"— Data pipeline and backend"},
        {img:require('../assets/headportrait/Yuqing YANG.png'),name:"Yuqing YANG", post:"— Development Manager"},
        {img:require('../assets/headportrait/Chengruidong ZHANG.png'),name:"Chengruidong ZHANG", post:"— Data pipeline and backend"},
        {img:require('../assets/headportrait/Haiyan ZHU.png'),name:"Haiyan ZHU", post:"— Front-end Power BI"},
      ],
      tsqinghuaList:[
        {img:require('../assets/headportrait/Zhu DENG.png'),name:"<a target='_blank' href='mailto:dengz16@mails.tsinghua.edu.cn'>Zhu DENG</a> ", intro:"<p>Zhu DENG is a Ph.D. student in the Department of Earth System Science, Tsinghua University. He received his bachelor’s degree in Sun Yat-sen University. His research interests include carbon emission accounting, carbon neutrality, and data science. Currently, as a core member of the Carbon Monitor ( <a target='blank' href='https://carbonmonitor.org/'>https://carbonmonitor.org/</a> ), he is working on developing high-resolution carbon emission inventories. He is the main contributor to the carbon emission data in this project.</p>",flag:false},
        {img:require('../assets/headportrait/Xiang DING.png'),name:"<a target='_blank' href='mailto:1900013356@pku.edu.cn'>Xiang DING</a> ", intro:"<p>Xiang Ding is an undergraduate student in Peking University. She has contributed to the cement carbon sink project.</p>",flag:false},
        {img:require('../assets/headportrait/Xinyu DOU.png'),name:"<a target='_blank' href='mailto:douxy19@mails.tsinghua.edu.cn'>Xinyu DOU</a>", intro:"<p>Xinyu DOU is a Ph.D. student in the Department of Earth System Science, Tsinghua University, under the supervision of Prof. Zhu Liu. She received her B.S. degree from East China Normal University. She is particularly interested in high-resolution carbon emission data. Her work is now focusing on the near-real-time gridded carbon emission accounting with high-resolution based on multi-source big data and machine learning model. She is one of the main contributors to the carbon emission data in this project. </p>",flag:false},
        {img:require('../assets/headportrait/Yuanhao GENG.png'),name:"<a target='_blank' href='mailto:geng29@wisc.edu'>Yuanhao GENG</a>", intro:"<p>Yuanhao GENG received his bachelor's degree in Statistics at East China Normal University. He is a MS student in Statistics at the University of Wisconsin Madison. In the Negative Carbon Computing project, he is responsible for estimating the regional land carbon sink with the building cement volume data and using spatial and temporal graph network methods to conduct the estimation and forecast for the ocean carbon sink. </p>",flag:false},
        {img:require('../assets/headportrait/Rui GUO.png'),name:"<a target='_blank' href='mailto:grsm12@mail.tsinghua.edu.cn'>Rui GUO</a>", intro:"<p>Rui GUO obtained his PhD in Earth Sciences from University of Cambridge, having worked on nuclear materials and environmental impact assessment. As a Shuimu Scholar at Tsinghua University, he continued working at the interface between materials and climate science, focusing on artificial carbon sink. Together with Biqing ZHU, he established the early framework of the Negative Carbon Computing project and has been coordinating the research activities related to cement carbon sink and CCUS. </p>",flag:false},
        {img:require('../assets/headportrait/Yifan HU.png'),name:"<a target='_blank' href='mailto:hyf20210305@163.com'>Yifan HU</a>", intro:"<p>Yifan HU is a first-year postgraduate student in the Forest resource management Programme at the Northeast Forestry University. She received her bachelor’s degree of Geography Information Science from the Northeast Forestry University. Her research interests include the estimation of above-ground forest biomass with SAR (Synthetic Aperture Radar) data and carbon emissions inventory. She contributed to the calculation and the visualization of carbon emissions data in this project. </p>",flag:false},
        {img:require('../assets/headportrait/Piyu KE.png'),name:"<a target='_blank' href='mailto:zhuliu@tsinghua.edu.cn'>Piyu KE</a>", intro:"<p>Piyu KE is a PhD student in the Department of Earth System Science, Tsinghua University, working with Prof. Liu to explore China’s Carbon Budget and global negative carbon computing.</p><p>Before joining Tsinghua University, Piyu KE obtained his BSc degree in Applied Meteorology in Sun Yat-sen University, where he engaged in global soil respiration research based on Random Forest. His research interests include carbon budget and negative carbon emissions. In this project, he is in charge of the Negative Carbon Computing model development and he organizes the routine model updates. </p>",flag:false},
        {img:require('../assets/headportrait/Zhu LIU.png'),name:"<a target='_blank' href='mailto:zhuliu@tsinghua.edu.cn'>Zhu LIU</a>", intro:"<p>Zhu Liu is the designer of the project, he is an Associate Professor and Principle Investigator at Department of Earth System Science, Tsinghua University. Zhu Liu is the founder and Co-PI of Carbon Monitor ( <a target='blank' href='https://carbonmonitor.org/' >https://carbonmonitor.org/</a> ) </p>",flag:false},
        {img:require('../assets/headportrait/Taochun SUN.png'),name:"<a target='_blank' href='mailto:suntaochun@sina.com'>Taochun SUN</a>", intro:"<p>Taochun Sun is a Ph.D. student in the Department of Earth System Science, Tsinghua University, under the supervision of Prof. Zhu Liu. He has contributed to the cement carbon sink project.</p>",flag:false},
        {img:require('../assets/headportrait/Yulun WU.png'),name:"<a target='_blank' href='mailto:ylwu0330@outlook.com'>Yulun WU</a>", intro:"<p>Yulun Wu is currently a Master student majored in Environmental Sciences in Wageningen University, the Netherlands. She received her bachelor's degree in Environmental Engineering from Sun Yat-Sen University. She worked as an intern in this project. Specifically, she assisted with the data and information collection in the area of Middle East and Africa regarding cement carbon sink, and data collection in CCUS facilities. </p>",flag:false},
        {img:require('../assets/headportrait/Feifan YAN.png'),name:"<a target='_blank' href='mailto:yanfeifan@stu.ouc.edu.cn'>Feifan YAN</a>", intro:"<p>Feifan YAN is a Ph.D. Student at the Ocean University of China (OUC). She majors in Environmental Science, mainly focusing on atmospheric chemistry and analyzing the impact of climate change on air pollutants (PM2.5, ozone). Her skills include Fortran, Weather Research and Forecasting-Community Multiscale Air Quality model (WRF-CMAQ), Flexible Particle model (FLEXPART). She currently works on using NCAR Command Language (NCL) to realize global visual analysis of carbon dioxide emissions. She contributed to the calculation of carbon emissions data in this project. </p>",flag:false},
        {img:require('../assets/headportrait/Biqing ZHU.png'),name:"<a target='_blank' href='mailto:biqing_zhu@mail.tsinghua.edu.cn'>Biqing ZHU</a>", intro:"<p>Biqing ZHU obtained her PhD in Environmental Systems Science from ETH Zurich, Switzerland, focusing on greenhouse gas turnover in subsurface soils. She obtained MSc degree in Environmental Sciences from Wageningen University, the Netherlands, focusing on greenhouse gas accounting in agriculture systems. As a post-doctoral researcher at Tsinghua University, she expanded her research interest to global emission accounting and the decarbonization of global power system. Together with Rui GUO, she established the early framework of the Negative Carbon Computing project and continued to coordinate the model development. </p>",flag:false},
      ],
      tab:"aboutus"
    };
  },
  watch:{
    menu:{
      handler(newval, oldVal) {
        if(newval == true){
          this.pos = "fixed";
        }else{
          this.pos = "relative";
        }
      },
      immediate: true
    },
  },
  mounted(){
    document.addEventListener('click', (e) => {
      if(e.path[0].id == 'username'){
        this.flag = true
      }else{
        this.flag = false
      }
      if(e.path[1].id == 'chart'|| e.path[1].id == 'map'){
      }else{
        this.chart = false
        this.map = false
      }
    })
  },
  methods: {
    downloadfun(key) {
      console.log(key, "2");
    },
    toemission() {
      this.$router.push('/carbonemission')
    },
    tohome() {
      this.$router.push("/carbonhome");
    },
    tosink(){
      this.$router.push("/carbonsink");
    },
    toaboutus(){
      this.$router.push('/aboutus');
    },
    tomenu(param){
      this.menu = param
    },
    toflag(){
      this.flag = true
    },
    tomenu(param) {
      this.menu = param;
    },
  },
}
</script>
<style scoped lang='scss'>
.aboutus{
  .usheader{
    height: 100%;
    height: 100%;
    // border-bottom: 1px solid #3d342f;
  }
  .uscontent{
    width: 100%;
    margin: 40px auto 120px;
    max-width: 1464px;
    padding: 0 40px;
    .ustitle{
      color: #000000;
      margin-top: 98px;
      div:nth-child(1){
        font-weight: bold;
        font-size: 46px;
        line-height: 48px;
      }
      div:nth-child(2){
        max-width: 949px;
        margin-top: 56px;
        font-size: 18px;
        line-height: 27px;
      }
      div:nth-child(3){
        margin-top: 56px;
        font-size: 18px;
        line-height: 27px;
        font-weight: 400;
        margin-bottom: 64px;
      }
    }
    .micteams{
      width: 100%;
      >div:nth-child(1){
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 44px;
      }
      .photobox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;
        color: #000000;
        >div{
          margin-bottom: 84.41px;
          >div{
            width: 100%;
            height: 70.45px;
            span{
              display: block;
            }
            span:nth-child(1){
              font-weight: 700;
              font-size: 20px;
              line-height: 18px;
              margin-top: 20.42px;
            }
            span:nth-child(2){
              font-weight: 400;
              font-size: 18px;
              line-height: 18px;
              margin-top: 12.25px;
            }
          } 
          img{
            width: 298px;
            // height: 313.68px;
            height: auto;
          }
        }
      }
    }
    .Tsinghuateams{
      width: 100%;
      >div:nth-child(1){
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 44px;
        margin-top: 37px;
      }
      .photobox{
        display: flex;
        align-items: top;
        justify-content: space-between;
        flex-wrap: wrap;
        color: #000000;
        >div{
          width: 298px;
          // min-height: 570px;
          margin-bottom: 88px;
          >span{
            font-size: 20px;
            font-weight: 700;
            display: block;
            margin-top: 19.98px;
            margin-bottom: 11.77px;
          }
        }
        .text-box,
        .morebtn{
          font-size: 18px;
          line-height: 27px;
        }
        .text-box,.morebtn{
          button{
            cursor: pointer;
            border-bottom: 1px solid #000000;
          }
        }
        .hiddenintro{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .visibleintro{
          overflow: visible;
        }
        img{
          width: 298px;
          height: auto;
        }
        span{
          font-style: 18px;
          line-height: 27px;
        }
      }
       
    }
    .usline{
      height: 1px;
      width: 100%;
      background-color: #F3F3F3;
    }
    .usthanks{
      font-size: 18px;
      font-weight: 400;
      margin-top: 32px;
      color: #000000;
      span:nth-child(1){
        display: inline-block;
        margin-right: 30px;
      }
      span a{
        color: #000000;
      }
    }
    /deep/ .Tsinghuateams .photobox >div span,
    /deep/ .Tsinghuateams .photobox >div span a{
      color:#000000;
    }
    /deep/ .Tsinghuateams .photobox >div .text-box p:last-child{
      margin-bottom: 0;
    }
    /deep/ .Tsinghuateams .photobox >div .text-box >div a{
      color:#000000;
      border-bottom: 1px solid #000000;
    }
  }

  .bottom {
    width: 100%;
    background: #F9F9F9;
  }
  @media screen and (max-width: 839px) {
    .uscontent{
      margin-bottom: 60px;
      padding: 0 24px;
      .Tsinghuateams .photobox > div,
      .micteams .photobox > div{
        width: 100%;
        img{
          width: 100%;
        }
      }
      .ustitle{
        margin-top: 0;
        div:nth-child(2){
          margin-top: 26px;
        }
        div:nth-child(3){
          margin-top: 26px;
        }
      }
      .usthanks{
        margin-top:24px;
      }
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1440px) {
    .Tsinghuateams  .photobox  > div,
    .micteams .photobox > div{
      width: 22.5%;
    }
    .uscontent .Tsinghuateams .photobox > div img,
    .uscontent .micteams .photobox >div img{
      width: 100%;
    }
  }
  @media screen and (min-width: 920px) and (max-width: 1366px) {
    .uscontent .Tsinghuateams  .photobox  > div,
    .uscontent .micteams .photobox > div{
      width: 30%;
      margin-bottom: 63.41px;
    }
    .uscontent .Tsinghuateams .photobox > div img,
    .uscontent .micteams .photobox >div img{
      width: 100%;
    }
  }
  @media screen and (min-width: 839px) and (max-width: 920px) {
    .uscontent .Tsinghuateams  .photobox  > div,
    .uscontent .micteams .photobox > div{
      width: 45%;
    }
    .uscontent .Tsinghuateams .photobox > div img,
    .uscontent .micteams .photobox >div img{
      width: 100%;
    }
  }
}






</style>