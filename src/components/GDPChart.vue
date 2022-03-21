<template>
  <div class="gdp">
    <div class="toptitle">
      <div>Carbon Emission & Economy</div>
      <div>How carbon emissions changes with GDP per capita?</div>
      <div class="word">
        <button @click="toJump">
          Explore carbon emission & Economy data<img
            src="../assets/icon_go.svg"
            alt=""
          />
        </button>
      </div>
    </div>
    <div class="stitle">Carbon Emission per Capita</div>
    <div class="tips" v-for="(item, index) in countrylist" :key="index">
      <span :style="{ backgroundColor: item.color }"></span>
      <span>{{ item.name }}</span>
    </div>
    <div class="chart" ref="GDPChart"></div>
    <div class="notes">
      World Bank. “GDP per capita (current US$).” World Development Indicators.
      The World Bank Group, 2020,
      https://data.worldbank.org/indicator/NY.GDP.PCAP.CD.<br />
      World Bank. “Population (total).” World Development Indicators. The World
      Bank Group, 2020, https://data.worldbank.org/indicator/SP.POP.TOTL. <br />
      Liu,Z., Ciais, P., Deng, Z. et al. Carbon Monitor, a near-real-time daily
      dataset of global CO2 emission from fossil fuel and cement production. Sci
      Data 7, 392 (2020). https://doi.org/10.1038/s41597-020-00708-7
    </div>
  </div>
</template>
<script>
import historical from "../../public/historical.json";

export default {
  name: "Chart",
  props: ["phone"],
  data() {
    return {
      screenWidth: document.body.clientWidth,
      flag: false,
      countrylist: [
        { name: "Brazil", color: "#639292" },
        { name: "China", color: "#DC7748" },
        { name: "France", color: "#75A874" },
        { name: "Germany", color: "#D79E6A" },
        { name: "India", color: "#C6B457" },
        { name: "Italy", color: "#45829B" },
        { name: "Japan", color: "#9178C4" },
        { name: "Spain", color: "#6694CA" },
        { name: "United Kingdom", color: "#CE7F7F" },
        { name: "United States", color: "#C16FA5" },
      ],
      timeline: [
        1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981,
        1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993,
        1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
        2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
      ],
      counties: [
        "Brazil",
        "China",
        "Germany",
        "Spain",
        "France",
        "United Kingdom",
        "India",
        "Italy",
        "Japan",
        "United States",
      ],
      historicalArr: [],
      series: [],
    };
  },
  mounted() {
    this.historicalArr = JSON.parse(JSON.stringify(historical));
    const that = this;
    window.addEventListener("resize", () => {
      let GDPChart = this.$echarts.init(this.$refs.GDPChart);
      GDPChart.resize();
    });
    this.drawLine();
  },

  methods: {
    drawLine() {
      this.series = this.groupBy(this.historicalArr, function (item) {
        return [item.Time];
      });
      // this.series = arr;
      this.showEcharts();
      // console.log(arr, "arr");
    },
    groupBy(array, f) {
      let groups = {};
      array.forEach(function (o) {
        let group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        var a = [];
        a.push(o.GDPPerCapita);
        a.push(o.CO2PerCapita);
        a.push(o.Population);
        a.push(o.CountryRegion);
        a.push(o.Time);
        groups[group].push(a);
      });
      return Object.keys(groups).map(function (group) {
        return groups[group];
      });
    },
    showEcharts() {
      var itemStyle = {
        opacity: 0.8,
      };
      var sizeFunction = function (x) {
        var y = Math.sqrt(x / 6e8) + 0.1;
        return y * 40;
      };
      // Schema:
      var schema = [
        {
          name: "GDPPerCapita",
          index: 4,
          text: "GDP per capita(USD)",
          unit: "",
        },
        {
          name: "CO2PerCapita",
          index: 3,
          text: "CO2 per capita(tCO2)",
          unit: "",
        },
        { name: "Population", index: 2, text: "Population", unit: "" },
        { name: "CountryRegion", index: 1, text: "CountryName", unit: "" },
        { name: "Time", index: 0, text: "Time", unit: "" },
      ];
      var option = {
        baseOption: {
          //配置播放轴
          timeline: {
            axisType: "category",
            orient: "horizontal",
            autoPlay: false,
            inverse: false,
            playInterval: 1000,
            left: 40,
            right: 100,
            top: "99%",
            bottom: 40,
            width: null,
            height: null,
            symbol: "none",
            checkpointStyle: {
              borderWidth: 2,
              color: "#137759",
            },
            controlStyle: {
              color: "#000",
              borderColor: "#000",
              showNextBtn: false,
              showPrevBtn: false,
            },
            progress: {
              lineStyle: {
                color: "#000",
              },
            },
            data: this.timeline, //播放的时间轴
          },
          title: [
            {
              text: this.timeline[0],
              textAlign: "center",
              right: "6%",
              // bottom: this.phone ? "34%" : "24%",
              bottom: this.phone ? 100 : 120,
              textStyle: {
                fontSize: this.phone ? 28 : 46,
              },
            },
          ],
          tooltip: {
            padding: 10,
            borderWidth: 1,
            formatter: function (obj) {
              var value = obj.value;
              var str = "";
              var len = value.length;
              value.forEach((item, index) => {
                let i = len - index - 1;
                str +=
                  '<span style="display:inline-block;line-height:12px;color: #6F6F6F;width:140px;text-align:right;margin-bottom:6px;">' +
                  schema[i].text +
                  " " +
                  "</span>" +
                  '<span style="display:inline-block;line-height:12px;color: #000000;margin-left:10px;margin-bottom:6px;">' +
                  value[i] +
                  "</span><br>";
              });
              return str;
            },
          },
          grid: {
            top: 10,
            bottom: 80,
            containLabel: true,
            left: 30,
            right: "60",
          },
          xAxis: {
            type: "value",
            name: "GDP per capita(USD)",
            nameGap: 25,
            nameLocation: "middle",
            // max: 40000,
            // min: 0,
            nameTextStyle: {
              fontSize: this.phone ? 12 : 16,
              // fontWeight: 600,
              color: "#000000",
              padding: [0, 0, 0, 0],
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#6F6F6F",
              },
            },
          },
          yAxis: {
            type: "value",
            name: "CO2 per capita(tCO2)",
            nameLocation: "center",
            // max: 30,
            // min: -5,
            nameTextStyle: {
              padding: [0, 0, 20, 0],
              fontSize: this.phone ? 12 : 16,
              // fontWeight: 600,
              color: "#000000",
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#6F6F6F",
              },
            },
          },
          visualMap: [
            {
              show: false,
              dimension: 3,
              categories: this.counties,
              inRange: {
                color: (function () {
                  var colors = [
                    "#639292",
                    "#DC7748",
                    "#D79E6A",
                    "#6694CA",
                    "#75A874",
                    "#CE7F7F",
                    "#C6B457",
                    "#45829B",
                    "#9178C4",
                    "#C16FA5",
                  ];
                  return colors.concat(colors);
                })(),
              },
            },
          ],
          series: [
            {
              type: "scatter",
              itemStyle: itemStyle,
              data: this.series[0],
              symbolSize: function (val) {
                return sizeFunction(val[2]);
              },
            },
          ],
          animationDurationUpdate: 1000,
          animationEasingUpdate: "quinticInOut",
        },
        options: [],
      };
      for (var n = 0; n < this.timeline.length; n++) {
        option.options.push({
          title: {
            show: true,
            text: this.timeline[n] + "",
          },
          series: {
            name: this.timeline[n],
            type: "scatter",
            itemStyle: itemStyle,
            data: this.series[n],
            symbolSize: function (val) {
              return sizeFunction(val[2]);
            },
          },
        });
      }
      let GDPChart = this.$echarts.init(this.$refs.GDPChart);
      GDPChart.setOption(option);
    },
    toJump() {
      this.$router.push("/carbonemission/3");
    },
  },
};
</script>

