<template>
  <div class="world_map" aria-label="world_map">
    <div id="myMap"></div>
    <img class="datalogo" src="../assets/datalogo.png" alt="" />
    <button class="calendarbtn" @click="timeFlag = !timeFlag" id="time" aria-label="time" >
      <a-icon type="calendar" aria-label="calendar"/>
      <!-- <img src="../assets/timeBtn.png" alt="" /> -->
    </button>
    <div class="time" v-show="timeFlag" >
      <div class="start">
        <div>Select Time</div>
        <a-month-picker
          placeholder="Select"
          aria-label="month"
          :allowClear="clear"
          :disabled-date="disabledDateStart"
          v-model="from"
          @change="onChangeStart"
        />
      </div>
      <!-- <div class="end">
            <div>End Time</div>
            <a-month-picker placeholder="Select"
                            v-model="to"
                            :disabled-date="disabledDateEnd"
                            @change="onChangeEnd" />
          </div> -->
    </div>
    <div class="triangle" v-show="timeFlag"></div>
    <div class="legend">
      <!-- <img :src="type == 0? imgland : imgocean" alt="" /> -->
      <img v-if="type == 0" src="../assets/land.png" alt="" />
      <img v-else src="../assets/Legend-ocean.svg" alt="" />
    </div>
  </div>
</template>

<script>
import bingMap from "../request/bing-map.js";
import API from "@/request/api";
import moment from "moment";

let map;
let heatGradientData;
export default {
  name: "WorldMap",
  props: ["worldList", "l", "r", "zoom", "min", "max", "fromDate", "toDate","type"],
  data() {
    return {
      timeFlag: false,
      dateFormat: "YYYY-MM",
      from_Date: '',
      to_Date: '',
      clear: false,
      // zoom: 1,
      // l: 39.4,
      // r: 116.20,
    };
  },
  mounted() {
    this.timeFlag = false
    this.from_Date = this.fromDate
    this.to_Date = this.toDate
  },
  watch: {
    worldList: {
      handler(newval, oldVal) {
        // console.log(newval,'newval')
        // console.log(oldVal,'oldVal')
        if (newval != oldVal) {
          let _this = this;
          bingMap.init().then((Microsoft) => {
            _this.GetMap(newval);
          });
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
    },
  },
  computed: {
    from() {
      return moment(this.fromDate, "YYYY-MM");
    },
  },
  methods: {
    LoadData(data) {
      this.GetMap();
    },
    GetMap(data) {
      let _this = this;
      map = new Microsoft.Maps.Map("#myMap", {
        center: new Microsoft.Maps.Location(_this.l, _this.r),
        zoom: 3,
      });
      const sector = data.length > 20000 ? 0 : 1;
      this.createHeatGradient(sector);
      Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", function () {
        var minValue = [150, -1e-7][sector];
        var maxValue = [600, 1e-7][sector];
        data = data.map((line) => {
          let lon = parseFloat(line[1]);
          let lat = parseFloat(line[0]);
          let val = parseFloat(line[2]);
          // if (val > maxValue) maxValue = val;
          // if (val < minValue) minValue = val;
          return [lon, lat, val];
        });
        data.forEach((line) => {
          var polygon = Microsoft.Maps.SpatialMath.locationRectToPolygon(
            new Microsoft.Maps.LocationRect(
              new Microsoft.Maps.Location(line[0], line[1]),
              1,
              1
            )
          );
          polygon.setOptions({
            strokeThickness: 0,
            fillColor: _this.getLegendColor(line[2], minValue, maxValue),
          });
          // polygon.setOptions({strokeThickness: 0, fillColor: _this.getLegendColor(line[2], _this.min, _this.max)});
          map.entities.push(polygon);
        });
      });
    },
    createHeatGradient(sector) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      //Create a linear gradient for the legend.
      var colorGradient = sector === 0 ? {  //#EFF3FF #BEE7FE #79CDFD #5BB2FC #428AFC #0F5ED9 #0541A1
        0: "#EFF3FF",
        0.17: "#BEE7FE",
        0.33: "#79CDFD",
        0.5: "#5BB2FC",
        0.67: "#428AFC",
        0.83: "#0F5ED9",
        1: "#0541A1",
      } : {  //#A30625 #D61A35 #FD795C #FFFFEB #27A764 #1A8A3E #005824
        0: "#A30625",
        0.17: "#D61A35",
        0.33: "#FD795C",
        0.5: "#FFFFEB",
        0.67: "#27A764",
        0.83: "#1A8A3E",
        1: "#005824",
      }

      var grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
      for (var c in colorGradient) {
        grd.addColorStop(c, colorGradient[c]);
      }
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, 1);

      //Store the pixel information from the legend.
      heatGradientData = ctx.getImageData(0, 0, canvas.width, 1);
    },
    getLegendColor(value, minValue, maxValue) {
      value = Math.max(value, minValue);
      value = Math.min(value, maxValue);

      //Calculate the pixel data index from the ratio of value/maxValue.
      var idx = Math.floor(
        ((value - minValue) / (maxValue - minValue)) * heatGradientData.width
      );
      idx = Math.max(idx, 0);
      idx = Math.min(idx, heatGradientData.width - 1);
      idx = idx * 4;

      //Create an RGBA color from the pixel data at the calculated index.
      return (
        "rgba(" +
        heatGradientData.data[idx] +
        "," +
        heatGradientData.data[idx + 1] +
        "," +
        heatGradientData.data[idx + 2] +
        "," +
        "0.8)"
      );
    },
    onChangeStart(value, dateString) {
      this.$emit("start", dateString);
    },
    disabledDateStart(current) {
      // Can not select days before today and today
      return current && current < moment(this.from_Date, this.dateFormat);
    },
  },
};
</script>

