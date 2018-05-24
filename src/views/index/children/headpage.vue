<template>
  <div class="wrap">
     <div class="swiper-box">
       <!--<swiper :options="swiperOption" ref="mySwiper">-->
         <!--<swiper-slide v-for="item in listImg" :key='item.id'  >-->
            <!--<div class="img-wrap">-->
              <!--&lt;!&ndash; <img :src="item.src" alt=""> &ndash;&gt;-->
              <!--哈哈哈-->
            <!--</div>-->
         <!--</swiper-slide>-->
       <!--</swiper> -->
     </div>
      <!--<div>-->
      <!--<div class="echarts-box" id="echarts-box"></div>-->
      <!--</div>-->

      <div class="card">
          <p style="color:#f4f4f4;font-size: .3rem;text-align: center;">星云名片，永不丢失</p>
          <ul class="card-list">
              <li v-for="item in cardInfo" class="card-item">
                  <p>
                      <span>名字：</span>
                      <span>{{item.card.name}} </span>
                  </p>
                  <p>
                      <span>电话：</span>
                      <span>{{item.card.mobile}} </span>
                  </p>
                  <p>
                      <span>公司：</span>
                      <span>{{item.card.companyName}} </span>
                  </p>
                  <p>
                      <span>职位：</span>
                      <span>{{item.card.job}} </span>
                  </p>
                  <p>
                      <span>邮箱：</span>
                      <span>{{item.card.email}} </span>
                  </p>
                  <p>
                      <span>简介：</span>
                      <span>{{item.card.briefIntroduction}} </span>
                  </p>
              </li>
          </ul>
      </div>
     
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {swiper , swiperSlide } from 'vue-awesome-swiper';
  import echarts from 'echarts';
  console.log(NebPay);
  export default {
    data () {
      return {
        cardInfo:[],
        listImg:[
          {
            id: 1,
            src:'http://pic35.nipic.com/20131121/8821914_122452818000_2.jpg'
          },
          {
            id: 2,
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515750133627&di=b186d6dfd27c58885aa6d06b9ba8a1d6&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads%2Fsc%2Fjpgs%2F06%2Fxpic3699_sc115.com.jpg'
          },
          {
            id: 3,
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515750235970&di=28a872df1be83ee72ee117556b287c31&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff7246b600c338744e4d42bb55b0fd9f9d62aa0e1.jpg'
          }
        ],
        swiperOption: {
          notNextTick: true,
          autoplay: {
                delay: 3000,
                disableOnInteraction: false,
              },
          
          pagination: {
             el: '.swiper-pagination',
          },
          slidesPerView: 'auto',  
          // centeredSlides: true,   
          // spaceBetween: 30,  
          // direction : 'vertical',
          // grabCursor : true,
          // setWrapperSize :true,
          // autoHeight: true,
          paginationClickable :true,
          prevButton:'.swiper-button-prev',
          // nextButton:'.swiper-button-next',
          // scrollbar:'.swiper-scrollbar',
          // mousewheelControl : true,
          // observeParents:true,
          onSlideChangeEnd: swiper => {  
              //这个位置放swiper的回调方法  
              this.page = swiper.realIndex+1;  
              this.index = swiper.realIndex;  
          }       
        }
      }
    },
    methods:{
      pageInit(){
          this.getCardList();
      },
      getCardList(){
//            let dappAddress = 'n1zJCdYVsYw39XaNae63NfJHYCSkQ5zCPiJ';
            let nebPay = new NebPay();
            let callFunction = "getCardList";
            let callArgs = "[\"" + "gaocongtest4" + "\"]";;
            nebPay.simulateCall(dappAddress, "0", callFunction, callArgs, {    //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
    //                    listener: this.cbCallDapp      //指定回调函数 callback  listener 都支持
                callback: this.cbSearch      //指定回调函数
            });
      },
      cbSearch(res){
          var res = JSON.parse(res.result);
          this.cardInfo =  res;
          console.log(this.cardInfo);
      }
    },
    computed:{
       ...mapState([
      
       ]),
       mySwiper(){
        // return this.$refs.mySwiper.swiper; // 实例化swiper mySwiper
      }
    },
    mounted: function (e) {
        //这边就可以使用swiper这个对象去使用swiper官网中的那些方法
        // this.swiper.slideTo(0, 0, false);
        // this.swiper.slideTo(3, 1000, false)
        // this.$store.commit('MESSAGE', '404   --- hello3-----Not Found2！');
        //let myChart = echarts.init(document.getElementById('echarts-box'));
        //console.log(myChart);
        //myChart.showLoading();
        //      let options =  {
        //            series : [
        //                {
        //                    name: '访问来源',
        //                    type: 'pie',
        //                    radius: '55%',
        //                    data:[
        //                        {value:235, name:'视频广告1哈哈哈'},
        //                        {value:274, name:'联盟广告'},
        //                    ]
        //                }
        //            ]
        //      }
        //      myChart.hideLoading();
        //            myChart.setOption(options);

        this.pageInit();
        },
        components:{
          swiper,
          swiperSlide
        }
   }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  // @import 'assets/css/reset.css';
  @import '../../../assets/css/reset.css';
  .wrap{
    /*background: #303d52;*/
      /*position: relative;*/
      /*border: 1px solid yellow;*/
      margin-bottom: 30px;
  }
  .swiper-box{
    /*position: absolute;*/
      /*left: 0;*/
      /*right: 0;*/
      /*border: 1px solid blue;*/
      /*height: 200px;*/
  }
  .card-list{
       display: flex;
       jusitify-content:center;
        flex-wrap: wrap;
      .card-item{
          width: 3.1rem;
          height: 1.8rem;
          padding: .08rem .18rem;
          border: 1px solid #f1ea10;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          color: #f4f4f4;
          margin: 3px 5px;
          /*font-size: .2rem;*/
          background: url("/static/images/card-bg.png");
          p{
              color: #9c7a11;
              font-size: .17rem;
          }
      }
  }
  .echarts-box{
    width: 10rem;
    height: 10rem;
  }
</style>


