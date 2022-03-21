<template>
  <div class="line_chart">
    <div id="myChart" v-show="!flag" ref="myChart"></div>
    <div v-show="flag" class="empty">
      <a-empty
        :image="simpleImage"
        :image-style="{
          height: '60px',
        }"
      >
        <span slot="description">No data available</span>
      </a-empty>
    </div>
  </div>
</template>
<script>
import { Empty } from "ant-design-vue";

export default {
  name: "Chart",
  props: ["chartLine", "resize", "max"],
  data() {
    return {
      screenWidth: document.body.clientWidth,
      flag: false,
    };
  },
  watch: {
    timeData: {
      handler(newval, oldVal) {
        if (newval != oldVal) {
          this.drawLine();
        }
      },
      immediate: true,
    },
    chartLine: {
      handler(newval, oldVal) {
        if (newval != oldVal) {
          this.drawLine();
        }
      },
      immediate: true,
    },
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
  mounted() {
    const that = this;
    let myChart = this.$echarts.init(document.getElementById("myChart"));
    window.addEventListener("resize", () => {
      myChart.resize();
    });
    this.drawLine();
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // type: 'cross',
            type: "line",
          },
          extraCssText: "padding-bottom:0",
          formatter: function (params) {
            let rez = "<p>" + params[0].axisValue + "</p>";
            let newParams = [];
            let tooltipString = [];
            newParams = [...params];
            var colorSpan = (color) =>
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
              color +
              '"></span>';
            newParams.sort((a, b) => {
              return b.value - a.value;
            });
            newParams.forEach((p) => {
              const cont =
                "<p>" +
                colorSpan(p.color) +
                " " +
                p.seriesName +
                ": " +
                p.data +
                "</p>";
              rez += cont;
              tooltipString.push(cont);
            });
            return rez;
          },
        },
        grid: {
          top: "3%",
          left: "1%",
          right: "3%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "2019.1",
              "2019.2",
              "2019.3",
              "2019.4",
              "2019.5",
              "2019.6",
              "2019.7",
              "2019.8",
              "2019.9",
              "2019.10",
              "2019.11",
              "2019.12",
              "2020.1",
              "2020.2",
              "2020.3",
              "2020.4",
              "2020.5",
              "2020.6",
              "2020.7",
              "2020.8",
              "2020.9",
              "2020.10",
              "2020.11",
              "2020.12",
              "2021.1",
              "2021.2",
              "2021.3",
              "2021.4",
              "2021.5",
              "2021.6",
              "2021.7",
              "2021.8",
              "2021.9",
              "2021.10",
              "2021.11",
              "2021.12",
            ],
          },
        ],
        yAxis: [
          {
            min: 0,
            max: this.max,
            type: "value",
            // axisLabel:{formatter:`{value} Mt CO2`}
          },
        ],
        series: this.chartLine,
      };
    },
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.$nextTick(() => {
        this.flag = this.chartLine.every((item) => {
          // console.log(item.data.length,'item.data.length')
          return item.data.length == 0;
        });
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        myChart.clear();
        myChart.setOption(this.options);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.line_chart {
  width: 100%;
  height: 100%;
  // height: 335px;
  position: relative;
  #myChart {
    width: 100%;
    height: 100%;
  }
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
