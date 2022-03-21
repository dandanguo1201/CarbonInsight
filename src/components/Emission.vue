<template>
  <div class="emission">
    <div class="toptitle">
      <div>Carbon Emission</div>
      <div>
        How much carbon is emitted from different continents and sources?
      </div>
      <div class="word">
        <button @click="toJump">
          Explore carbon emission data<img src="../assets/icon_go.svg" alt="" />
        </button>
      </div>
    </div>
    <div class="linebox w100">
      <div class="selectDiv">
        <div class="select selectTop">
          <button class="region" @click="selectRegion">
            <div class="select1">
              <div class="name">
                <div>Region</div>
                <div>{{ nameregion }}</div>
              </div>
              <div class="icon">
                <img :src="region ? up : down" alt="" />
              </div>
            </div>
            <div class="menu" v-if="region">
              <button
                :class="typeregion == index ? 'menuseleted' : ''"
                v-for="(item, index) in regionlist"
                :key="index"
                @click.stop="setMenu('region', item)"
              >
                {{ item.name }}
              </button>
            </div>
          </button>
          <button class="sector" @click="selectSector">
            <div class="select2">
              <div class="name">
                <div>Sector</div>
                <div>{{ namesector }}</div>
              </div>
              <div class="icon">
                <img :src="sector ? up : down" alt="" />
              </div>
            </div>
            <div class="menu menusector" v-if="sector">
              <button
                :class="typesector == index ? 'menuseleted' : ''"
                v-for="(item, index) in sectorlist"
                :key="index"
                @click.stop="setMenu('sector', item)"
              >
                {{ item.name }}
              </button>
            </div>
          </button>
        </div>
      </div>
      <div class="linechart linechartwidth">
        <div class="title">
          <div>Daily Estimates of Continent-Level CO2 Emissions</div>
          <div>
            <button @click="selectType(1)">
              <img
                :src="
                  selected === 2
                    ? require('../assets/btn_line_sel.svg')
                    : require('../assets/btn_line_default.svg')
                "
                alt=""
              />
            </button>
            <button @click="selectType(2)">
              <img
                :src="
                  selected === 1
                    ? require('../assets/btn_area_sel.svg')
                    : require('../assets/btn_area_default.svg')
                "
                alt=""
              />
            </button>
          </div>
        </div>
        <div class="chartboxwidth">
          <Chart :chartLine="chartLine" :resize="resize" :max="max" />
        </div>
        <div class="tips">
          Liu, Z., Ciais, P., Deng, Z. et al. Carbon Monitor, a near-real-time
          daily dataset of global CO2 emission from fossil fuel and cement
          production. Sci Data 7, 392 (2020).
        </div>
        <div class="line"></div>
        <div class="tooltips" v-for="(item, index) in tipslist" :key="index">
          <span :style="{ backgroundColor: item.color }"></span>
          <span>{{ item.region }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import single from "../../public/charts.json";
import world from "../../public/world.json";
import sector from "../../public/sector.json";
import all from "../../public/all.json";

import Slider from "../components/Slider.vue";
import Chart from "../components/Chart.vue";
import up from "@/assets/up.svg";
import down from "@/assets/down.svg";
export default {
  name: "About",
  components: {
    Slider,
    Chart,
  },
  props: ["height"],
  data() {
    return {
      up,
      down,
      regionlist: [
        { name: "World", key: 0 },
        { name: "Africa", key: 1 },
        { name: "Asia", key: 2 },
        { name: "Europe", key: 3 },
        { name: "Oceania", key: 4 },
        { name: "Americas", key: 5 },
      ],
      sectorlist: [
        { name: "All", key: 0 },
        { name: "Domestic Aviation", key: 1 },
        { name: "Ground Transport", key: 2 },
        { name: "Industry", key: 3 },
        { name: "Power", key: 4 },
        { name: "Residential", key: 5 },
      ],
      tipslist: [
        { color: "#754EC3", region: "Africa" },
        { color: "#197278", region: "Asia" },
        { color: "#DAB300", region: "Europe" },
        { color: "#E56C37", region: "North America" },
        { color: "#118DFF", region: "South America" },
        { color: "#D94452", region: "World" },
      ],
      selected: 1,
      typeregion: 0,
      typesector: 0,
      nameregion: "World",
      namesector: "All",
      region: false,
      sector: false,
      singleArr: [],
      worldArr: [],
      sectorArr: [],
      allArr: [],
      chartLine: [], //折线图的data
      resize: false,
      flag: true,
      max: 3500,
    };
  },
  mounted() {
    this.singleArr = JSON.parse(JSON.stringify(single));
    this.worldArr = JSON.parse(JSON.stringify(world));
    this.sectorArr = JSON.parse(JSON.stringify(sector));
    this.allArr = JSON.parse(JSON.stringify(all));
    this.$nextTick(() => {
      let arr = [];
      let line0 = this.getAllAll();
      let line1 = this.getAllSector("Europe");
      let line2 = this.getAllSector("Asia");
      let line3 = this.getAllSector("Africa");
      let line4 = this.getAllSector("Oceania");
      let line5 = this.getAllSector("Americas");
      this.chartLine = arr.concat(line5, line4, line3, line2, line1, line0);
    });
  },
  methods: {
    getAll(Continent, Sector) {
      let arr = [];
      this.singleArr.forEach((item, index) => {
        if (item.Continent == Continent && item.Sector == Sector) {
          arr.push(item);
        }
      });
      if (!arr) return [];
      let sortArr = this.sortBytime(arr);
      return this.getObj(sortArr, Continent);
    },
    getAllWorld(Sector) {
      let arr = [];
      this.worldArr.forEach((item, index) => {
        if (item.Sector == Sector) {
          arr.push(item);
        }
      });
      let sortArr = this.sortBytime(arr);
      return this.getObj(sortArr, "World");
    },
    getAllSector(Continent) {
      let arr = [];
      this.sectorArr.forEach((item, index) => {
        if (item.Continent == Continent) {
          arr.push(item);
        }
      });
      let sortArr = this.sortBytime(arr);
      return this.getObj(sortArr, Continent);
    },
    getAllAll() {
      let sortArr = this.sortBytime(this.allArr);
      return this.getObj(sortArr, "World");
    },
    sortBytime(arr) {
      return arr.sort((a, b) => {
        return a.Time - b.Time;
      });
    },
    getObj(sortArr, Continent) {
      let line = [];
      let data = [];
      let obj = new Object();
      let color = this.getcolor(Continent);
      sortArr.forEach((item, index) => {
        data.push(Number(item.Value).toFixed(2));
      });
      obj.name = Continent;
      obj.type = "line";
      obj.color = color[1];
      obj.symbol = "none";

      if (this.selected === 2) {
        obj.stack = "总量"; //堆积折线图显示总量
        obj.areaStyle = {
          normal: {
            color: color[0], //改变区域颜色
          },
        };
      }
      obj.itemStyle = {
        normal: {
          // color:color, //改变折线点的颜色
          lineStyle: {
            color: color[1], //改变折线颜色
          },
        },
      };
      obj.data = data;
      line.push(obj);
      return line;
    },
    getcolor(Continent) {
      let color = "";
      let linecolor = "";
      switch (Continent) {
        case "World":
          linecolor = "#D4474F";
          color = "rgba(212, 71, 79, 0.2)";
          break;
        case "Africa":
          linecolor = "#118DFF";
          color = "rgba(17, 141, 255, 0.2)";
          break;
        case "Asia":
          linecolor = "#754EC3";
          color = "rgba(117, 78, 195, 0.2)";
          break;
        case "Europe":
          linecolor = "#DAB300";
          color = "rgba(218, 179, 0, 0.2)";
          break;
        case "Oceania":
          linecolor = "#E56C37";
          color = "rgba(229, 108, 55, 0.2)";
          break;
        case "Americas":
          linecolor = "#197278";
          color = "rgba(25, 114, 120, 0.2)";
          break;
      }
      return [color, linecolor];
    },

    getlinedata() {
      if (this.nameregion != "World" && this.namesector != "All") {
        this.chartLine = [];
        let arr = [];
        let line = this.getAll(this.nameregion, this.namesector);
        this.max = 1000;
        this.chartLine = arr.concat(line);
      } else if (this.nameregion == "World" && this.namesector != "All") {
        this.chartLine = [];
        let arr = [];
        let line0 = this.getAllWorld(this.namesector);
        let line1 = this.getAll("Europe", this.namesector);
        let line2 = this.getAll("Asia", this.namesector);
        let line3 = this.getAll("Africa", this.namesector);
        let line4 = this.getAll("Oceania", this.namesector);
        let line5 = this.getAll("Americas", this.namesector);
        this.max = 1500;
        if (this.selected === 2) this.max = 3000;
        this.chartLine = arr.concat(line5, line4, line3, line2, line1, line0);
      } else if (this.nameregion == "World" && this.namesector == "All") {
        this.chartLine = [];
        let arr = [];
        let line0 = this.getAllAll();
        let line1 = this.getAllSector("Europe");
        let line2 = this.getAllSector("Asia");
        let line3 = this.getAllSector("Africa");
        let line4 = this.getAllSector("Oceania");
        let line5 = this.getAllSector("Americas");
        this.max = 3500;
        if (this.selected === 2) this.max = 7000;
        this.chartLine = arr.concat(line5, line4, line3, line2, line1, line0);
      } else if (this.nameregion != "World" && this.namesector == "All") {
        this.chartLine = [];
        let arr = [];
        let line = this.getAllSector(this.nameregion);
        this.max = 2000;
        this.chartLine = arr.concat(line);
      }
    },
    setMenu(type, item) {
      let _this = this;
      this["type" + type] = item.key;
      this["name" + type] = item.name;
      this.sector = false;
      this.region = false;
      this.getlinedata();
    },
    selectRegion() {
      this.region = !this.region;
      this.sector = false;
    },
    selectSector() {
      this.sector = !this.sector;
      this.region = false;
    },
    goEmission() {
      this.$emit("toemission", "1");
    },
    openChart() {
      this.flag = false;
      this.resize = true;
      this.region = false;
      this.sector = false;
    },
    closeChart() {
      this.flag = true;
      this.resize = false;
      this.region = false;
      this.sector = false;
    },
    mouseOver() {
      if (this.selected === 1) {
        this.src = require("../assets/btn_area_default.svg");
      }
    },
    selectType(param) {
      this.selected = param;
      this.getlinedata();
    },
    toJump() {
      this.$router.push("/carbonemission/1");
    },
  },
};
</script>
<style scoped lang="scss">
.emission {
  margin: 0 auto;
  max-width: 1464px;
  padding: 0 40px;
  .toptitle {
    padding-top: 120px;
    max-width: 744px;
    color: #000;
    div:nth-child(1) {
      font-size: 18px;
      line-height: 16px;
    }
    div:nth-child(2) {
      font-weight: bold;
      font-size: 46px;
      line-height: 54px;
      margin-top: 18px;
      word-wrap: break-word;
    }
    div:nth-child(3) {
      margin-top: 27px;
      position: relative;
      button {
        font-weight: bold;
        font-size: 16px;
        line-height: 27px;
        display: flex;
        align-items: center;
        text-align: justify;
        color: #137759;
        // margin-top: 44px;
        cursor: pointer;
        img {
          margin-left: 8px;
        }
      }
    }
  }
  .menu {
    // width: 357px;
    width: 100%;
    position: absolute;
    top: 62px;
    left: 0;
    border: 1px solid #000;
    border-top: none;
    background-color: #fff;
    z-index: 10;
    button:hover {
      background: #f9f9f9;
    }
    > button {
      padding-left: 16px;
      font-size: 12px;
      height: 48px;
      width: 100%;
      text-align: left;
      line-height: 48px;
    }
    .menuseleted {
      color: #000;
      background: #f9f9f9;
    }
  }
  .menubottom {
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
    button:hover {
      background: #f9f9f9;
    }
    > button {
      display: block;
      padding-left: 16px;
      font-size: 12px;
      height: 48px;
      width: 100%;
      text-align: left;
      // width: 338px;
      line-height: 48px;
    }
    .menuseleted {
      color: #000;
      background: #f9f9f9;
    }
  }
  .menusector {
    width: 100.3%;
    left: -1px;
  }
  .linebox {
    margin-top: 64px;
    padding-bottom: 120px;
    .select {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      white-space: wrap;
      .region,
      .sector {
        box-sizing: border-box;
        height: 64px;
        width: 50%;
        position: relative;
      }
    }
    .select .select1,
    .select2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      .name {
        > div:first-child {
          font-style: 12px;
          color: #666666;
          margin-top: 5px;
        }
        > div:last-child {
          font-weight: 600;
          font-size: 18px;
          color: #000;
        }
      }
      .icon {
        width: 28px;
        height: 28px;
        text-align: center;
        line-height: 28px;
      }
    }
    .select1,
    .select2 {
      height: 64px;
      border: 1px solid #000;
      box-sizing: border-box;
      padding: 0 20px;
    }
    .select1 {
      border-radius: 4px 0px 0px 4px;
    }
    .select2 {
      border-radius: 0px 4px 4px 0px;
      border-left: none;
    }
    .selectDiv {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .selectTop {
        width: 58%;
      }
    }
    .w100 {
      width: 100%;
      // height: 100%;
    }
  }
  .linechart {
    width: 100%;
    margin-top: -20px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    .charttitle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 20px;
      margin: 0 33px 20px 60px;
      justify-content: space-between;

      color: #000;
      height: 100%;
      > div:first-child {
        font-weight: bold;
        font-size: 18px;
      }
      > div:last-child {
        font-size: 14px;
      }
    }
    .chartbox {
      width: 100%;
      height: 300px !important;
      margin-top: 30px;
    }
    .chartboxwidth {
      width: 100%;
      margin-top: 40px;
      height: 502px;
    }
  }
  .linechartwidth {
    width: 100%;
    margin-top: 30px;
    .title {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 33px;
      div:first-child {
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        margin-left: 32px;
      }
      div:last-child {
        margin-right: 33px;
        button {
          cursor: pointer;
        }
        button:first-child:hover img {
          content: url(../assets/btn_line_hover.svg);
        }
        button:last-child:hover img {
          content: url(../assets/btn_area_hover.svg);
        }
      }
    }
    .tips {
      text-align: right;
      margin-top: 12px;
      font-size: 12px;
      line-height: 20px;
      color: #666666;
      margin-right: 33px;
    }
    .line {
      margin: 20px 33px 0;
      border: 1px solid #e6e6e6;
    }
    .tooltips {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      display: inline-block;
      line-height: 58px;
      span:first-child {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-left: 32px;
        margin-right: 12px;
      }
      span:last-child {
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
        color: #000000;
      }
    }
  }
  .w100 {
    width: 100%;
  }
}
@media screen and (max-width: 1440px) {
  .emission {
    .toptitle {
      padding-top: 88px;
    }
    .linebox {
      padding-bottom: 56px;
    }
  }
}
@media screen and (max-width: 639px) {
  .emission {
    padding: 0 20px;
    .toptitle {
      div:nth-child(1) {
        font-size: 16px;
        line-height: 14px;
      }
      div:nth-child(2) {
        font-size: 34px;
        line-height: 36px;
        margin-top: 16px;
      }
    }
    .linechart .chartboxwidth {
      // height: 308px;
      height: 260px;
    }
    .linechartwidth {
      .title {
        div:first-child {
          margin: 0 26px;
          font-size: 18px;
          line-height: 24px;
        }
        div:last-child {
          margin-left: 26px;
          margin-top: 28px;
        }
      }
      .tooltips {
        line-height: 40px;
      }
      .tips {
        margin: 0;
        padding: 0 20px;
      }
    }
    // .linebox {
    //   padding-bottom: 56px;
    // }
    // .chart .linebox {
    //   flex-wrap: wrap;
    //   flex-direction: column-reverse;
    //   .left {
    //     width: 100%;
    //     .charttitle {
    //       position: relative;
    //       margin: 0 10px;
    //       div:nth-child(1) {
    //         font-size: 18px;
    //         font-weight: bold;
    //         font-size: 16px;
    //       }
    //       div:nth-child(2) {
    //         display: none;
    //       }
    //     }
    //     .select .region .select1 .name > div:first-child,
    //     .select .sector .select2 .name > div:first-child {
    //       font-size: 14px;
    //     }
    //     .select .region .select1 .name > div:last-child,
    //     .select .sector .select2 .name > div:last-child {
    //       font-size: 16px;
    //       line-height: 16px;
    //       margin-top: 4px;
    //     }
    //     .select .region .select1 .icon,
    //     .select .sector .select2 .icon {
    //       width: 20px;
    //       height: 20px;
    //       line-height: 20px;
    //     }
    //   }
    // }
  }
}
// }
</style>
