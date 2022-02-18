<template>
  <div class="optipn_map" aria-label="optipn_map">
    <div class="toptitle">
      <div class="title" v-if="type== 1">SELECT COUNTRY/REGION</div>
    </div>
    <vue-scroll :ops="ops"
                aria-label="scroll"
                class="scroll"
                ref="vscroller">
      <div class="option" aria-label="option">
        <!-- <div class="back"
             @click="hiddenOption">
          <img src="../assets/undisplay.png"
               alt="" />
        </div> -->
        <!-- <div class="title">SELECT TIME</div>
        <div class="time">
          <div class="card">
            <div class="start">
              <div>Time</div>
              <a-month-picker placeholder="Select"
                              :disabled-date="disabledDateStart"
                              v-model="from"
                              @change="onChangeStart" />
            </div>
            <div class="end">
              <div>End Time</div>
              <a-month-picker placeholder="Select" :disabled-date="disabledDateEnd"  v-model="to" @change="onChangeEnd"/>
            </div>
          </div>
          <div class="left">
               <div>Start Time</div>
               <div>2020.01</div>
               <div>period</div>
            </div>
            <div class="right">
               <div>Start Time</div>
               <div>2020.01</div>
               <div>period</div>
            </div>
            <div class="line1"></div>
            <div class="line2"></div>

          <div class="slider">
            <vue-slider v-bind="time" v-model="time.value"></vue-slider>
          </div>
        </div>
        <div class="update_time"><span></span>Last Updated On: 2021-03-24</div> -->
        <!-- <div class="title" v-if="type== 1">SELECT COUNTRY/REGION</div> -->
        <!-- <vue-scroll :ops="ops" class="scroll" ref="vscroller"> -->
          <div class="country" v-if="type== 1" aria-label="country">
              <div class="search">
                <!-- <a-icon type="search" /> -->
                <img src="../assets/search.png"
                    alt="" />
                <input type="text"
                      placeholder="Search"
                      aria-label="Name"
                      :value="value"
                      @input="input">
              </div>
              <div class="line"></div>
              <div class="tree" aria-label="treebox">
                <vue-scroll :ops="ops"
                            class="scroll_tree"
                            aria-label="scroll1"
                            ref="vscroller"
                            v-if="type== 1">
                  <a-tree v-model="checkedKeys"
                          checkable
                          aria-label="tree"
                          :expanded-keys="expandedKeys"
                          :auto-expand-parent="autoExpandParent"
                          :selected-keys="selectedKeys"
                          :tree-data="treeData"
                          @expand="onExpand"
                          @select="onSelect" />
                </vue-scroll>
                <!-- <div v-show="type== 2">
                    <div class="checkbox">
                      <a-checkbox-group
                        name="checkboxgroup"
                        :options="oceanList"
                        :value="selectlist"
                        @change="onChange"
                      />
                    </div>
                </div> -->
              </div>
            </div>
          <!-- </vue-scroll> -->
        <!-- <div class="title"
             v-if="type== 1">SELECT SECTOR</div>
        <div class="btn"
             v-if="type== 1">
          <button class="langbtn">Land</button>
          <button v-for="(item,index) in btnlist" :key="index" :class="item.flag == true?'selected':''" @click="getSecter(item)">{{item.name}}</button>
        </div> -->
      </div>
    </vue-scroll>
    <div class="reset">
      <button @click="Reset">Reset</button>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component';
import moment from 'moment';

