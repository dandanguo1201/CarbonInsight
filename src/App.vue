<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
body{
  font-family: Segoe UI;
}
button{
    margin: 0px;
    padding: 0px;
    border: 0px;
    background: none;
}
a:focus-visible { 
  outline-color: -webkit-focus-ring-color;
  outline-style: auto;
  outline-width: 1px;
}
/* html {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
html::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar {
  display: none;
} */
</style>