<style lang="scss" scoped>
.gdp {
  position: relative;
  margin: 0 auto;
  max-width: 1464px;
  padding: 0 40px;
  background-color: #fff;
  .toptitle {
    padding-top: 56px;
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
  .chartdiv {
    margin-top: 64px;
    .charttop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div span {
        display: block;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
      }
    }
  }
  .stitle {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
    margin-top: 56px;
    margin-bottom: 24px;
  }
  .tips {
    display: flex;
    display: inline;
    span:first-child {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }
    span:last-child {
      font-size: 16px;
      line-height: 12px;
      color: #666666;
      margin-left: 8px;
      margin-right: 16px;
    }
  }
  .chart {
    width: 100%;
    height: 621px;
    margin-top: 53px;
  }
  .notes {
    margin-top: 40px;
    font-style: 12px;
    color: #666;
    padding-bottom: 40px;
  }
}
@media screen and (max-width: 1440px) {
  .gdp {
    .toptitle {
      div:nth-child(3) {
        margin-top: 20px;
      }
    }
    .stitle {
      margin-top: 48px;
    }
  }
}
@media screen and (max-width: 639px) {
  .gdp {
    padding: 0 20px;
    .toptitle {
      // padding-top: 40px;
      div:nth-child(1) {
        font-size: 16px;
        line-height: 14px;
      }
      div:nth-child(2) {
        font-size: 34px;
        line-height: 36px;
        margin-top: 16px;
      }
      div:nth-child(3) {
        margin-top: 20px;
      }
    }
    .chart {
      height: 310px;
      margin-top: 53px;
    }
  }
}
</style>
