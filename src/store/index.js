
export default {
  state: {
    baseUrl: '/static/',
    message: '',
    banner: '',
    sendOrderInfo: {
       reserveDate: '',
       reserveStart: '',
       reserveEnd: ''
    },
    shopOpenTime: [],
    timeWeek:[],
    todayUsed: [],
    axiosLoading: false,
  },
  actions:{
    AXIOS_LOADING({commit},res){
      commit('AXIOSLOADING',res);
    }
  },
  mutations: {
    MESSAGE (state, value) {
      state.message = value || state.message;
    },
    BANNER (state, value) {
      state.bannRESERVESTARTer = value || state.banner;
    },
    SHOPOPPENTIME (state,value) {
      state.shopOpenTime.push(value.startAt || state.shopOpenTime[0]);
      state.shopOpenTime.push(value.endAt || state.shopOpenTime[1]);
    },
    TODAYUSED (state,value) {
      state.todayUsed = value || state.todayUsed;
    },
    RESERVEDATE (state,value) {
      state.sendOrderInfo.reserveDate = value || state.sendOrderInfo.reserveDate;
    },
    RESERVESTART (state,value) {
      state.sendOrderInfo.reserveStart = value || state.sendOrderInfo.reserveStart;
    },
    RESERVEEND (state,value) {
      state.sendOrderInfo.reserveEnd = value || state.sendOrderInfo.reserveEnd;
    },
    AXIOSLOADING(state,value) {
      // state.axiosLoading = value || state.axiosLoading; //尼玛！！！ 这行代码浪费3天时间，只能设置为true。设置为false无效！（顺便复习下vuex store状态管理） 
      state.axiosLoading = value ;
    }

  }
}