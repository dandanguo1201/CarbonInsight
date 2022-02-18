<template>
  <div class="slider-box">
    <vue-slider v-bind="time" v-model="time.value">
    </vue-slider>
    <div class="start">{{ time.value[0] }}</div>
    <div class="end">{{ time.value[1] }}</div>
    <!-- <h3><small>Value: </small>{{ time.value }}</h3> -->
  </div>
</template>
<script>
import vueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css'
 
export default {
  components: {
    vueSlider
  },
  data () {
    return {
      value: 0,
      time: {
        value: [1990, 2020],
        min: 1990,
        max: 2020,
      }
    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped >
.slider-box {
  box-sizing: border-box;
  width: 100%;
  padding: 0 22px;
  position: relative;
  .start,.end{
    position: absolute;
    top: 22px;
    width: 50px;
    height: 28px;
    border: 1px solid #D9D9D9;
    text-align: center;
    line-height: 28px;
    color: #3D342F;
    font-weight: 600;
    font-size: 14px;
  }
  .start{
     left: 0;
  }
  .end{
     right: 0;
  }
}
 /deep/ .vue-slider-process{
  background-color: #33464F!important;
}
 /deep/ .vue-slider-dot-handle{
  border: 2px solid #33464F!important;
}

</style>
