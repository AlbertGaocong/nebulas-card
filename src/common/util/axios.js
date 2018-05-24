import  axios from 'axios';
import  store from 'store/store';
console.log(store);
function axiosE ( Obj ){
		let timeTmp = new Date().getTime();
		return new Promise((resolve,reject)=>{
			    store.dispatch('AXIOS_LOADING', true);
				axios(Obj)
				.then((res)=>{
					let time = new Date().getTime() - timeTmp;
					if (time < 500) time = 500 ;
					setTimeout(() => {
					  console.log(time);
					  store.dispatch('AXIOS_LOADING', false);
			        }, time)

					resolve(res);
				})
				.catch((err)=>{
					reject(err);
				});
		  }
	    )
};
axios.interceptors.request.use(function(config){  
    // store.dispatch('AXIOS_LOADING', true); 
    return config  
},function(err){  
    return Promise.reject(err)  
});  
axios.interceptors.response.use(function(response){  
    // store.dispatch('AXIOS_LOADING', false); 
    return response  
},function(err){  
    return Promise.reject(err)  
});

export default { axiosE }

