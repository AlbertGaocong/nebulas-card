<template>
    <ul class=" footer-ul ">
        <li class="guide-item">
          	<router-link to='/headpage' replace>
	           <!--<p>-->
	           		<!--<img class="footer-icon" v-show='$route.path.indexOf("headpage") > -1 ? true : false' src="/static/images/mobile.png" alt="">-->
	           	<!--</p>-->
	           <!--<p>-->
	           		<!--<img class="footer-icon" v-show='$route.path.indexOf("headpage") > -1 ? false : true'  src="/static/images/name.png" alt="">-->
	           	<!--</p>-->
	           <p>
	             <span>行业大咖</span>
	           </p>
          	</router-link>
        </li>
        <li class="guide-item">
          	<router-link to='/createCard' replace>
	           <p>
	           		<img class="footer-icon" src="" alt="">
	           	</p>
	           <p>
	            <span>创建名片</span>
	       	   </p>
          	</router-link>
        </li>
    </ul>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			gotoAddress(path){
				this.$router.push(path);
			}
		}
	}
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	a{
		color:#9da8d8;
	}
	a:visited{
		/*color: #9da8d8;*/
		color: #fff;
	}
	a:active{
		color:pink;
	}
	.router-link-active{
		color: #4ba4fb !important;
	}
.footer-ul{
	/*position: fixed;*/
    bottom: 0;
    // border-bottom: 1px solid red;
    // box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    display: flex;
    // border: 1px solid red;
    justify-content: space-around;
    width: 100%;
    .guide-item{
	     a{
	      	display: flex;
	      	flex-direction: column;
	     }
	     span{
			font-size: .3rem;
	     }
    }
  }
  .router-link-active{
    color: red;
  }

</style>