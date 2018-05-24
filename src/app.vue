<!--suppress ALL -->
<template>
  <div id="app">
    <loading v-show='axiosLoading' ></loading>
    <transition  :name="transitionName" >
       <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import Loading  from 'components/common/loading';
  export default {
      data () {
        return {
          transitionName: 'slide-left',
        }
      },
      computed:{
        ...mapState(['axiosLoading']),
      },
      // beforeRouteEnter (to, from, next) {
      //   let isBack = this.$router.isBack
      //   if (isBack) {
      //     this.transitionName = 'slide-right'
      //   } else {
      //     this.transitionName = 'slide-left'
      //   }
      //   this.$router.isBack = false
      //   console.log(666);
      //   next()
      // },
      mounted () {

        (function(){ 
          function setRem(){
                var width = document.documentElement.clientWidth || window.screen.width;
                document.documentElement.style.fontSize = width/10 + 'px';
          }
          setRem();
          window.addEventListener('resize',setRem,false);
        })();
        this.$router.beforeEach((to, from, next) =>{
          let isBack = this.$router.isBack;
          console.log(this.$router);
          if (isBack) {
            this.transitionName = 'slide-right'
          } else {
            this.transitionName = 'slide-left'
          }
          // this.$router.isBack = false ;
          next()
        });
      },
      components: { Loading }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  html {
    width: 100%;
    // border: 1px solid red ;
    height: 100%;
    /*background: #303d52;*/
  }
  body {
    margin: 0;
    display: flex;
    // flex-direction: row;
    //align-items: center;
    justify-content: flex-start;
    /*background: #303d52;*/
  }
  #app {
    color: #2c3e50;
    width: 10rem;
    // 最上层父级组件中不要设置关于文字对齐的属性 会逐级继承 影响布局 调试困难
    // text-align: center;
    
  }

.child-view {
  position: absolute;
  width:100%;
  transition: all .6s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}

</style>
