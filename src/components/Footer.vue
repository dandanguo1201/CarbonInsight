<template>
  <div class="footer">
    <div>© 2021 Carbon Insight. All rights reserved.</div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    // msg: String
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  height: 255px;
  background-color: #917059;
  font-family: Segoe UI;
  position:relative;
  div {
    font-weight: 600;
    font-size: 18px;
    color: #000;
    position: absolute;
    top: 206px;
    left: 40px;
  }
}
</style>
