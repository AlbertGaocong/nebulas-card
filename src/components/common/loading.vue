<template>
	<div class="loading" >
		<h1>
      <img class="loading-img" src="static/images/loading.gif" alt="">
		</h1>
	</div>
</template>
<script>
	import {mapState} from 'vuex';
	export default{
		name: 'loading',
		data(){
			return {}
		},
		computed:{
        ...mapState(['axiosLoading']),
        },

	}
</script>
<style scoped>
  .loading{
    position: fixed;
    top:0;
    left:0;
    z-index:121;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .loading img{
    margin:5rem auto;
    width: 3rem;
    height: 3rem;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-240%);
  }
</style>