<template>
  <div :style="{ position: pos }">
    <div class="sinkheader">
      <header-new
        @toemission="toemission"
        @tosink="tosink"
        @tohome="tohome"
        @toflag="toflag"
        @toaboutus="toaboutus"
        @tomenu="tomenu"
        :menu="menu"
        :sign="false"
        :flag="flag"
        :name="'sink'"
      />
    </div>
    <div class="sinkdata">
      <div class="sinktitle">
        <span>Carbon Sink Gridding Data</span>
        <span>DATA AS OF 12/31/2017</span>
      </div>
      <!-- <div class="sinkcontent">
        Monthly carbon sink data are divided into the land sink and the ocean sink. Land sink data are estimated from global vegetation cover. Forests make up the majority of the land sink. Ocean sink data are generated using partial pressure of carbon dioxide (pCO₂) across the ocean. The pCO₂ in the equatorial region is very high, which also indicates that this region is more likely to be a carbon source, while other regions are carbon sink. The global ocean pCO₂ in the past three decades have been increasing, meaning that the carbon dissolved in the ocean has also been increasing.<br>
        *The ocean sink uses a pressure unit. Data in the mass unit will be released soon.
      </div> -->
      <div class="text-box">
        <!-- <input id="tips" class="tips" type="checkbox">
        <div class="text-content">
            <label class="label-tips" for="tips"></label>
            Monthly carbon sink data are divided into the land sink and the ocean sink. Land sink data are estimated from global vegetation cover. Forests make up the majority of the land sink. Ocean sink data are generated using partial pressure of carbon dioxide (pCO₂) across the ocean. The pCO₂ in the equatorial region is very high, which also indicates that this region is more likely to be a carbon source, while other regions are carbon sink. The global ocean pCO₂ in the past three decades have been increasing, meaning that the carbon dissolved in the ocean has also been increasing.<br>
            *The ocean sink uses a pressure unit. Data in the mass unit will be released soon.
        </div> -->
        <div v-if="word" class="visibleintro">
          Monthly carbon sink data are divided into the land sink and the ocean
          sink. Land sink data are estimated from global vegetation cover.
          Forests make up the majority of the land sink. Ocean sink data are
          generated using partial pressure of carbon dioxide (pCO₂) across the
          ocean. The pCO₂ in the equatorial region is very high, which also
          indicates that this region is more likely to be a carbon source, while
          other regions are carbon sink. The global ocean pCO₂ in the past three
          decades have been increasing, meaning that the carbon dissolved in the
          ocean has also been increasing.<br />
          *The ocean sink uses a pressure unit. Data in the mass unit will be
          released soon.
        </div>
        <div v-else class="hiddenintro">
          Monthly carbon sink data are divided into the land sink and the ocean
          sink. Land sink data are estimated from global vegetation cover.
          Forests make up the majority of the land sink. Ocean sink data are
          generated using partial pressure of carbon dioxide (pCO₂) across the
          ocean. The pCO₂ in the equatorial region is very high, which also
          indicates that this region is more likely to be a carbon source, while
          other regions are carbon sink. The global ocean pCO₂ in the past three
          decades have been increasing, meaning that the carbon dissolved in the
          ocean has also been increasing.<br />
          *The ocean sink uses a pressure unit. Data in the mass unit will be
          released soon.
        </div>
        <div class="morebtn" @click="word = !word">
          <button>{{ word ? "show less" : "Learn more" }}</button>
        </div>
      </div>
      <div class="sinkbtn">
        <div class="map" id="map">
          <button
            :class="
              selectBtn == 1
                ? 'btn btn_left selected'
                : 'btn btn_left unselected'
            "
            @click="selectMap"
          >
            {{ namemap }}
          </button>
          <button
            :class="
              selectBtn == 1
                ? 'btn btn_right selected'
                : 'btn btn_right unselected right'
            "
            @click="mapDis"
          >
            Map
            <img v-if="selectBtn == 1" :src="map ? w_up : w_down" alt="" />
            <img v-if="selectBtn == 2" :src="b_down" alt="" />
          </button>
          <div class="menu" v-if="map">
            <button
              :class="typemap == index ? 'menuseleted' : ''"
              v-for="(item, index) in maplist"
              :key="index"
              @click="setMenu('map', item)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
        <div class="chart" id="chart">
          <button
            :class="
              selectBtn == 2
                ? 'btn btn_left selected'
                : 'btn btn_left unselected'
            "
            @click="selectChart"
          >
            {{ namechart }}
          </button>
          <button
            :class="
              selectBtn == 2
                ? 'btn btn_right selected'
                : 'btn btn_right unselected right'
            "
            @click="chartDis"
          >
            Charts
            <img v-if="selectBtn == 2" :src="chart ? w_up : w_down" alt="" />
            <img v-if="selectBtn == 1" :src="b_down" alt="" />
          </button>
          <div class="menu menuchart" v-if="chart">
            <button
              :class="typechart == index ? 'menuseleted' : ''"
              v-for="(item, index) in chartlist"
              :key="index"
              @click="setMenu('chart', item)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="powerbi_gif">
      <img :src="gifurl" alt="" />
    </div>
    <div class="bigTitle">Carbon Sink Featured Data</div>
    <viewer :images="images">
      <div class="imgbox">
        <div v-for="src in imagesDetails" :key="src.url">
          <div class="img">
            <img :src="src.url" :alt="src.url | toSrc" />
          </div>
          <div class="title">{{ src.title }}</div>
          <div class="tips">{{ src.tips }}</div>
        </div>
        <div class="temp" v-for="i in 2" :key="i"></div>
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
import API from "@/request/api";
import powerbi from "@/request/powerbi";
import WorldMap from "../components/WorldMap.vue";
import LineChart from "../components/LineChart.vue";
import Slider from "../components/Slider.vue";
import OptionMap from "../components/OptionMap.vue";
import FooterNew from "../components/FooterNew.vue";
import HeaderNew from "@/components/HeaderNew.vue";
import w_down from "@/assets/w_down.png";
import w_up from "@/assets/w_up.png";
import b_down from "@/assets/b_down.png";
import b_up from "@/assets/b_up.png";
import moment from "moment";
import Oceanchart from "@/assets/Ocean-sink-chart.gif";
import Oceanmap from "@/assets/Ocean-sink-map.gif";
import Landchart from "@/assets/Land-sink-chart.gif";
import Landmap from "@/assets/Land-sink-map.gif";

