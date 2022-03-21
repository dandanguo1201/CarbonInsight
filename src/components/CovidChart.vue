<template>
  <div class="covid">
    <div class="toptitle">
      <div>Carbon Emission & COVID</div>
      <div>How carbon emissions changes with COVID trends?</div>
      <div class="word">
        <button @click="toJump">
          Explore carbon emission & COVID data<img
            src="../assets/icon_go.svg"
            alt=""
          />
        </button>
      </div>
    </div>
    <div class="chartdiv">
      <div class="charttop">
        <div>
          <span>COVID-19 and CO2 Emission</span>
          <div class="tips">
            <span></span>
            <span>CO2 Emission</span>
            <span></span>
            <span>Confirmed Cases</span>
          </div>
        </div>
        <div class="btn">
          <button
            :class="selected === 1 ? 'selected' : ''"
            @click="selected = 1"
          >
            Confirmed Cases
          </button>
          <button
            :class="selected === 2 ? 'selected' : ''"
            @click="selected = 2"
          >
            Stringency Index
          </button>
        </div>
      </div>
      <div class="chart" ref="CovidChart"></div>
    </div>
    <div class="countrytab">
      <button
        :class="CountryRegion === item.name ? 'selectedcountry' : ''"
        v-for="(item, index) in countrylist"
        :key="index"
        @click="CountryRegion = item.name"
      >
        {{ item.name }}
      </button>
    </div>
    <div class="notes">
      Thomas Hale , Noam Angrist , Rafael Goldszmidt, Beatriz Kira , Anna
      Petherick , Toby Phillips, Samuel Webster, Emily Cameron-Blake , Laura
      Hallas, Saptarshi Majumdar, and Helen Tatlow. (2021). “A global panel
      database of pandemic policies (Oxford COVID-19 Government Response
      Tracker).” Nature Human Behaviour.
    </div>
  </div>
</template>
<script>
import covid from "../../public/covid.json";

export default {
  name: "Chart",
  props: ["phone"],
  data() {
    return {
      screenWidth: document.body.clientWidth,
      flag: false,
      CountryRegion: "United States",
      countrylist: [
        { name: "United States" },
        { name: "Brazil" },
        { name: "China" },
        { name: "France" },
        { name: "Germany" },
        { name: "India" },
        { name: "Italy" },
        { name: "Japan" },
        { name: "Spain" },
        { name: "United Kingdom" },
      ],
      covidArr: [],
      emissionData: [],
      ConfirmedData: [],
      StringencyData: [],
      selected: 1,
    };
  },
  mounted() {
    const that = this;
    this.covidArr = JSON.parse(JSON.stringify(covid));
    window.addEventListener("resize", () => {
      let CovidChart = this.$echarts.init(this.$refs.CovidChart);
      CovidChart.resize();
    });
    this.getDateline("United States");
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
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
              var cont =
                "<p>" + colorSpan(p.color) + " " + p.seriesName + ": " + p.data;
              if (p.seriesName === "Confirmed Cases") {
                cont += "M</p>";
              } else {
                cont += "</p>";
              }
              rez += cont;
              tooltipString.push(cont);
            });
            return rez;
          },
        },
        grid: {
          left: 70,
          right: 70,
          bottom: 40,
          // left: 100,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#0000000",
              },
            },
            data: [
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
            splitLine: {
              //不显示分割线
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Emission (Mt CO2)",
            nameLocation: "center",
            nameTextStyle: {
              padding: [0, 0, 30, 0],
              fontSize: this.phone ? 12 : 16,
              // fontWeight: 600,
              color: "#000000",
            },
            axisLabel: {
              textStyle: {
                color: "#6F6F6F",
              },
            },
            splitLine: {
              //显示分割线
              show: true,
            },
          },
          {
            type: "value",
            name: this.selected === 1 ? "Confirmed Cases" : "Stringency Cases",
            nameLocation: "center",
            nameTextStyle: {
              padding: [40, 0, 0, 0],
              fontSize: this.phone ? 12 : 16,
              // fontWeight: 600,
              color: "#000000",
            },
            axisLabel: {
              formatter: this.selected === 1 ? "{value} M" : "{value} ",
              textStyle: {
                color: "#6F6F6F",
              },
            },
            splitLine: {
              show: true,
            },
          },
        ],
        series: [
          {
            name: "CO2 Emission",
            type: "bar",
            data: this.emissionData,
            itemStyle: {
              color: "#DC7748",
            },
          },
          {
            name: "Confirmed Cases",
            type: "line",
            yAxisIndex: 1, //索引从0开始
            data:
              this.selected === 1 ? this.ConfirmedData : this.StringencyData,
            itemStyle: {
              color: "#663722",
            },
          },
        ],
      };
    },
  },
  watch: {
    CountryRegion(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getDateline(newVal);
      }
    },
    selected(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getDateline(this.CountryRegion);
      }
    },
  },
  methods: {
    getDateline(Country) {
      var emission = [];
      var Confirmed = [];
      var Stringency = [];
      for (var value of this.covidArr) {
        if (Country === value.CountryRegion) {
          emission.push(value.CarbonEmission);
          Stringency.push(value.Stringency);
          if (this.selected === 1) {
            Confirmed.push(Number(value.Confirmed) / 1000000);
          } else {
            Stringency.push(value.Stringency);
          }
        }
        this.emissionData = emission;
        this.ConfirmedData = Confirmed;
        this.StringencyData = Stringency;
      }
      this.drawLine();
    },
    drawLine() {
      let CovidChart = this.$echarts.init(this.$refs.CovidChart);
      CovidChart.setOption(this.options);
    },
    toJump() {
      this.$router.push("/carbonemission/2");
    },
  },
};
</script>