export default {
  name: "OptionMap",
  components: {
    vueSlider
  },
  props: ['type', 'oceanList', 'treeData', 'fromDate', 'toDate'],
  data () {
    return {
      btnlist: [
        { name: 'Power', key: 0, flag: true },
        { name: 'Industry', key: 1, flag: false },
        { name: 'Ground Transport', key: 2, flag: true },
        { name: 'Domestic Aviation', key: 3, flag: false },
        { name: 'Residential', key: 4, flag: true },
      ],
      expandedKeys: ['', ''],
      autoExpandParent: true,
      checkedKeys: ['CHN', 'USA'],
      selectedKeys: [],
      from_Date: '',
      to_Date: '',
      dateFormat: 'YYYY-MM',
      selectlist: [],
      value: ''
    }
  },
  mounted () {
    if (this.type == 2) {
      this.selectlist = this.oceanList
    }
    // if(this.oceanList){
    //   this.selectlist = this.oceanList
    // }
    this.from_Date = this.fromDate
    this.to_Date = this.toDate
  },
  computed: {
    ops () {
      return {
        vuescroll: {
          mode: "slide",
          sizeStrategy: 200, //如果父容器不是固定高度，请设置为 number , 否则保持默认的percent即可
          detectResize: true //是否检测内容尺寸发生变化
        },
        maxHeight: 751,
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
          verticalNativeBarPos: "right"
        },
        rail: {
          keepShow: true,
          background: "red",
          size: "4px",
          opacity: 0
        },
        bar: {
          keepShow: true,
          hoverStyle: true,
          onlyShowBarOnScroll: true, //是否只有滚动的时候才显示滚动条
          background: "#EDF1F0", //滚动条颜色
          opacity: 1, //滚动条透明度
          size: "4px"
        }
      }
    },
    from () {
      return moment(this.fromDate, 'YYYY-MM')
    },
    to () {
      return moment(this.toDate, 'YYYY-MM')
    }
  },
  watch: {
    checkedKeys (val) {
      console.log('onCheck=====', val);
      let arr = []
      val.map(item => {
        if (item.length == 3) {
          return arr.push(item)
        }
      })
      this.$emit('selectCountry', arr)
    },
    type (val) {
      this.selectlist = this.oceanList
    },
  },
  methods: {
    getSecter (param) {
      this.btnlist.map((item, index) => {
        if (item.key == param.key) {
          item.flag = !param.flag
        }
      })
    },
    input (e) {
      this.value = e.target.value
      this.$emit('input', e.target.value)
    },
    onChangeStart (value, dateString) {
      this.$emit('start', dateString);
    },
    onChangeEnd (value, dateString) {
      this.$emit('end', dateString);
    },
    hiddenOption () {
      this.$emit('hidden', false);
    },
    Reset () {
      this.checkedKeys = ['CHN', 'USA'],
        this.$emit('reset');
    },
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info);
      this.selectedKeys = selectedKeys;
    },
    onChange (param) {
      this.selectlist = param
      this.$emit('selectOcean', Array.from(param))
    },
    disabledDateStart (current) {
      // Can not select days before today and today
      return current && current < moment(this.from_Date, this.dateFormat);
    },
    disabledDateEnd (current) {
      // Can not select days before today and today
      return current && current > moment(this.to_Date, this.dateFormat);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.optipn_map {
  border-right: 1px solid #E6E6E6;
  border-bottom: 1px solid #E6E6E6;
  width: 262px;
  height: 247px;
  position: relative;
  @media screen and (max-width: 639px) {
    height: 100%;
    width: 100%;
    border-right: none;
    border-bottom: none;
  }
}
.scroll {
  // width: 394px;
  width: 100%;
  height: 751px;
  height: 700px;
}
.scroll_tree {
  // width: 394px;
  width: 100%;
  height: 100px;
}
.option {
  // width: 394px;
  width: 100%;
  height: auto;
  padding: 16px 23px 22px;
  .back {
    width: 24px;
    height: 24px;
    background: #f5f5f5;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    margin-bottom: 16px;
    i {
      color: #000000;
    }
  }
  .title {
    font-weight: bold;
    font-size: 16px;
    color: #33464f;
    border: 1px solid red;
  }
  .time {
    // width: 346px;
    width: 100%;
    border: 1px solid #edf1f0;
    margin-top: 24px;
    .card {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 14px 12px 13px;
      position: relative;
      .start,
      .end {
        width: 100%;
        div:first-child {
          margin-bottom: 6px;
          color: #727272;
          font-size: 12px;
        }
      }
      // .start{
      //   margin-right: 32px;
      // }
      // .left{
      //   padding-left: 20px;
      // }
      // .right{
      //   padding-left: 36px;
      // }
      // .left,.right{
      //   width: 160px;
      //   height: 73px;
      //   background: #F9F9F9;
      //   &>div:nth-child(1){
      //     color: #33464F;
      //     font-size: 12px;
      //     margin-top: 5px;
      //   }
      //   &>div:nth-child(2){
      //     color: #3E8A6F;
      //     font-size: 16px;
      //     margin-top: 1px;
      //     margin-bottom: 1px;
      //   }
      //   &>div:nth-child(3){
      //     color: #33464F;
      //     font-size: 10px;
      //     opacity: 0.4;
      //   }
      // }
      // .line1,.line2{
      //   position: absolute;
      //   background-color: #fff;
      //   width: 8px;
      //   height: 50px;
      //   // border: 1px solid red;
      // }
      // .line2{
      //   top: 5px;
      //   left: 156px;
      //   transform-origin: left;
      //   transform: rotate(-30deg);
      // }
      // .line1{
      //   top: 40px;
      //   right: 178px;
      //   transform-origin: left;
      //   transform: rotate(30deg);
      // }
    }
    .slider {
      width: 100%;
      // width: 306px;
      height: 20px;
      margin: 0 auto;
    }
  }
  .update_time {
    font-size: 12px;
    margin-top: 12px;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #11a579;
      margin-right: 8px;
    }
  }
  .country {
    // width: 346px;
    width: 100%;
    height: 238px;
    border: 1px solid #edf1f0;
    margin-top: 52px;
    margin-bottom: 60px;
    .search {
      width: 100%;
      padding: 9px 24px 0 21px;
      display: flex;
      align-items: center;
      input {
        background: none;
        // outline: none;
        border: none;
        width: 150px;
        margin-left: 10px;
        font-size: 14px;
      }
      img {
        margin-top: -4px;
        width: 17px;
        height: 16px;
      }
      input:focus {
        border: none;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #e4e7eb;
        font-size: 14px;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #e4e7eb;
        font-size: 14px;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #e4e7eb;
        font-size: 14px;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #e4e7eb;
        font-size: 14px;
      }
    }
    .line {
      width: 90%;
      margin-top: 6px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin: 0 auto;
    }
    .tree {
      padding-left: 21px;
      height: 180px;
      width: 100%;
      margin-top: 10px;
      .checkbox {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
      }
    }
  }
  .btn {
    margin-bottom: 63px;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    button {
      width: 168px;
      height: 30px;
      background: rgba(51, 70, 79, 0.2);
      border: 1px solid #33464f;
      box-sizing: border-box;
      border-radius: 2px;
      color: #33464f;
    }
    .selected {
      background: rgba(51, 70, 79, 0.3);
      border: 1px solid #33464f;
    }
    .langbtn {
      width: 169px;
      height: 30px;
      background: rgba(51, 70, 79, 0.3);
      border: 1px solid #33464f;
      color: #33464f;
    }
  }
}
.toptitle {
  width: 100%;
  height: 48px;
  background: #ffffff;
  padding-left: 23px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  div{
    font-weight: bold;
    font-size: 16px;
    color: #33464f;
  }
  // button {
  //   width: 88px;
  //   height: 32px;
  //   line-height: 32px;
  //   margin-right: 23px;
  //   // border: none;
  //   // background-color: transparent;
  //   // outline: none;    //消除默认点击蓝色边框效果
  //   background: #f9f9f9;
  //   border-radius: 2px;
  // }
}
.reset {
  width: 100%;
  height: 63px;
  background: #ffffff;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  z-index: 10000;
  bottom: 0;
  left: 0;
  button {
    width: 88px;
    height: 32px;
    line-height: 32px;
    margin-right: 23px;
    // border: none;
    // background-color: transparent;
    // outline: none;    //消除默认点击蓝色边框效果
    background: #f9f9f9;
    border-radius: 2px;
  }
}
button {
  border: none;
  background-color: transparent;
  // outline: none; //消除默认点击蓝色边框效果
}
/deep/ .ant-calendar-picker {
  width: 100%;
}
/deep/ .__vuescroll .__bar-wrap-is-vertical .__bar-is-vertical {
  right: -5px !important;
  width: 9px !important;
}
/deep/ .__vuescroll .__rail-is-horizontal .__bar-is-horizontal {
  bottom: -4px !important;
}
/deep/ .vue-slider-process {
  background-color: #33464f !important;
}
/deep/ .vue-slider-dot-handle {
  border: 2px solid #33464f !important;
}

/deep/ .ant-input {
  background: #f9f9f9 !important;
  font-size: 14px !important;
}
/deep/ .ant-calendar-picker-input::-webkit-input-placeholder {
  font-size: 14px !important;
}
/deep/ .btn .anticon {
  color: #999999;
}
/deep/ .checkbox .ant-checkbox-wrapper {
  width: 100% !important;
}
/deep/ .ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {
  background-color: #5e483a;
}
/deep/ .ant-tree-checkbox-checked .ant-tree-checkbox-inner {
  background-color: #5e483a;
  border-color: #5e483a;
}
/deep/ .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
  background-color: rgba($color: #5e483a, $alpha: 0.2);
}
/deep/ .ant-tree li .ant-tree-node-content-wrapper:hover {
  background-color: rgba($color: #5e483a, $alpha: 0.2);
}
/deep/ .ant-tree-checkbox-wrapper:hover {
  background-color: #5e483a;
}
</style>
