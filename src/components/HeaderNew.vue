<template>
  <div>
    <div :class="sign ? 'header none' : 'header'">
      <div class="left">
        <button aria-label="Microsoftlogo" @click="tomsra">
          <!-- <img :src="sign?'../assets/Microsoftlogo3.png':'../assets/Microsoftlogo1.png'" alt="" /> -->
          <img v-if="sign" src="../assets/Microsoftlogo3.png" alt="" />
          <img v-else src="../assets/Microsoftlogo1.png" alt="" />
        </button>
        <span>|</span>
        <button aria-label="CarbonInsightlogo" class="insight" @click="tohome">
          <img v-if="sign" src="../assets/CarbonInsightlogo2.png" alt="" />
          <img v-else src="../assets/CarbonInsightlogo1.png" alt="" />
        </button>
      </div>
      <div class="right">
          <button  v-for="(item,index) in tablist" :key="index"
            :class="sign? 'homebutton unline': tab == item.key? 'name selectedtab ' : 'pagebutton line'"
            @click="toJump($event ,item.key)"
          >
            <span>{{item.title}}</span>
          </button>
      </div>
    </div>

    <div :class="sign ? 'phone' : 'phone blackline'">
      <!-- <div :class="sign ? 'phone_left' : 'phone_left signColor'">
        <a target="_blank" href="https://www.msra.cn/"
          >Microsoft Research Asia</a
        >
      </div> -->
      <div :class="sign ? 'phone_left':'phone_left blackline'">
        <button aria-label="Microsoftlogo" @click="tomsra">
          <!-- <img :src="sign?'../assets/Microsoftlogo3.png':'../assets/Microsoftlogo1.png'" alt="" /> -->
          <img v-if="sign" src="../assets/Microsoftlogo3.png" alt="" />
          <img v-else src="../assets/Microsoftlogo1.png" alt="" />
        </button>
        <span>|</span>
        <button aria-label="CarbonInsightlogo" class="insight" @click="tohome">
          <img v-if="sign" src="../assets/CarbonInsightlogo2.png" alt="" />
          <img v-else src="../assets/CarbonInsightlogo1.png" alt="" />
        </button>
      </div>
      <div class="phone_right">
        <button @click="displayMenu(true)">
          <img
            v-if="sign"
            class="menu_img"
            src="../assets/index_menu.svg"
            alt=""
          />
          <img v-else class="menu_img" src="../assets/index_menu1.svg" alt="" />
        </button>
      </div>
      <div
        class="phone_menu"
        :style="{ height: height + 'px', width: width + 'px' }"
        v-if="menu"
      >
        <ul>
          <li>
            <span
              ><a target="_blank" href="https://www.msra.cn/"
                >Microsoft Research Asia</a
              ></span
            >
            <img
              class="menu_img"
              src="../assets/menu_close.svg"
              alt=""
              @click="displayMenu(false)"
            />
          </li>
          <li @click="tohome">
            <span>Carbon Insight</span>
            <img class="menu_img" src="../assets/menu_next.svg" alt="" />
          </li>
          <li v-for="(item,index) in tablist" :key="index"  @click="toJump($event ,item.key)">
            <span>{{item.title}}</span>
            <img class="menu_img" src="../assets/menu_next.svg" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  props: ["sign", "name", "flag", "menu","tab"],
  data() {
    return {
      user: null,
      userInfo: null,
      height: null,
      width: null,
      tablist:[
        {title:"Carbon emission",key:"emission1",},
        {title:"Carbon emission & COVID",key:"emission2"},
        {title:"Carbon emission & Social Economy",key:"emission3"},
        {title:"About us",key:"aboutus"},
      ],
    };
  },
  methods: {
    toJump(e,param){
      if(param.indexOf('emission') !== -1){
        this.$emit("tomenu", false);
        this.$router.push("/carbonemission/"+ param.charAt(param.length - 1));
      }else{
        this.$router.push("/aboutus");
      }
    },
    tohome() {
      this.$emit("tohome");
    },
    tomsra() {
      window.open("https://www.msra.cn/");
    },
    displayMenu(param) {
      this.$emit("tomenu", param);
    },
  },
  created: function () {
    this.height =
      document.documentElement.clientHeight || document.body.clientHeight;
    this.width =
      document.documentElement.clientWidth || document.body.clientWidth;
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.height =
          document.documentElement.clientHeight || document.body.clientHeight;
        this.width =
          document.documentElement.clientWidth || document.body.clientWidth;
      });
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.phone {
  display: none;
  padding: 0 5.289%;
}
.header {
  // border-bottom: 1px solid #3d342f;
  min-height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  position: relative;
  max-width: 1464px;
  margin: 0 auto;
  padding: 0 40px;
  flex-wrap: wrap;
  .line,
  .unline {
    display: inline-block;
  }
  .line:after,
  .unline:after {
    content: "";
    width: 0;
    height: 0.5px;
    background: #ffffff;
    position: absolute;
    top: 100%;
    left: 50%;
    transition: all 0.8s;
  }
  .line:after {
    background: #000000;
  }
  .line:hover:after,
  .unline:hover:after {
    left: 0%;
    width: 100%;
  }
  .left {
    font-size: 16px;
    white-space: nowrap;
    display: flex;
    button:nth-child(1) {
      cursor: pointer;
    }
    span {
      font-weight: normal;
      margin: 0 20px;
    }
    .insight {
      cursor: pointer;
      position: relative;
      display: inline-block;
      margin: 0;
    }
    img {
      height: 24px;
    }
  }
  .right {
    font-weight: normal;
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    // margin-right: 5.289%;
    button{
      height: 80px;
    }
    .selectedtab {
      // width: 120px;
      white-space: nowrap;
      margin-right: 40px;
      cursor: pointer;
      position: relative;
    }

    .name{
      color: #000;
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;
      color: #000000;
        // border-bottom: 1px solid #000;
      border-bottom: 0.5px solid #000000;
    }
    // .emissionname,
    // .sinkname {
    //   color: #000;
    //   border-bottom: 1px solid #000;
    // }
    .homebutton,.pagebutton{
      margin-right: 40px;
      text-align: center;
      white-space: nowrap;
      // margin-left: 1.81%;
      cursor: pointer;
      position: relative;
      font-weight: 600;
      // font-size: 18px;
      line-height: 16px;
    }
    .pagebutton{
      color: #000000;
      border-bottom: 0.5px solid #fff;
    }
    // .sink {
    //   // width: 120px;
    //   margin-right: 40px;
    //   text-align: center;
    //   white-space: nowrap;
    //   // margin-left: 1.81%;
    //   cursor: pointer;
    //   position: relative;
    // }
    .us {
      margin-right: 40px;
      text-align: center;
      white-space: nowrap;
      cursor: pointer;
      position: relative;
    }
    .sign,
    .sign1,
    .signout,
    .join,
    .signout1 {
      width: 75px;
      height: 32px;
      border-radius: 16px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
    }
    .sign,
    .signout {
      // background: #ffffff;
      // color: #705543;
      color: #ffffff;
    }
    .sign {
      width: auto;
    }
    .join {
      background: #ffffff;
      color: #705543;
      margin-left: 40px;
    }
    .sign_name {
      width: 32px;
      height: 32px;
      left: 1344px;
      top: 24px;
      border: 1px solid #ffffff;
      box-sizing: border-box;
      border-radius: 60px;
      line-height: 32px;
      cursor: pointer;
    }
    .signabb {
      border: 1px solid #4f4f4f;
      color: #4f4f4f;
      line-height: 29px;
      text-align: center;
    }
    .sign1,
    .signout1 {
      // background: #0A3231;
      background: #5e483a;
      color: #ffffff;
    }
    //.line {
    //border-bottom: 0.5px solid #000000;
    //}
  }
}
.infor {
  width: 300px;
  height: 162px;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  top: 64px;
  right: 0;
  z-index: 100;
  .sign_out {
    margin-top: 18px;
    margin-right: 20px;
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    line-height: 19px;
    font-weight: normal;
    color: #000000;
    cursor: pointer;
  }
  .infor_con {
    margin: 23px 20px 0;
    display: flex;
    align-items: center;
    .img {
      width: 68px;
      height: 68px;
      margin-right: 20px;
    }
    .infor_mailbox {
      padding-right: 20px;
      text-align: left;
    }
    .infor_mailbox div:nth-child(1) {
      width: 170px;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .infor_mailbox div:nth-child(2) {
      font-weight: normal;
      font-size: 14px;
      line-height: 14px;
      color: #6f6f6f;
      margin-top: 3px;
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 160px;
    }
    .infor_mailbox div:nth-child(3) {
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: #0078d6;
    }
  }
}
.none {
  border: none;
  color: #ffffff;
}

@media screen and (max-width: 1240px) {
  .header {
    display: none;
  }
  .phone {
    display: block;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    width: 100%;
    position: relative;
    padding: 0 24px;
    .phone_left {
      font-size: 16px;
      font-weight: 500;
      a {
        color: #ffffff;
      }
      img{
        height: 20px;
      }
      span{
        color: #fff;
        margin: 0 12px;
      }
    }
    .signColor a {
      color: #000;
    }
    .phone_right {
      display: flex;
      align-items: center;
      button:first-child {
        color: #ffffff;
        font-size: 14px;
        margin-right: 20px;
      }
      .menu_img {
        width: 20px;
        height: 20px;
      }
    }
    .phone_menu {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      background-color: #fff;
      position: fixed;
      ul {
        padding-left: 0;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          list-style-type: none;
          height: 60px;
          font-size: 16px;
          color: #000;
          width: 100%;
          a {
            color: #000;
          }
          img {
            width: 16px;
            height: 16px;
          }
          &:hover {
            background: #fbfbfb;
          }
        }
        li:nth-child(1) {
          color: #010101;
          font-weight: bold;
        }
      }
    }
    .sign_name {
      width: 32px;
      height: 32px;
      left: 1344px;
      top: 24px;
      border: 1px solid #ffffff;
      box-sizing: border-box;
      border-radius: 60px;
      line-height: 32px;
      cursor: pointer;
    }
    .signabb {
      border: 1px solid #4f4f4f;
      color: #4f4f4f !important;
      line-height: 29px;
      text-align: center;
    }
    .sign1,
    .signout1 {
      // background: #0A3231;
      background: #5e483a;
      color: #ffffff;
    }
    .sign,
    .sign1,
    .signout,
    .join,
    .signout1 {
      width: 75px;
      height: 32px;
      border-radius: 16px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
    }
    .sign,
    .signout {
      // background: #ffffff;
      // color: #705543;
      color: #ffffff;
    }
    .sign {
      width: auto;
    }
    .infor {
      top: 54px;
      right: 36px;
    }
  }
}
</style>
