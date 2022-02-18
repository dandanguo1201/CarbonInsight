<template>
  <div class="line_chart">
    <div class="title">
      <div>Multi-Region and Multi-Sectoral Carbon Sink Comparison Chart</div>
      <div class="btn">
          <button :class="linedataflag==1?'selected':''" @click="onClick('1')">Carbon Sink (TgC)</button>
          <button :class="linedataflag==2?'selected':''" @click="onClick('2')">Relative Change (%)</button>
          <img class="datalogo" src='../assets/datalogo.png' alt=""/>
      </div>
    </div>
    <div id="myChart"></div>
  </div>
</template>

<script>
// import API from '@/request/api';
// import ECharts from "vue-echarts/components/ECharts";

let map
let heatGradientData
export default {
  name: 'WorldMap',
  // components: {
  //   "v-chart": ECharts,
  // },
  props: ['chartLine','timeData','landoptionFlag','legend','linedataflag','resize'],
  data() {
    return {
        flag:1,
        screenWidth: document.body.clientWidth
    };
  },
  mounted(){
    const that = this
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
        })()
    }
    this.drawLine()
  },
  watch:{
    timeData:{
      handler(newval, oldVal) {
        if(newval!=oldVal){
          this.drawLine()
        }
      },
      immediate: true
    },
    chartLine:{
      handler(newval, oldVal) {
        if(newval!=oldVal){
          this.drawLine()
        }
      },
      immediate: true
    },
    screenWidth:{
        handler(newval, oldVal) {
        if(newval!=oldVal){
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          myChart.resize();
        }
      },
    },
    resize:{
      handler(newval, oldVal) {
        if(newval!=oldVal){
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          myChart.resize();
        }
      },
    },
  },
  computed: {
    options() {
      return {
        backgroundColor: "#fff",
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // type: 'cross',
                type: 'line',
            },
            formatter: function (params) {
                var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
                let rez = '<p>' + params[0].axisValue + '</p>';
                params.reverse().forEach(item => {
                    var xx = '<p>'   + colorSpan(item.color) + ' ' + item.seriesName + ': ' + Number(item.data).toFixed(4) + '</p>'
                    rez += xx;
                });
                return rez;
            }  
        },
        grid: {
            top: '20%',
            left: '1%',
            right: '2%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            x:'30',
            data: this.legend
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.timeData
        },
        yAxis: {
          type: 'value'
        },
        series: this.chartLine
      }
    }
  },
  methods:{
     drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.$nextTick(()=>{
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        myChart.clear()　
        myChart.setOption(this.options)
      })
    },
    onClick(prarm){
      this.$emit('changeData', prarm);
    },
  }
}
</script>

<style lang="scss" scoped>
.line_chart{
  width: 100%;
  height: 100%;
  padding-top: 50px;
  margin-right: 3px;
  box-sizing: border-box;
  position: relative;
  #myChart{
    width: 100%;
    height: 100%;
  }
  .title{
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: absolute;
    top: 12px;
    left: 0;
    padding-left: 17px;
    z-index: 100;
    div:nth-child(1){
      font-weight: 600;
      font-size: 16px;
      line-height: 14px;
      color: #33464F;
    }
    div:nth-child(2){
      width: auto;
      white-space: nowrap;
      button:first-child{
        margin-right: 10px;
      }
      button{
        width: 124px;
        // width: 10%;
        height: 28px;
        background: #EDF1F0;
        color: #33464F;
        border-radius: 2px;
        font-size: 12px;
      }
      .selected{
        background: #5E483A;
        // background: rgba(51,70,79,0.8);
        color: #ffffff;
      }
    }
    .datalogo{
      width:28px;
      height:25px;
      margin-left: 28px;
      margin-right: 24px;
    }
  }
  @media screen and (max-width: 639px) {
    width: auto;
    padding-top: 0;
    margin-right: 0;
    // margin-top: -360px;
    #myChart{
      height: 247px;
      width: 99.9%;
    }
    .title {
      top: -140px;
      height: 100%;
      div:first-child{
        line-height: 24px;
      }
      div:last-child{
        margin-top: -160px;
      }
    }
  }
}
button{
  margin: 0;
  padding: 0;
  border: 1px solid transparent;  //自定义边框
  // outline: none;    //消除默认点击蓝色边框效果
}
</style>