import tab1_land1 from "@/assets/LandSink_map_Jan2020.png";
import tab1_land2 from "@/assets/LandSink_map_July2020.png";
import tab1_ocean1 from "@/assets/OceanSink_map_Jan2017.png";
import tab1_ocean2 from "@/assets/OceanSink_map_July2017.png";
import tab2_land1 from "@/assets/LandSink_Chart_Australia.png";
import tab2_land2 from "@/assets/LandSink_Chart_Brazil.png";
import tab2_land3 from "@/assets/LandSink_Chart_China.png";
import tab2_land4 from "@/assets/LandSink_Chart_US.png";
import tab2_ocean1 from "@/assets/OceanSink_Chart_Arctic.png";
import tab2_ocean2 from "@/assets/OceanSink_Chart_Atlantic.png";
import tab2_ocean3 from "@/assets/OceanSink_Chart_Indian.png";
import tab2_ocean4 from "@/assets/OceanSink_Chart_Pacific.png";

export default {
  components: {
    WorldMap,
    LineChart,
    Slider,
    OptionMap,
    FooterNew,
    HeaderNew,
  },
  name: "CarbonSink",
  data() {
    return {
      Oceanchart,
      Oceanmap,
      Landchart,
      Landmap,
      w_down,
      w_up,
      b_down,
      b_up,
      gifurl: Landmap,
      Tab1Land: [
        {
          url: tab1_land1,
          title: "Global land carbon sink in 2020.01 ",
          tips: "Global land carbon sink (vegetation) in January 2020",
        },
        {
          url: tab1_land2,
          title: "Global land carbon sink in 2020.07 ",
          tips: "Global land carbon sink (vegetation) in July 2020",
        },
      ],
      Tab1Ocean: [
        {
          url: tab1_ocean1,
          title: "Global ocean sink in 2020.01 ",
          tips: "Global ocean sink in January 2020",
        },
        {
          url: tab1_ocean2,
          title: "Global ocean sink in 2020.07 ",
          tips: "Global ocean sink in July 2020",
        },
      ],
      Tab2Land: [
        {
          url: tab2_land1,
          title: "Global land carbon sink in Australia ",
          tips: "Top: Monthly variations of land carbon sink (vegetation) in Australia; Lower left: Land sink by sector (only vegetation for now, more sectors to be updated); Lower right: Land sink in Australia makes up about 1% of global land carbon sink overtime",
        },
        {
          url: tab2_land2,
          title: "Global land carbon sink in Brazil ",
          tips: "Top: Monthly variations of land carbon sink (vegetation) in Brazil; Lower left: Land sink by sector (only vegetation for now, more sectors to be updated); Lower right: Land sink in Brazil makes up about 4% of global land carbon sink overtime",
        },
        {
          url: tab2_land3,
          title: "Global land carbon sink in China ",
          tips: "Top: Monthly variations of land carbon sink (vegetation) in China; Lower left: Land sink by sector (only vegetation for now, more sectors to be updated); Lower right: Land sink in China makes up about 18% of global land carbon sink overtime",
        },
        {
          url: tab2_land4,
          title: "Global land carbon sink in the US ",
          tips: "Top: Monthly variations of land carbon sink (vegetation) in the US; Lower left: Land sink by sector (only vegetation for now, more sectors to be updated); Lower right: Land sink in the US makes up about 14% of global land carbon sink overtime",
        },
      ],
      Tab2Ocean: [
        {
          url: tab2_ocean1,
          title: "Ocean carbon sink in Arctic ",
          tips: "Variations of ocean carbon sinks in the Arctic ocean overtime",
        },
        {
          url: tab2_ocean2,
          title: "Ocean carbon sink in Atlantic ",
          tips: "Variations of ocean carbon sinks in the Atlantic ocean overtime",
        },
        {
          url: tab2_ocean3,
          title: "Ocean carbon sink in Indian ",
          tips: "Variations of ocean carbon sinks in the Indian ocean overtime",
        },
        {
          url: tab2_ocean4,
          title: "Ocean carbon sink in Pacific ",
          tips: "Variations of ocean carbon sinks in the Pacific ocean overtime",
        },
      ],
      imagesDetails: [],
      images: [tab1_land1, tab1_land2],
      bgc: "background:#F9F9F9;",
      pos: "relative",
      report: 0,
      dateFormat: "YYYY-MM",
      selectBtn: 1,
      map: false,
      chart: false,
      disabled: false,
      typemap: 0,
      typechart: 0,
      namemap: "World Map",
      namechart: "Land",
      maplist: [
        // { name: "World Map", key: 0 },
        { name: "Land Map", key: 1 },
        { name: "Ocean Map", key: 2 },
      ],
      oceanList: [],
      chartlist: [
        { name: "Land", key: 0 },
        { name: "Ocean", key: 1 },
      ],
      worldList: [],
      sector: null,
      resize: false,
      chartLine: [], //折线图的data
      treeData: [],
      timeData: [],
      fromDate: "1985-01",
      toDate: "1985-01",
      from_Date: "1985-01",
      to_Date: "1985-01",
      // timeFlag: false,
      // optionFlag: true,
      landoptionFlag: true,
      oceanoptionFlag: true,
      landlineValData: [], //折线图val数组
      oceanlineValData: [],
      legend: [],
      linedataflag: 1,
      chartObj: {},
      mapObj: {},
      landAllArr: [],
      oceanAllArr: [],
      myMap: new Map(),
      zoom: 2,
      l: 39.4,
      r: 116.2,
      flag: false,
      menu: false,
      word: false,
    };
  },
  created() {
    this.height =
      document.documentElement.clientHeight || document.body.clientHeight;
    var width =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 639) {
      this.word = true;
    } else {
      this.word = false;
    }
    this.imagesDetails = this.Tab1Land;
  },
  filters: {
    toSrc(e) {
      let src = e.toString().split("/")[2];
      return src.substring(0, src.length - 13) + ".png";
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (e.path[0].id == "username") {
        this.flag = true;
      } else {
        this.flag = false;
      }
      if (e.path[1].id == "chart" || e.path[1].id == "map") {
      } else {
        this.chart = false;
        this.map = false;
      }
    });
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
    // this.GetOceanTable();
    // this.GetCountryTable();
    // this.setMenu("map", { name: "Land Map", key: 1 });
    // powerbi.bootstrap(document.getElementById("powerbi-container"));
    // document.getElementsByTagName("iframe")[0].style.border = "none";
    // document
    //   .getElementsByTagName("iframe")[0]
    //   .setAttribute("aria-label", "powerbisink");
  },
  watch: {
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
    tomenu(param) {
      this.menu = param;
    },
    /**
     * 获取bingmap数据
     */
    GetData(sector1, sector2, fromDate, toDate) {
      let _this = this;
      let promiseOcean = this.GetCarbonSinkDataGridChart(
        sector1,
        fromDate,
        toDate
      );
      let promiseLand = this.GetCarbonSinkDataGridChart(
        sector2,
        fromDate,
        toDate
      );
      let promiseAll = Promise.all([promiseOcean, promiseLand]);
      promiseAll.then(function (res) {
        _this.timeFlag = false;
        var arr = res.reduce(function (a, b) {
          return a.concat(b);
        });
        _this.worldList = arr;
      });
    },
    /**
     * 获取地图数据
     */
    GetCarbonSinkDataGridChart(sector, from_date, to_date) {
      let from = new Date(from_date).getTime();
      let to = new Date(to_date).getTime();
      if (from > to) return;
      let _this = this;
      return new Promise(function (resolve) {
        API.GetCarbonSinkDataGridChart(sector, from_date, to_date)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    /**
     *
     * 获取国家列表
     */
    GetCountryTable() {
      let _this = this;
      API.GetGeography("land").then((res) => {
        res.data.forEach((item) => {
          this.myMap.set(item[0], item[1]);
        });
        console.log(res, "获取大陆经纬度信息");
        this.landAllArr = res.data;
        _this.filterLandArr(res.data);
        return;
        let Obj = new Object();
        Obj.Americas = [];
        Obj.Asia = [];
        Obj.Europe = [];
        Obj.Africa = [];
        Obj.Oceania = [];
        res.data.forEach((item) => {
          if (item[2] == "Americas") {
            Obj.Americas.push(_this.countryListHandle(item));
          }
          if (item[2] == "Asia") {
            Obj.Asia.push(_this.countryListHandle(item));
          }
          if (item[2] == "Europe") {
            Obj.Europe.push(_this.countryListHandle(item));
          }
          if (item[2] == "Africa") {
            Obj.Africa.push(_this.countryListHandle(item));
          }
          if (item[2] == "Oceania") {
            Obj.Oceania.push(_this.countryListHandle(item));
          }
        });
        let treeData = ["Americas", "Asia", "Europe", "Africa", "Oceania"];
        let arr = [];
        treeData.forEach((item) => {
          let obj = new Object();
          obj.title = item;
          obj.key = item;
          obj.children = Obj[item];
          arr.push(obj);
        });
        console.log(arr, "arr");
        _this.treeData = arr;
      });
    },
    filterLandArr(arr) {
      let obj = {};
      arr.forEach((item) => {
        if (obj.hasOwnProperty(item[2])) {
          let o = {};
          o.code = item[0];
          o.title = item[1];
          o.key = item[0];
          o.country = item[1];
          o.longitude = item[3];
          o.latitude = item[4];
          obj[item[2]].children.push(o);
        } else {
          let o = new Object();
          o.code = item[0];
          o.country = item[1];
          o.title = item[1];
          o.key = item[0];
          o.longitude = item[3];
          o.latitude = item[4];
          obj[item[2]] = {
            title: "",
            key: "",
            children: [],
          };
          obj[item[2]].title = item[2];
          obj[item[2]].key = item[2];
          obj[item[2]].children.push(o);
        }
      });
      let ARR = [];
      for (var key in obj) {
        ARR.push(obj[key]);
      }
      this.treeData = ARR;
    },
    countryListHandle(item) {
      let obj = new Object();
      obj.code = item[0];
      obj.title = item[1];
      obj.key = item[0];
      obj.longitude = item[3];
      obj.latitude = item[4];
      return obj;
    },
    /**
     * 获取海洋列表
     */
    GetOceanTable() {
      let _this = this;
      API.GetGeography("ocean").then((res) => {
        console.log(res, "获取大洋列表");
        if (res.data) {
          _this.oceanAllArr = res.data;
          _this.filterOceanArr(res.data);
          // let arr = []
          // res.data.forEach(item=>{
          //   arr.push(item[0])
          //   // let obj = {}
          //   // obj.name = item[0]
          //   // obj.longitude = item[1]
          //   // obj.latitude = item[2]
          //   // obj.flag = true
          //   // arr.push(obj)
          // })
          // _this.oceanList = arr
          // console.log(_this.oceanList,'_this.oceanList')
        }
      });
    },
    filterOceanArr(prarm) {
      let arr = [];
      prarm.forEach((item) => {
        arr.push(item[0]);
        // let obj = {}
        // obj.name = item[0]
        // obj.longitude = item[1]
        // obj.latitude = item[2]
        // obj.flag = true
        // arr.push(obj)
      });
      this.oceanList = arr;
    },
    /**
     * 获取折线图数据
     */
    GetCarbonSinkDataLineChart(sector, countryRegions, fromDate, toDate) {
      console.log(countryRegions, "countryRegions");
      let _this = this;
      API.GetCarbonSinkDataLineChart(
        sector,
        countryRegions,
        "1985-01",
        "2017-12"
      ).then((res) => {
        if (res.data) {
          console.log(res, "获取折线图数据");
          let obj = {};
          res.data.forEach((item) => {
            if (obj.hasOwnProperty(item[1])) {
              obj[item[1]].time.push(item[0].slice(0, 7));
              obj[item[1]].val.push(item[2]);
              obj[item[1]].rate.push(item[3]);
            } else {
              let o = {};
              o.time = item[0].slice(0, 7).split(",");
              o.val = [item[2]];
              o.rate = [item[3]];
              obj[item[1]] = o;
            }
          });
          _this.chartObj = obj;
          _this.setChartLinde(obj, "val");
        }
      });
    },
    setChartLinde(obj, flag) {
      console.log(obj, "折线图数据");
      let arr = [];
      let time = [];
      let legend = [];
      for (let key in obj) {
        if (key != "Land" && key != "Ocean") {
          for (let [k, v] of this.myMap) {
            if (key == k) {
              legend.push(v);
              let o = new Object();
              o.name = v;
              (o.symbol = "circle"), //设定为实心点
                (o.symbolSize = 3), //设定实心点的大小
                (o.type = "line");
              o.stack = v;
              o.data = flag == "val" ? obj[key].val : obj[key].rate;
              time = obj[key].time;
              arr.push(o);
            }
          }
        } else {
          legend.push(key);
          let o = new Object();
          o.name = key;
          (o.symbol = "circle"), //设定为实心点
            (o.symbolSize = 3), //设定实心点的大小
            (o.type = "line");
          o.stack = key;
          o.data = flag == "val" ? obj[key].val : obj[key].rate;
          time = obj[key].time;
          arr.push(o);
        }
      }
      time.sort(function (a, b) {
        //按照时间排序
        var a = new Date(a).getTime();
        var b = new Date(b).getTime();
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        }
        return 0;
      });
      // console.log(legend,'legend')
      // console.log(arr.length,'arr==')
      this.legend = legend;
      this.timeData = time;
      console.log("this.timeData", this.timeData);
      this.chartLine = arr;
    },
    fliterDate(date) {
      return date.split("")[0];
    },
    selectInfo(param) {
      this.chartObj = {};
      this.legend = [];
      this.timeData = [];
      this.chartLine = [];
      // console.log(param,'param')
      this.GetCarbonSinkDataLineChart(
        "land",
        param,
        this.fromDate,
        this.toDate
      ); //更新折线图数据
      // this.GetData("land",param,this.fromDate,this.toDate)
    },
    selectOcean(param) {
      let name = param.pop();
      console.log(name, "name");
      if (!name) return;
      // this.oceanAllArr.forEach(item=>{
      //   console.log(item,'item')
      //   if(item[0] == name){
      //     this.l = Number(item[1])
      //     this.r = Number(item[2])
      //     this.zoom = 4
      //   }
      // })
      console.log(param, "param===");
      return;
      this.GetCarbonSinkDataGridChart(param, this.fromDate, this.toDate).then(
        (res) => {
          console.log(res, "res");
        }
      );
    },
    /**
     * 选择时间bingmap中的
     */
    onChangeStart(value, dateString) {
      this.fromDate = dateString;
      this.toDate = dateString;
      this.GetData("land", "ocean", this.fromDate, this.toDate);
      console.log(this.fromDate, "this.fromDate");
      console.log(this.toDate, "this.toDate");
      // this.GetCarbonSinkDataLineChart('all', ['Ocean', 'Land'], this.fromDate, this.toDate)
    },
    onChangeEnd(value, dateString) {
      this.toDate = dateString;
      this.GetData("land", "ocean", this.fromDate, this.toDate);
      this.GetCarbonSinkDataLineChart(
        "all",
        ["Ocean", "Land"],
        this.fromDate,
        this.toDate
      );
    },
    /**
     * 选择时间option中的
     */
    Start(time) {
      this.fromDate = time;
      this.toDate = time;
      this.getDateBytime();
    },
    End(time) {
      this.toDate = time;
      this.getDateBytime();
    },
    getDateBytime() {
      let _this = this;
      if (this.typemap == 0) {
        console.log(this.fromDate, "this.fromDate");
        console.log(this.toDate, "this.toDate");
        this.GetData("land", "ocean", this.fromDate, this.toDate);
      } else if (this.typemap == 1) {
        //land
        // this.GetCarbonSinkDataLineChart('land', ['CHN', 'USA'], this.fromDate, this.toDate)
        this.GetCarbonSinkDataGridChart(
          "land",
          this.fromDate,
          this.toDate
        ).then((res) => {
          _this.worldList = res;
        });
      } else if (this.typemap == 2) {
        //ocean
        this.GetCarbonSinkDataGridChart(
          "ocean",
          this.fromDate,
          this.toDate
        ).then((res) => {
          _this.worldList = res;
        });
      }
    },
    /**
     * 时间选择禁用时间
     */
    disabledDateStart(current) {
      return current && current < moment(this.from_Date, this.dateFormat);
    },
    // disabledDateEnd (current) {
    //   return current && current > moment(this.to_Date, this.dateFormat);
    // },
    landOption(flag) {
      this.landoptionFlag = flag;
      this.resize = true;
    },
    oceanOption(flag) {
      this.oceanoptionFlag = flag;
    },
    setOption(param) {
      console.log(param, "param");
      this[param + "optionFlag"] = true;
      this.resize = false;
    },
    changeData(param) {
      this.linedataflag = param;
      if (param == "1") {
        this.setChartLinde(this.chartObj, "val");
      } else {
        this.setChartLinde(this.chartObj, "rate");
      }
    },
    selectMap() {
      this.selectBtn = 1;
      (this.map = false), (this.chart = false);
      this.gifurl = this.Landmap;
      this.images = [tab1_land1, tab1_land2];
      this.imagesDetails = this.Tab1Land;
    },
    selectChart() {
      this.selectBtn = 2;
      (this.map = false), (this.chart = false);
      this.gifurl = this.Landchart;
      this.images = [tab2_land1, tab2_land2, tab2_land3, tab2_land4];
      this.imagesDetails = this.Tab2Land;
      // this.setMenu(
      //   "chart",
      //   this.chartlist.find((item) => item.key === this.report)
      // );
    },
    mapDis() {
      if (this.selectBtn == 1) {
        this.map = !this.map;
        console.log(this.map, "this.map");
      }
    },
    chartDis() {
      if (this.selectBtn == 2) {
        this.chart = !this.chart;
      }
    },
    setMenu(type, item) {
      let _this = this;
      this["type" + type] = item.key;
      this["name" + type] = item.name;
      this[type] = false;
      console.log(typeof item.key, "item");
      if (type === "map") {
        this.gifurl = item.key === 1 ? this.Landmap : this.Oceanmap;
        this.images =
          item.key === 1
            ? [tab1_land1, tab1_land1]
            : [tab1_ocean1, tab1_ocean2];
        this.imagesDetails = item.key === 0 ? this.Tab1Land : this.Tab1Ocean;
      }
      if (type === "chart") {
        console.log(item.key, "item.key");
        this.gifurl = item.key === 1 ? this.Oceanchart : this.Landchart;
        this.images =
          item.key === 0
            ? [tab2_land1, tab2_land2, tab2_land3, tab2_land4]
            : [tab2_ocean1, tab2_ocean2, tab2_ocean3, tab2_ocean4];
        this.imagesDetails = item.key === 0 ? this.Tab2Land : this.Tab2Ocean;
      }
    },
    /**
     * Search
     */
    filterLandDate(val) {
      let arr = [];
      this.landAllArr.forEach((item, index) => {
        if (item.includes(val)) {
          arr.push(item);
        }
      });
      if (val) {
        this.filterLandArr(arr);
      } else {
        this.filterLandArr(this.landAllArr);
      }
    },
    filterOceanDate(val) {
      let arr = [];
      this.oceanAllArr.forEach((item, index) => {
        console.log(item, "item");
        if (item.includes(val)) {
          arr.push(item);
        }
      });
      if (val) {
        this.filterOceanArr(arr);
      } else {
        this.filterOceanArr(this.oceanAllArr);
      }
    },
    /**
     * reset
     */
    resetLand() {
      let _this = this;
      this.fromDate = "1985-01";
      this.toDate = "1985-01";
      this.GetCountryTable();
      this.GetCarbonSinkDataLineChart(
        "land",
        ["CHN", "USA"],
        this.fromDate,
        this.toDate
      );
      this.GetCarbonSinkDataGridChart("land", this.fromDate, this.toDate).then(
        (res) => {
          _this.worldList = res;
        }
      );
    },
    resetOcean() {
      this.fromDate = "1985-01";
      this.toDate = "1985-01";
      this.GetOceanTable();
      this.GetCarbonSinkDataGridChart("ocean", this.fromDate, this.toDate).then(
        (res) => {
          _this.worldList = res;
        }
      );
    },
    toemission() {
      this.$router.push("/carbonemission");
    },
    tosink() {
      // this.$router.push('/carbonsink')
    },
    tohome() {
      this.$router.push("/carbonhome");
    },
    toaboutus() {
      this.$router.push("/aboutus");
    },
  },
};
</script>
<style scoped lang="scss">
.sinkheader {
  height: 100%;
  height: 100%;
  border-bottom: 1px solid #3d342f;
}
.land-line {
  display: flex;
  // align-items: center;
  div:last-child {
    width: 100%;
  }
}
.sinkdata {
  width: 100%;
  // padding: 0 5.289%;
  margin: 40px auto 72px;
  max-width: 1464px;
  padding: 0 40px;
  .sinktitle {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    span:first-child {
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      color: #000000;
    }
    span:last-child {
      font-size: 16px;
      line-height: 24px;
      color: #666666;
    }
  }
  .sinkcontent {
    font-size: 16px;
    line-height: 24px;
    color: #2e2e2e;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .sinkbtn {
    display: flex;
    .chart {
      margin-left: 32px;
    }
    .map,
    .chart {
      display: flex;
      position: relative;
      .btn_left {
        width: 112px;
        padding-left: 16px;
        border-radius: 2px 0 0 2px;
      }
      .btn_right {
        width: 60px;
        margin: 0 auto;
        // padding-left: 16px;
        border-radius: 0 2px 2px 0;
        font-weight: normal;
        font-size: 12px;
        justify-content: center;
        img {
          margin-left: 7px;
        }
        &:hover {
          // background:#30424A;
          // border: 1px solid #283941;
          background: #5e483a;
          border: 1px solid #5e483a;
        }
      }
      .right:hover {
        background: #f5f5f5;
        border: 1px solid #dfdfdf;
      }
    }
    .selected {
      // background: #33464F;
      // border: 1px solid #283941;
      background: #5e483a;
      // border: 1px solid #5e483a;
      border: 1px solid #4f3c30;

      color: #ffffff;
    }
    .unselected {
      background: #f9f9f9;
      border: 1px solid #dfdfdf;
      color: #727272;
      .btn_left {
        opacity: 0.5;
      }
    }
    .btn {
      box-sizing: border-box;
      display: inline-block;
      height: 32px;
      box-sizing: border-box;
      line-height: 28px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      // justify-content: center;
      align-items: center;
    }

    .menu {
      position: absolute;
      z-index: 1000;
      left: 0;
      top: 32px;
      width: 172px;
      // height:96px;
      border: 1px solid #dfdfdf;
      border-top: none;
      background-color: #fff;
      color: #000000;
      button {
        padding-left: 16px;
        text-align: left;
      }
      button:hover {
        background: #f9f9f9;
      }
      > button {
        font-size: 12px;
        height: 32px;
        width: 100%;
        line-height: 32px;
      }
      .menuseleted {
        color: #000000;
        background: #f9f9f9;
      }
    }
  }
  .bingmap {
    box-sizing: border-box;
    border: 1px solid #859095;
    // height: 751px;
    height: 776px;
    margin-top: 20px;
    position: relative;
    .slider {
      width: 100%;
      height: 100px;
      border: 1px solid black;
    }
    // .calendarbtn {
    //   width: 41.97px;
    //   height: 42px;
    //   background: #2b3b42;
    //   border-radius: 4px;
    //   position: absolute;
    //   top: 425px;
    //   right: 25px;
    //   display: flex;
    //   z-index: 100;
    //   justify-content: center;
    //   align-items: center;
    // }
    // .time {
    //   display: flex;
    //   position: absolute;
    //   top: 317px;
    //   right: 25px;
    //   width: 162px;
    //   height: 93.3px;
    //   background: #343636;
    //   border-radius: 4px;
    //   padding: 12px 24px 0;
    //   .start,
    //   .end {
    //     width: 100%;
    //     color: #ffffff;
    //     div:first-child {
    //       margin-bottom: 6px;
    //       color: #999999;
    //       font-size: 12px;
    //     }
    //   }
    // }
    // .triangle {
    //   position: absolute;
    //   top: 398px;
    //   right: 37px;
    //   background: #343636;
    //   width: 20px;
    //   height: 20px;
    //   transform: rotate(45deg);
    // }

    .hidden {
      padding: 16px 17px 0 7px;
      border: 1px solid #859095;
      border-right: none;
      .back {
        width: 24px;
        height: 24px;
        background: #f5f5f5;
        border-radius: 50%;
        text-align: center;
        line-height: 24px;
        margin-bottom: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .text-box {
    margin-top: 25px;
    margin-bottom: 25px;
    font-size: 18px;
    line-height: 27px;
    position: relative;
    .morebtn {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    button {
      cursor: pointer;
      border-bottom: 1px solid #000000;
    }
  }
  .hiddenintro {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    position: relative;
  }
  .hiddenintro::after {
    content: "... ";
    width: 120px;
    height: 30px;
    position: absolute;
    bottom: -4px;
    right: 0;
    background-color: #fff;
  }
  .visibleintro {
    overflow: visible;
  }
}
.powerbi_gif {
  // border: 1px solid red;
  margin: -20px auto 72px;
  height: 810px;
  max-width: 1464px;
  padding: 0 40px;
  background-color: #fff;
  text-align: center;
  height: auto;
  img {
    width: 100%;
    // border:1px solid green;
  }
}
.bigTitle {
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-transform: capitalize;
  color: #000000;
  margin: 19px auto 72px;
  max-width: 1464px;
  padding: 0 40px;
}
.mark {
  text-align: right;
  font-size: 14px;
  color: #666666;
  margin-top: 22px;
  a {
    color: #1273ce;
  }
}
.imgbox {
  margin: 0 auto;
  // height: 810px;
  max-width: 1464px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  margin-bottom: 120px;
  > div {
    margin-bottom: 64px;
    > div:first-child {
      width: 322px;
      height: 210px;
      border: 6px solid #f8f8f8;
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
  .title {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    width: 314px;
    margin-top: 24px;
  }
  .tips {
    font-size: 18px;
    line-height: 27px;
    width: 314px;
    margin-top: 12px;
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
// /deep/ .worldmap .ant-input {
//   background: rgba($color: #000000, $alpha: 0.4) !important;
//   color: #d3d3d3 !important;
//   font-size: 14px !important;
// }
// /deep/ .worldmap .ant-calendar-picker-icon {
//   color: #ffffff !important;
// }
// /deep/ .worldmap .ant-calendar-picker-input::-webkit-input-placeholder {
//   font-size: 14px !important;
// }
// /deep/ .worldmap .calendarbtn .anticon {
//   color: #ffffff !important;
//   font-size: 26px !important;
// }
@media screen and (max-width: 639px) {
  .sinkdata {
    padding: 0 24px;
    .sinktitle span:last-child {
      margin-top: 6px;
    }
    .morebtn {
      display: none;
    }
    // .text-box{
    //   .text-content{
    //     overflow: visible;
    //     text-overflow: clip;
    //     max-height: 100%;
    //     line-height: 27px;
    //     .tips,.label-tips{
    //       display: none;
    //     }
    //   }
    // }
    .sinkbtn {
      display: flex;
      // justify-content: space-between;
      justify-content: start;
      height: auto;
      .map {
        margin-right: 30px;
      }
      .map,
      .chart {
        .btn_left {
          width: 95px;
        }
        .menu {
          width: 155px;
        }
      }
      .chart {
        margin-left: 0;
      }
    }
    .oceanmap {
      height: 240px;
    }
    .Landmap {
      height: 1000px;
      border: 1px solid #859095;
      .right {
        border: none;
        > div:first-child {
          height: 240px;
        }
        > div:last-child {
          height: 100%;
        }
      }
    }
    .land-line {
      // border: 1px solid #859095;
      // height: 100%;
      // border: 1px solid red;
      width: 100%;
      flex-wrap: wrap;
      flex-direction: column-reverse;
      > div {
        width: 100%;
      }
      > div:last-child() {
      }
    }
  }
  .powerbi {
    height: 272px;
    margin: 19px 5.289% 72px 5.289%;
    .powerbi-container {
      height: 272px;
    }
  }
}
.bottom {
  width: 100%;
  // border: 1px solid red;
  background: #f9f9f9;
  padding: 5.6% 9.9% 0;
  // height: 405px;
}
</style>
