<template>
	<div class="wrap">
		<header class="header">
			<span>|</span>
			<span @click='getData'>全部应用 点击测试</span> 
		</header>
		<section id='application'>
			<ul class="app-list flex">
				<li v-for='item in appList' @click='gotoAddress(item.path)' class="app-item">
					<span>{{item.text}}</span>
				</li>
			</ul>
		</section>
	</div>
</template>
<script>
	import {mapState} from 'vuex';
	import axios0 from 'common/util/axios';
	export default {
		data(){
			return {
				appList:[
					{
						iconUrl:'',
						text:'客户',
						path:'/customer'
					},
					{
						iconUrl:'',
						text:'拜访',
						path:'/visit'
					}
				

				]
			}
		},
		methods:{
			getData(){
				this.axios({
				               method:'get',
				               url: `/mos_afb/feedback/findScore?empId=418&shopId=41`      
				      })
				.then(res =>{

				              console.log(res);
				              console.log('main。js ');

				              
				      }).catch(err=>{throw new Error('抛出promise报错' + err);});

			},
			gotoAddress(path){
				this.$router.push(path);
			}

		},
		mounted(){
			// this.getData();
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../../assets/css/reset.css';
	.wrap{
		width: 100%;
		.header{
			// border-bottom: 1px solid red;
			span{
				color: red;
			}
		}
		#application{
			// border: 1px solid red;
			width: 10rem;
			.app-list{
				flex-wrap: wrap;
				.app-item{
					border: 1px solid blue;
				}
			}
		}
	}
</style>