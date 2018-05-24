<template>

  <div>
    <div v-if='!commentSucceed'>
      <div class="techer-info flex flex-v align-center">
         <header class="title"></header>
         <header class="flex head-wrap ">
           <div class="teacher-image">
             <img class="avatar" :src= "imgUrl"  alt="">
           </div>
           <div class=" teac-con flex flex-v justify-center" >
             <p class="teh-name">
               <span>&nbsp;售后:</span> 
               <span>{{ afterSaleTeacherName}}</span> 
             </p>
             <p class="teh-mobile">
              <span>&nbsp;电话：</span>
              <span>{{ afterSaleTeacherMobile }}</span>
             </p>
           </div>
           
         </header>
         <p class="after-text">您的评价让售后老师做的更好～</p>
      </div>
      <!--未评价modal-->
        <div class='coter-dis-comment-wrap'>
            <div class='temp-sty' >
              <!--<stars :com-info='comInfo' v-on:sendToParent='selectRight'></stars>-->
                  <!-- <div class="star-view">
                    <img v-for="(item,index) in comInfo.stars" class="star-image"  :src=" comInfo.key > item ? selectedSrc : normalSrc"  :data-key ='item+1' @click="selectRight">
                    </img>
                  </div> -->
            </div> 
            <div  class="tag-scroll">
              <div class="padding-top-bottom">
                <div v-for="(item,index) in comInfo.tagList">
                  <div class="index-course-item" @click="tagClick" :data-id="index" v-if="!item.isChoose">{{item._value}}
                  </div>
                  <div class="index-course-item-choose" @click="tagClick" :data-id="index" v-else>{{item._value}}
                  </div>
                </div>
              </div>
            </div>
            <input class="text-logout-text"  :value="comInfo.commentContent" @input="bindinput" placeholder="其他想说的 "  ref='comment-input'  />
            <div class="check" @click='clickAnonymousCommment'>
              <image :src="isAnonymousCommment ? checkedSrc : uncheckedSrc" class="checked-image"></image>
              <text :class="isAnonymousCommment ? 'ni-text  ni-text-ched' : 'ni-text'"  >匿名评价</text>
            </div>
        </div>
        <div class="submitcomment-btn" @click='submitcomment'>提交评价</div> 
      </div>
      <div class="comment-succeed flex flex-v justify-center" v-if='commentSucceed'>
        <img class="succeed-eva" src="/static/images/succeed-eva.png" alt="">
        <p>感谢评价</p>
      </div>  
    
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import { Toast } from 'mint-ui';
//  import stars from 'components/stars/stars';

  // import cTitle from 'components/index/mytitle';

  export default {
    mounted: function () {
      // this.empId = this.$utils.getQueryString("empId");
      // this.shopId = this.$utils.getQueryString("shopId");
      // this.type = this.$utils.getQueryString("type");
      console.log(this.$route.query);
      let  queryList = Object.keys(this.$route.query)[0].split('/');
      console.log(queryList);
      this.empId = queryList[2];
      this.shopId = queryList[1];
      this.type = queryList[3];


      // this.$router.push({path:'/index'});
      // this.$store.commit('MESSAGE', ' 售后老师齐媛媛');
      this.axios({
               method:'get',
               url: `/mos_afb/feedback/findScore?empId=${this.empId}&shopId=${this.shopId}`,
               
      })
      .then(res =>{
              // this.$store.commit('AXIOSLOADING',true);
              console.log(res);
              let data = res.data.data;
              Object.keys(data.scoreStarMap).forEach((item,index)=>{
                data.scoreStarMap[item].map((item,index)=>{
                  item['isChoose'] = false ;
                });
              });
              this.evaData = data ;
              console.log(this.evaData);
              this.afterSaleTeacherName = data.saleTeacherName ;
              this.afterSaleTeacherMobile = data.saleTeacherTel ;
              this.selectRightShow(5);
      }).catch(err=>{throw new Error('抛出promise报错' + err);});
    },
    data () {
      return {
        title: '666!',
        commentSucceed:false,
        evaData: {}, // 待获取评价数据
        empId: '',
        shopId: '' ,
        type: '',
        afterSaleTeacherName: '售后小姐姐',
        afterSaleTeacherMobile: 18998877007,
        imgUrl: "./static/images/defaultheadbig.png",
        selectedSrc:this.$store.state.baseUrl+'images/pingjia1_red.png',
        normalSrc:'/static/images/pingjia0_red.png',
        isAnonymousCommment: true,
        checkedSrc:'',
        uncheckedSrc:'',
        chooseTagCodes: [],
        comInfo:{
          stars: [0, 1, 2, 3, 4],
          key: 5,//评分
          tagList: [
           {
              id: 288,
              _key: 4,
              _value: '不够专业',
              isChoose: false
            }
          ],
          selectRight:'selectRight',
          commentContent: '',
          normalSrc: '../../images/pingjia0_red.png',
          selectedSrc: '../../images/pingjia1_red.png'
        },
        // 上送评价信息
        postCommentInfo: {},
        actions:[{
          name: '展示toast',
          method: this.showToast
        }]
      }
    },
    methods: {
      // 选择星级
      selectRight: function (key) {
        // console.log(e);
        // var key = e.currentTarget.getAttribute("data-key");
        // console.log(key);
        this.selectRightShow(key);
      },
      // 选择评价标签
      tagClick: function (e) {
        var param = e.currentTarget.getAttribute("data-id");
        console.log(param);
        var tagLists = this.comInfo.tagList;
        // console.log(tagLists[param]);
        console.log(this.chooseTagCodes);
        if (this.chooseTagCodes.length >= 3 && !tagLists[param].isChoose) {
          Toast({
                message: '最多选择三个标签',
                position: 'middle',
                duration: 800
                
          });
          return;
        }
        if (!tagLists[param].isChoose) {
          this.chooseTagCodes.push(tagLists[param]._value);
        } else {
          for (let ins = 0; ins < this.chooseTagCodes.length; ins++) {
            if (this.chooseTagCodes[ins] == tagLists[param]._value) {
              this.chooseTagCodes.splice(ins, 1);
            }
          }
        }
        console.log(this.chooseTagCodes)
        this.comInfo.tagList[param].isChoose = !this.comInfo.tagList[param].isChoose;
        console.log(tagLists)
        let comInfo = this.comInfo;
        comInfo.tagList = tagLists;
        this.comInfo = comInfo ;
      },
      selectRightShow(key){
        console.log("得" + key + "分")
        this.chooseTagCodes.length = 0;
        var chooseTags = [];
        console.log(this.evaData.scoreStarMap.five);
        if (this.evaData.scoreStarMap.five == null) {
          return;
        }
        if (key == 1) {
          chooseTags = this.evaData.scoreStarMap.four;
        } else if (key == 2) {
          chooseTags = this.evaData.scoreStarMap.four;
        } else if (key == 3) {
          chooseTags = this.evaData.scoreStarMap.four;
        } else if (key == 4) {
          chooseTags = this.evaData.scoreStarMap.four;
        } else if (key == 5) {
          chooseTags = this.evaData.scoreStarMap.five;
        }
        let comInfo = this.comInfo;
        comInfo.key = key;
        comInfo.tagList = chooseTags;
        this.comInfo = comInfo;
        
      },
      bindinput: function (e) {
        let textNow = e.target.value;
        console.log(e.target.value);
        let comInfo = this.comInfo;
        if (e.target.value != null && e.target.value.length >= 10) {
            Toast({
              message: '最多10字呵呵勒',
              position: 'middle',
              duration: 800,
              className: 'toastStyle'
            })
          textNow = this.comInfo.commentContent;
        }
        comInfo.commentContent = textNow;
        this.comInfo = comInfo ;
       
      },
        // 是否选择匿名评价
      clickAnonymousCommment(){
        this.isAnonymousCommment = !this.isAnonymousCommment;
      
      },
      // 提交评价
      submitcomment(e){
        var self = this;
        // var userInfo = con.getUserInfo();
        console.log(e.currentTarget);
        if (self.chooseTagCodes.length == 0){
          Toast({
              message: '请打标签',
              position: 'middle',
              duration: 800,
          })
          return;
        }
        this.axios({
                 method:'post',
                 url: `/mos_afb/feedback/saveScore`,
                 timeout:1000,   
                 data: {
                    "empId": this.empId,
                    "shopId": this.shopId,
                    "linkmanTel": this.afterSaleTeacherMobile,
                    "level": this.comInfo.key * 20,
                    "type": this.type == 1 ? '落地' : '回访',
                    "advantage": this.chooseTagCodes.join(','),
                    "remark": this.comInfo.commentContent
                  }
        })
        .then(res =>{
                console.log(res);
                if(res.data.code == 1){
                  Toast({
                    message: '评论成功',
                    position: 'middle',
                    duration: 800
                  });
                  this.commentSucceed = true;
                }else{
                  Toast({
                    message: '网络异常，评论失败',
                    position: 'middle',
                    duration: 800
                  });
                }
                  
        }).catch(err=>{throw new Error('抛出promise报错' + err);});
      },
    },
    computed: mapState([
      'message' // 声明一个计算属性message 用辅助函数返回全局的message  等同于 message （） { return this.$store.state.message} 即将this.message 映射为store.state.count
    ]),
//    components:{ stars }

  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/reset.css';
.coter-dis-comment{
  flex-grow: 1;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}
.title{
  color: #000;
  font-size: .8rem;
  margin-top: .5rem;  
}
.avatar{
  width: 2rem;
  height: 2rem;
  // border: 1px solid red ;
  border-radius: 1rem;
}
.head-wrap{
  width: 100%;
  font-size: .5rem;
  padding-left: .5rem;
  margin-bottom: .5rem;
  // justify-content: space-around;
}
.teac-con{
  margin-left: .5rem;
}
.after-text{
  font-size: .5rem;
  
}
.temp-sty{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 3rem;
  /* margin-top: 30rpx; */
}
.star-image {
  width: 1.2rem;
  height: 1.2rem;
  src: "../../images/pingjia1_red.png";
  margin-left: .4rem;
}
.star-view {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  /* margin-left: 10rpx; */
  margin-top: .25rem;
}
.course-name {
  font-size: .4rem;
  color: #333;
  margin-top: 2.5rem;
}

.customer-name {
  font-size: .3rem;
  color: #999;
  /* margin-top: 10rpx; */
}

.commen-suc-image {
  width: 1.8rem;
  height: 1.8rem;
  margin-top: 1.9rem;
}

.commen-suc-text {
  font-size: .4rem;
  color: #e53770;
  margin-top: .4rem;
}
.commen-suc-hint{
  font-size: .4rem;
  color: #666;
  margin-top: 2rem;
}
.dialog-optare-view{
  display: flex;
  margin-top: .6rem;
}
.optate-width{
  width: 4rem;
  text-align: center;
  padding: 0;
}
.clercks-view{
  width: 100%;
  display: flex;
  justify-content:flex-start;
  padding:.5rem;
  /* border:1px solid red; */

}
.clercks-course-item{
  /* margin-top: 10rpx; */
  /* float: left; */
  background-color: white;
  display:flex;
  flex-direction:column;

  /* width: 100rpx; */
  /* margin-left: 40rpx; */
}
.tag-scroll {
  height: 3.5rem;
  overflow: scroll-y;
}

.padding-top-bottom {
  /* padding-bottom: 30rpx; */
  overflow: hidden;
  width: 10rem;
  
}

.index-course-item {
  margin-top: .4rem;
  margin-left: .4rem;
  float: left;
  min-width: 2rem;
  border: 1px solid #999;
  border-radius: 3px;
  font-size: .3rem;
  color: #999;
  height: .9rem;
  line-height: .9rem;
  text-align: center;
  padding: 0 .2rem;
}

.index-course-item-choose {
  margin-top: .4rem;
  margin-left: .4rem;
  float: left;
  min-width: 2rem;
  border: 1px solid #e53770;
  border-radius: 3px;
  font-size: .3rem;
  color: #e53770;
  height: .9rem;
  line-height: .9rem;
  text-align: center;
  padding: 0 .2rem;
}
.check {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 10rem;
  /* margin-bottom: 90rpx; */
  margin-top: .3rem;
  box-sizing: border-box;
}
.submitcomment-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: .4rem;
  border-radius: 3px;
  width: 5rem;
  height: 1rem;
  background:rgba(229,55,112,1);
  margin:0 auto;
  margin-bottom:.6rem;
}
.toastStyle{
  color: blue;
  background: red;
}
.text-logout-text {
  display: block;
  font-size: .4rem;
  border: 1px solid #e5e5e5;
  height: 1.2rem;
  width: 8rem;
  padding: .2rem;
  color: #333;
  background-color: #fafafa;
  margin-top: .2rem;
  margin-left: .2rem;
  border-radius: 3px;
}
.comment-succeed{
  align-items: center;
  .succeed-eva{
    margin: 2rem  0;
    width: 3rem;
    height: 3rem;
  }
}
</style>