<style lang="scss" scoped>
.world_map {
  width: 100%;
  height: 100%;
  position: relative;
  // border: 1px solid #fff;
  .datalogo {
    position: absolute;
    bottom: 5px;
    left: 60px;
    width: 26px;
    height: 24px;
  }
  .calendarbtn {
    width: 42px;
    height: 42px;
    background: #5e483a;
    border-radius: 4px;
    position: absolute;
    bottom: 35px;
    right: 25px;
    display: flex;
    z-index: 100;
    justify-content: center;
    align-items: center;
  }
  .time {
    display: flex;
    position: absolute;
    bottom: 90px;
    right: 25px;
    width: 162px;
    height: 93.3px;
    background: #5e483a;
    border-radius: 4px;
    padding: 12px 24px 0;
    .start,
    .end {
      width: 100%;
      color: #ffffff;
      div:first-child {
        margin-bottom: 6px;
        color: #999999;
        font-size: 12px;
      }
    }
  }
  .triangle {
    position: absolute;
    bottom: 86px;
    right: 37px;
    background: #5e483a;
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
  }
  .yinyong{
    font-size: 10px;
    margin-left: 10px;
  }
  .legend{
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
  }
  @media screen and (max-width: 639px) {
    .legend img{
      width: 40%;
      height: 40%;
    }
    .calendarbtn{
      width: 35px;
      height: 35px;
      bottom: 12px;
      right: 18px;
      i{

      }
    }
    .time{
      right: 18px;
      bottom: 50px;
      z-index: 100000;
    }
    .triangle {
      right: 26px;
      bottom: 50px;
    }
    /deep/  .calendarbtn  .anticon {
      color: #ffffff !important;
      font-size: 20px !important;
    }
  }
}
#myMap {
  width: 100%;
  height: 100%;
}
/deep/ .ant-input {
  background: rgba($color: #5e483a, $alpha: 0.4) !important;
  color: #d3d3d3 !important;
  font-size: 14px !important;
}
/deep/ .ant-calendar-picker-icon {
  color: #ffffff !important;
}
/deep/ .ant-calendar-picker-input::-webkit-input-placeholder {
  font-size: 14px !important;
}
/deep/  .calendarbtn  .anticon {
  color: #ffffff !important;
  font-size: 26px !important;
}

</style>
