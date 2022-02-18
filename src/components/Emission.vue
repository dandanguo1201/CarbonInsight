<template>
    <div class="emission" >
       <div class="chart">
          <div class="linebox" v-if="flag">
            <div class="left">
              <div class="linechart">
                  <div class="charttitle">
                    <div>Daily Estimates of Continent-Level CO2 Emissions(Mt CO2)</div>
                    <button @click="openChart"> open
                      <img class="open" src="../assets/open.svg" alt="" >
                    </button>
                  </div>
                  <div class="chartbox" :style="flag?{'height':height/1.9+'px'}:{'height':height/2.2+'px'}">
                     <Chart :chartLine="chartLine" :resize="resize" :max="max"/>
                  </div>
              </div>
               <div class="select" >
                  <button class="region"  @click="selectRegion" >
                    <div class="select1"> 
                      <div class="name">
                        <div>Region</div>
                        <div>{{nameregion}}</div>
                      </div>
                      <div class="icon">
                        <img :src="region?up:down" alt="" />
                      </div>
                    </div>
                    <div class="menubottom" v-if="region">
                      <button :class="typeregion==item.key? 'menuseleted':''"  v-for="(item,index) in regionlistreverse" :key="index" @click.stop="setMenu('region',item)" >{{item.name}}</button>
                    </div>
                  </button>
                  <button class="sector" @click="selectSector" >
                    <div class="select2"> 
                      <div class="name">
                        <div>Sector</div>
                        <div>{{namesector}}</div>
                      </div>
                      <div class="icon">
                        <img :src="sector?up:down" alt=""/>
                      </div>
                    </div>
                    <div class="menubottom menusector" v-if="sector">
                      <button :class="typesector==item.key? 'menuseleted':''"  v-for="(item,index) in sectorlistreverse" :key="index" @click.stop="setMenu('sector',item)" >{{item.name}}</button>
                    </div>
                  </button>
              </div>
              <div class="mark leftmark">
                Liu, Z., Ciais, P., Deng, Z. et al. Carbon Monitor, a near-real-time daily dataset of global CO2 emission from fossil fuel and cement production. Sci Data 7, 392 (2020). <a href="https://doi.org/10.1038/s41597-020-00708-7">https://doi.org/10.1038/s41597-020-00708-7</a>
              </div>
            </div>
            <div class="right">
              <div>Carbon Emission</div>
              <div>Carbon emission is the release of carbon into the atmosphere. This section monitors variations in CO2 emissions from different aspects of human activities, with near-global coverage on a daily basis, which could offer a range of opportunities for related scientific research and policy making. </div>
              <button @click="goEmission">
                <div class="learn">Learn more</div>
                <div class="img"></div>
              </button>
            </div>
          </div>
          <!-- 展开后的部分 -->
          <div v-if="!flag">
            <div class="title">
            <div class="btitle">
                <div class="text">Carbon Emission</div>
                <div class="text">Daily Estimates of Continent-Level CO2 Emissions(Mt CO2)</div>
            </div>
            <button class="img" @click="closeChart()">
              <img src="../assets/close.svg" alt="" />
            </button>
          </div>
          <div class="linebox">
            <div class="left w100" >
            <div class="selectDiv" >
              <div class="select selectTop">
                <button class="region" @click="selectRegion" >
                  <div class="select1"  > 
                    <div class="name">
                      <div>Region</div>
                      <div>{{nameregion}}</div>
                    </div>
                    <div class="icon">
                      <img :src="region?up:down" alt="" />
                    </div>
                  </div>
                  <div class="menu" v-if="region">
                    <button :class="typeregion==index? 'menuseleted':''"  v-for="(item,index) in regionlist" :key="index" @click.stop="setMenu('region',item)" >{{item.name}}</button>
                  </div>
                </button>
                <button class="sector" @click="selectSector" >
                  <div class="select2" > 
                    <div class="name">
                      <div>Sector</div>
                      <div>{{namesector}}</div>
                    </div>
                    <div class="icon">
                      <img :src="sector?up:down" alt="" />
                    </div>
                  </div>
                  <div class="menu menusector" v-if="sector">
                    <button :class="typesector==index? 'menuseleted':''"  v-for="(item,index) in sectorlist" :key="index" @click.stop="setMenu('sector',item)" >{{item.name}}</button>
                  </div>
                </button>
              </div>
              <button class="jump" @click="goEmission">
                Learn more
                <img src="../assets/next1.svg"  alt=""/>
              </button>
            </div>
              <div class="linechart linechartwidth"  >
                  <div class="chartboxwidth" :style="{'height':height/2.2+'px'}">
                     <Chart :chartLine="chartLine" :resize="resize" :max="max"/>
                  </div>
              </div>
              <div class="mark">
                Liu, Z., Ciais, P., Deng, Z. et al. Carbon Monitor, a near-real-time daily dataset of global CO2 emission from fossil fuel and cement production. Sci Data 7, 392 (2020). <a target="_blank" href="https://doi.org/10.1038/s41597-020-00708-7">https://doi.org/10.1038/s41597-020-00708-7</a>
              </div>
            </div>
          </div>
          </div>
       </div>
    </div>
