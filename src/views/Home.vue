<template>
  <div class="home">
    1212121
    <h1 @click="manageConsent">Application name</h1>
    <div id="cookie-banner"></div>
    <header-new />
      <router-view></router-view>
    <footer-new  :bgc="bgc"/>
  </div>
</template>

<script>
// @ is an alias to /src

import HeaderNew from '../components/HeaderNew.vue'
import FooterNew from '../components/FooterNew.vue'

export default {
  name: 'Home',
  components: {
    HeaderNew,
    FooterNew
  },
  mounted(){
    //   window.WcpConsent && WcpConsent.init("en-US","cookie-banner",function(err,_siteConsent){
    //   if(!err){
    //     siteConsent = _siteConsent;
    //     console.log(siteConsent,'ooooooooooooooooooooooooooooooooooo')
    //   }else{
    //     console.log("Error intializing WcpContent:",+ err)
    //   }
    // },onConsentChanged, WcpConsent.themes.light);
    // function getUserConsent(){
    //   var userConsent = siteConsent.getContent();
    // }
    // function dropSocialMediaCookies(){
    //   if(siteContent.getContentFor(WcpConsent.consentCategories.SocialMedia)){

    //   }
    // }
    // // function manageConsent(){
    // //   if(siteConsent.isContentRequired){
    // //     siteConsent.manageConsent();
    // //   }
    // // }
    // WcpConsent.init("en-US","cookie-banner",function(err,siteConsent){
    //   if(siteConsent){
    //     siteConsent.onConsentChanged(onConsentChanged)
    //   }
    // },onConsentChanged)
    // function onConsentChanged(categoryPreferences){
    //   console.log("onConsentChanged",categoryPreferences)
    //   if(categoryPreferences.Analytics){}
    //   if(categoryPreferences.Advertising){}
    //   if(categoryPreferences.SocialMedia){}
    // }
    // function setNonEssentialCookies(categoryPreferences){
    //   if(categoryPreferences.Analytics){}
    //   if(categoryPreferences.Advertising){}
    //   if(categoryPreferences.SocialMedia){}
    // }
    // WcpConsent.onInitCallback(setNonEssentialCookies)
    // WcpConsent.init("en-US","cookie-banner")
  },
  methods:{
    manageConsent(){
      console.log('ok')
      if(siteConsent.isContentRequired){
        console.log('0')
        siteConsent.manageConsent();
      }
    }
  },
  data(){
    return{
       bgc:'background:#F9F9F9;'
    }
  }
}
</script>
<style scoped lang='scss'>
.home::-webkit-scrollbar {
  display: none;
  width: 0;
}
</style>