<style lang="scss" scoped>
.covid {
  position: relative;
  margin: 0 auto;
  max-width: 1464px;
  padding: 0 40px;
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
      flex-wrap: wrap;
      div span {
        display: block;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        color: #000;
      }
    }
    .tips {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 23px;
      span {
        display: inline-block;
      }
      span:nth-child(1) {
        background: #dc7748;
        width: 18px;
        height: 18px;
        border-radius: 50%;
      }
      span:nth-child(2n) {
        color: #000;
        font-size: 18px;
        line-height: 14px;
        margin-left: 8px;
      }
      span:nth-child(3) {
        width: 51px;
        height: 4px;
        background: #663722;
        border-radius: 6px;
        margin-left: 32px;
      }
    }
    .btn {
      button {
        width: 136px;
        height: 44px;
        color: #8f8f8f;
        background: #f1f1f1;
        border: 1px solid #e6e6e6;
        font-size: 16px;
        line-height: 14px;
        cursor: pointer;
      }
      button:first-child {
        border-right: none;
      }
      button:hover {
        color: #000000;
      }
      .selected {
        background: #ffffff;
        color: #000000;
      }
    }
    .chart {
      width: 100%;
      height: 621px;
      // margin-top: 53px;
    }
  }
  .countrytab {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
    button {
      font-size: 18px;
      line-height: 18px;
      color: #000000;
      margin-right: 24px;
      white-space: nowrap;
      height: 30px;
      padding: 0 12px;
      margin-top: 20px;
      cursor: pointer;
    }
    button:hover {
      background: #e6e6e6;
      border-radius: 40px;
    }
    .selectedcountry {
      font-size: 18px;
      line-height: 18px;
      color: #ffffff;
      background: #000000;
      border-radius: 40px;
    }
    .selectedcountry:hover {
      background: #000000;
    }
  }
  .notes {
    padding-bottom: 40px;
    font-size: 12px;
    color: #666;
  }
}
@media screen and (max-width: 1440px) {
  .gdp {
    // padding: 0 20px;
    .toptitle {
      margin-top: 40px;
      div:nth-child(3) {
        margin-top: 20px;
      }
    }
  }
}
@media screen and (max-width: 639px) {
  .covid {
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
    .chartdiv {
      .charttop .btn {
        margin-top: 40px;
      }
      .tips {
        span:nth-child(1) {
          width: 14px;
          height: 14px;
        }
        span:nth-child(2n) {
          font-size: 14px;
        }
      }
      .chart {
        height: 310px;
      }
    }
    .countrytab {
      margin-bottom: 30px;
      .selectedcountry {
        font-size: 14px;
        line-height: 14px;
      }
      button {
        font-size: 14px;
        line-height: 14px;
        margin-top: 16px;
        margin-right: 20px;
      }
    }
    .notes {
      margin-bottom: 20;
    }
  }
}
</style>
