<template>
    <div class="sour" id="page2">
       <div class="title">
         <div>
           <div>Carbon Source</div>
           <div>Collecting,sharing,visualizing and predicting carbon emission and negative information.</div>
         </div>
         <div class="source">SOURCE</div>
       </div>
       <div class="value">Gt 40.00</div>
       <div class="t">Effective May 2021, The total amount of carbon dioxide in the world: </div>
       <div class="list">
           <div class="sector" v-for="(item,index) in sectorList" :key="index" >
              <img :src='item.img'  alt=""/>
           </div>
           <div class="cover"></div>
       </div>
    </div>
</template>
<script>
import sector1 from "@/assets/sector1.png";
import sector2 from "@/assets/sector2.png";
import sector3 from "@/assets/sector3.png";
import sector4 from "@/assets/sector4.png";
import sector5 from "@/assets/sector5.png";

export default {
  name: 'About',
   data() {
    return {
        sectorList:[
          {title:'Power',img:sector1,boxstyle:"padding-bottom:24.54px",bgstyle:'height:45.35px;width:25px;margin-left:17px',tstyle:'margin-left:43px'},
          {title:'Industry',img:sector2,boxstyle:"padding-bottom:21.37px",bgstyle:'height:45.35px;width:25px;margin-left:17px',tstyle:'margin-left:25px'},
          {title:'Ground Transportation',img:sector3,boxstyle:"padding-bottom:25px",bgstyle:'height:45.35px;width:25px;margin-left:17px',tstyle:'margin-left:24px'},
          {title:'Residential',img:sector4,boxstyle:"padding-bottom:24.54px",bgstyle:'height:45.35px;width:25px;margin-left:17px',tstyle:'margin-left:25px'},
          {title:'Aviation',img:sector5,boxstyle:"padding-bottom:33px",bgstyle:'height:45.35px;width:25px;margin-left:17px',tstyle:'margin-left:18px'},
        ],
    };
  },
  mounted(){

  },
  methods: {

  }
}
</script>
<style scoped lang='scss'>
.sour{
    color: #000000;
    .title{
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 12px;
      &>div>div:first-child{
        font-weight: bold;
        font-size: 46px;
      }
      &>div>div:last-child{
        font-size: 32px;
        width: 476px;
        margin-top: 30px;
      }
      .source{
        font-family: Segoe UI;
        color: rgba(0, 0, 0, 0.06);
        transform: rotate(90deg);
        font-weight: 900;
        font-size: 32px;
        margin-right: -70px;
      }
    }
    .value{
      margin-top: 55px;
      line-height: 200px;
      font-size: 334px;
      white-space: nowrap;
    }
    .t{
      font-size: 14px;
      margin-top: 90px;
      margin-left: 15px;
    }
    .list{
      width: auto;
      height: 72px;
      margin: 64px 13px 98px 15px;
      display: flex;
      align-items: top;
      justify-content: space-between;
      position: relative;
      .sector{
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
           width: 100%;
           height: 100%;
        }
      }
      .cover{
        width: 100%;
        height: 100%;
        background-color: #fff;
        opacity: 0.3;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
      }
    }
  }
</style>