</template>
<script>
import single from '../../public/charts.json'
import world from '../../public/world.json'
import sector from '../../public/sector.json'
import all from '../../public/all.json'

import Slider from '../components/Slider.vue';
import Chart from '../components/Chart.vue';
import up from "@/assets/up.svg";
import down from "@/assets/down.svg";
export default {
  name: 'About',
  components: {
     Slider,
     Chart
  },
  props:['height'],
  data() {
    return {
      up,
      down,
      regionlist:[
        {name:'World',key:0},
        {name:'Africa',key:1},
        {name:'Asia',key:2},
        {name:'Europe',key:3},
        {name:'Oceania',key:4},
        {name:'Americas',key:5},
      ],
      sectorlist:[
        {name:'All',key:0},
        {name:'Domestic Aviation',key:1},
        {name:'Ground Transport',key:2},
        {name:'Industry',key:3},
        {name:'Power',key:4},
        {name:'Residential',key:5},
      ],
      regionlistreverse:[
        {name:'Americas',key:5},
        {name:'Oceania',key:4},
        {name:'Europe',key:3},
        {name:'Asia',key:2},
        {name:'Africa',key:1},
        {name:'World',key:0},
      ],
      sectorlistreverse:[
        {name:'Residential',key:'5'},
        {name:'Power',key:'4'},
        {name:'Industry',key:'3'},
        {name:'Ground Transport',key:'2'},
        {name:'Domestic Aviation',key:'1'},
        {name:'All',key:'0'},
      ],
      typeregion:0,
      typesector:0,
      nameregion:'World',
      namesector:'All',
      region:false,
      sector:false,
      singleArr:[],
      worldArr:[],
      sectorArr:[],
      allArr:[],
      chartLine:[],  //折线图的data
      resize:false,
      flag:true,
      max:3500
    };
  },
  mounted(){
    this.singleArr = JSON.parse(JSON.stringify(single))
    this.worldArr = JSON.parse(JSON.stringify(world))
    this.sectorArr = JSON.parse(JSON.stringify(sector))
    this.allArr = JSON.parse(JSON.stringify(all))
    this.$nextTick(()=>{
        let arr =[]
        let line0 = this.getAllAll()
        let line1 = this.getAllSector('Europe')
        let line2 = this.getAllSector('Asia')
        let line3 = this.getAllSector('Africa')
        let line4 = this.getAllSector('Oceania')
        let line5 = this.getAllSector('Americas')
        this.chartLine = arr.concat(line5,line4,line3,line2,line1,line0)
    })
  },
  methods: {
    getAll(Continent,Sector){
      let arr = []
      this.singleArr.forEach((item,index)=>{
          if(item.Continent == Continent && item.Sector == Sector ){
            arr.push(item)
          }
      })
      if(!arr) return []
      let sortArr = this.sortBytime(arr)
      return this.getObj(sortArr,Continent)
    },
    getAllWorld(Sector){
      let arr = []
      this.worldArr.forEach((item,index)=>{
          if(item.Sector == Sector ){
            arr.push(item)
          }
      })
      let sortArr = this.sortBytime(arr)
      return this.getObj(sortArr,'World')
    },
    getAllSector(Continent){
      let arr = []
      this.sectorArr.forEach((item,index)=>{
          if(item.Continent == Continent){
            arr.push(item)
          }
      })
      let sortArr = this.sortBytime(arr)
      return this.getObj(sortArr,Continent)
    },
    getAllAll(){
      let sortArr = this.sortBytime(this.allArr)
      return this.getObj(sortArr,'World')
    },
    sortBytime(arr){
      return arr.sort((a,b)=>{ return a.Time-b.Time})
    },
    getObj(sortArr,Continent){
      let line = []
      let data = []
      let obj = new Object()
      let color = this.getcolor(Continent)
      sortArr.forEach((item,index)=>{
        data.push(Number(item.Value).toFixed(2))
      })
      obj.name = Continent
      obj.type = 'line'
      obj.color = color[1]
      // obj.stack='总量'   //堆积折线图显示总量
      obj.symbol='none'
      // obj.areaStyle= {
      //   normal: {
      //     color: color[0]  //改变区域颜色
      //   }
      // }
      obj.itemStyle = { normal : { 
          // color:color, //改变折线点的颜色
          lineStyle:{ 
             color:color[1] //改变折线颜色
          } 
      }
      }
      obj.data = data
      line.push(obj)
      return line
    },
    getcolor(Continent){
      let color = ''
      let linecolor = ''
      switch(Continent){
        case 'World':
          linecolor = '#D4474F'
          color = "rgba(212, 71, 79, 0.2)"
          break;
        case 'Africa':
          linecolor = '#118DFF'
          color = "rgba(17, 141, 255, 0.2)"
          break;
        case 'Asia':
          linecolor = '#754EC3'
          color = "rgba(117, 78, 195, 0.2)"
          break;
        case 'Europe':
          linecolor = '#DAB300'
          color = "rgba(218, 179, 0, 0.2)"
          break;
        case 'Oceania':
          linecolor = '#E56C37'
          color = "rgba(229, 108, 55, 0.2)"
          break;
        case 'Americas':
          linecolor = '#197278'
          color = "rgba(25, 114, 120, 0.2)"
          break;
      }
      return [color,linecolor]
    },
    
    getlinedata(){
      if(this.nameregion != 'World' && this.namesector != 'All'){
        this.chartLine = []
        let arr = []
        let line = this.getAll(this.nameregion,this.namesector)
        this.max = 1000
        this.chartLine = arr.concat(line)
      }else if(this.nameregion == 'World' && this.namesector != 'All'){
        this.chartLine = []
        let arr = []
        let line0 = this.getAllWorld(this.namesector)
        let line1 = this.getAll('Europe',this.namesector)
        let line2 = this.getAll('Asia',this.namesector)
        let line3 = this.getAll('Africa',this.namesector)
        let line4 = this.getAll('Oceania',this.namesector)
        let line5 = this.getAll('Americas',this.namesector)
        this.max = 1500
        this.chartLine = arr.concat(line5,line4,line3,line2,line1,line0)
      }else if(this.nameregion == 'World' && this.namesector == 'All'){
        this.chartLine = []
        let arr = []
        let line0 = this.getAllAll()
        let line1 = this.getAllSector('Europe')
        let line2 = this.getAllSector('Asia')
        let line3 = this.getAllSector('Africa')
        let line4 = this.getAllSector('Oceania')
        let line5 = this.getAllSector('Americas')
        this.max = 3500
        this.chartLine = arr.concat(line5,line4,line3,line2,line1,line0)
      }else if(this.nameregion != 'World'&&this.namesector == 'All'){
        this.chartLine = []
        let arr = []
        let line = this.getAllSector(this.nameregion)
        this.max = 2000
        this.chartLine = arr.concat(line)
      }
    },
    setMenu(type,item){
      let _this = this
      this['type'+type] = item.key
      this['name'+type] = item.name
      this.sector = false
      this.region = false
      this.getlinedata()
    },
    selectRegion(){
      this.region = !this.region
      this.sector = false
    },
    selectSector(){
      this.sector = !this.sector
      this.region = false
    },
    goEmission(){
      this.$emit('toemission','1')
    },
    openChart(){
      this.flag = false
      this.resize = true
      this.region = false
      this.sector = false
    },
    closeChart(){
      this.flag = true
      this.resize = false
      this.region = false
      this.sector = false
    }
  }
}
</script>
<style scoped lang='scss'>
.emission{
  width: 100%;
  height: 100%;
  max-width: 1384px;
  margin: 0 auto;
  // border: 1px solid red;
  .chart{
    width: 100%;
    height: 100%;
    margin: 0 13px 25px 4px;
    .title{
      margin-top: -40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin-bottom: 58px;
      .btitle{
        font-weight: bold;
        font-size: 32px;
        line-height: 53px;
        color: #000;
      }
    }
    .menu{
      // width: 357px;
      width: 100%;
      position: absolute;
      top: 62px;
      left: 0;
      border: 1px solid #000;
      border-top: none;
      background-color: #fff;
      z-index: 10;
      button:hover{
        background: #F9F9F9;
      }
      >button{
        padding-left: 16px;
        font-size: 12px;
        height: 48px;
        width: 100%;
        text-align: left;
        line-height: 48px
      }
      .menuseleted{
        color: #000;
        background: #F9F9F9;
      }
    }
    .menubottom{
      width: 100%;
      height: 289px;
      position: absolute;
      bottom: 62px;
      left: 0;
      border: 1px solid #000;
      border-bottom: none;
      background-color: #fff;
      z-index: 10;
      text-align: left;
      button:hover{
        background: #F9F9F9;
      }
      >button{
        display: block;
        padding-left: 16px;
        font-size: 12px;
        height: 48px;
        width: 100%;
        text-align: left;
        // width: 338px;
        line-height: 48px
      }
      .menuseleted{
        color: #000;
        background: #F9F9F9;
      }
    }
    .menusector{
      width: 100.3%;
      left: -1px;
    }
    .linebox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .left{
        height: 100%;
        width: 58%;
        .select{
          width: 100%;
          display: flex;
          justify-content: flex-start;
          white-space: wrap;
          margin-top: 22px;
          .region,.sector{
              box-sizing: border-box;
              height: 64px;
              width: 50%;
              position: relative;
          }
        }
        .select 
        .select1,
        .select2{
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          .name{
            >div:first-child{
              font-style: 12px;
              color: #666666;
              margin-top: 5px;
            }
            >div:last-child{
              font-weight: 600;
              font-size: 18px;
              color: #000;
            }
          }
          .icon{
            width: 28px;
            height: 28px;
            text-align: center;
            line-height: 28px;
          }
        }
        .select1,
        .select2{
          height: 64px;
          border: 1px solid #000;
          box-sizing: border-box;
          padding: 0 20px;
        }
        .select1{
          border-radius: 4px 0px 0px 4px;
        }
        .select2{
          border-radius: 0px 4px 4px 0px;
          border-left: none;
        }
      }
      .selectDiv{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
         .selectTop{
            width: 58%;
          }
      }
      .w100{
        width: 100%;
        // height: 100%;
      }
      .jump{
          text-align: right;
          display: inline-block;
          line-height: 64px;
          // width: 240px;
          height: 64px;
          color: #000;
        }
      .right{
        // width: 378px;
        width: 31%;
        color: #000;
        // margin-top: 83px;
        // margin-top: 36px;
        margin-top: -48px;
        margin-left: 8%;
        div:nth-child(1){
          font-weight: bold;
          font-size: 32px;
          // margin-top: 132px;
          line-height: 36px;
        }
        div:nth-child(2){
          font-size: 18px;
          // color: #979797;
          color: #000;
          line-height: 27px;
          // margin-top: 55px;
          // margin-top: 14.5%;
          margin-top: 8.5%;
        }
        button{
          // margin-top: 48px;
          overflow: hidden;
          margin-top: 12.7%;
          overflow: hi;
          width: 240px;
          height: 64px;
          border: 1.5px solid #000;
          box-sizing: border-box;
          border-radius: 80px;
          color: #000;
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
            font-weight: 600;
          }
          .img{
            width: 100%;
            height: 100%;
            margin-left: 23px;
            margin-top: 58px;
            line-height: 64px;
            background: url('~@/assets/next1.svg') no-repeat;
          }
        }
        div:nth-child(3):hover{
          background-color: #5E483A;
          color: #ffffff;
          .img{
            width: 100%;
            height: 100%;
            margin-left: 23px;
            background: url('~@/assets/next2.svg') no-repeat;
          }
        }
      }
    }
    .linechart{
      // margin-top: 34px;
      // width: 719px;
      width: 100%;
      margin-top: -20px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      // position: relative;
      .charttitle{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 20px;
        margin: 0 33px 20px 60px;
        justify-content: space-between;
        // white-space: nowrap;
        color: #000;
        height: 100%;
        >div:first-child{
          font-weight: bold;
          font-size: 18px;
        }
        >div:last-child{
          font-size: 14px;
        }
        .open{
          width: 21px;
          height: 21px;
          margin-left: 6px;
        }
        .fullscreen{
          margin-left: 6px;
          i{
            width: 21px;
            height: 21px;
          }
        }
      }
      .chartbox{
        width: 100%;
        height: 300px!important;
        margin-top:30px;
      }
      .chartboxwidth{
        width: 100%;
        margin-top: 20px;
      }
    }
    .linechartwidth{
      width:100%;
      margin-top: 30px;
    }
    .mark{
      text-align: right;
      font-size: 14px;
      color: #666666;
      margin-top: 22px;
    }
    .leftmark{
      text-align: left;
      width: 100%;
      a{
        color:#1273ce;
      }
    }
    .w100{
       width: 100%;
    }
    .slider{
        width: 100%;
        height: 55px;
        margin-top: 5px;
    }
    .tag{
      color: #6D6D6D;
      font-size: 12px;
      margin-top: 25px;
      margin-left: 8px;
    }
    .r{
      text-align: right;
    }
  }
  @media screen and (max-width: 639px) {
    .chart .linebox{
      flex-wrap: wrap;
      flex-direction: column-reverse;
      .left{
        width: 100%;
        .charttitle{
          position: relative;
          margin: 0 10px;
          div:nth-child(1){
            font-size: 18px;
            font-weight: bold;
            font-size: 16px;
          }
          div:nth-child(2){
            display: none;
          }
        }
        .select .region .select1 .name>div:first-child,
        .select .sector .select2 .name>div:first-child{
          font-size: 14px;
        }
        .select .region .select1 .name>div:last-child,
        .select .sector .select2 .name>div:last-child{
          font-size: 16px;
          line-height: 16px;
          margin-top: 4px;
        }
        .select .region .select1 .icon,
        .select .sector .select2 .icon{
          width: 20px;
          height: 20px;
          line-height: 20px;
        }
      }
      .right{
        width: 100%;
        margin-left: 0;
        margin-bottom: 68px;
        margin-top: 25px;
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
    }
    
  }
}
</style>