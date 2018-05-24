<template>
  <div>
     <!-- <transition name='fade'> -->
        <router-view></router-view>
     <!-- </transition> -->
     <footer-guide></footer-guide>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import footerGuide from 'components/common/footer';
  // import {swiper , swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        }
    },
    methods:{
      drag (e) { 
      }
    },
    computed:{
       ...mapState([
      //'message' // 声明一个计算属性message 用辅助函数返回全局的message  等同于 message （） { return this.$store.state.message} 即将this.message 映射为store.state.count
      
       ]),
       mySwiper(){
        return this.$refs.mySwiper.swiper; // 实例化swiper mySwiper
      }
    },
    mounted: function (e) {
      //这边就可以使用swiper这个对象去使用swiper官网中的那些方法  
            // this.swiper.slideTo(0, 0, false); 
            // this.swiper.slideTo(3, 1000, false)
      // this.$store.commit('MESSAGE', '404   --- hello3-----Not Found2！');
    },
    components:{
      footerGuide,
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../assets/css/reset.css';
  
  .img-wrap{
    width: 10rem;
    height: 200px;
    img{
      width: 10rem;
      height: 200px;
    }
  }
  
</style>


