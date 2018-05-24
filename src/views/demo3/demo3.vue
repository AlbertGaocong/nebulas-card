<template>
  <!-- <div> -->
    <!-- <c-title :text="title" :hide="false"></c-title> -->
    <!-- <p>{{ message }}</p> -->
  <!-- </div> -->
  <section class="finan">
    上拉加载更多
    <load-more
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    :bottomPullText='bottomText'
    :auto-fill="false"
    @bottom-status-change="handleBottomChange"
    ref="loadmore">
        <div class="loaded-data-box">
          另外模块
          <ul>
            <li>11</li>
            <li>11</li>
            <li>11</li>

          </ul>
        </div>
        <div v-show="loading" slot="bottom" class="loading"> 
          <!-- 上拉加载时显示一张加载gif图 -->
          <!-- <img src="./../../assets/main/uploading.gif"> -->
          加载中
        </div>
    </load-more>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  // import cTitle from 'components/index/mytitle';
  // import LoadMore from 'components/common/loadmore';

  export default {
    name: 'demo3',
    props:{

    },
    data () {
      return {
        title: 'ERROR!',
        //  上拉加载数据
        scrollHeight: 0,
        scrollTop: 0,
        containerHeight: 0,
        loading: false,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        bottomStatus: '',
        pageNo: 1,
        totalCount: '',
      }
    },
    computed: mapState([
      'message' // 声明一个计算属性message 用辅助函数返回全局的message  等同于 message （） { return this.$store.state.message} 即将this.message 映射为store.state.count
    ]),
    mounted: function () {
      this.$store.commit('MESSAGE', '404   --- hello3-----Not Found2！');
    },
    methods: {
        /* 下拉加载 */
        _scroll: function(ev) {
            ev = ev || event;
            this.scrollHeight = this.$refs.innerScroll.scrollHeight;
            this.scrollTop = this.$refs.innerScroll.scrollTop;
            this.containerHeight = this.$refs.innerScroll.offsetHeight;
        },
        loadBottom: function() {
            this.loading = true;
            this.pageNo += 1;   // 每次更迭加载的页数
            if (this.pageNo == this.totalGetCount) {
                // 当allLoaded = true时上拉加载停止
                this.loading = false;
                this.allLoaded = true;
            }
            console.log(666);
            // api.commonApi(后台接口，请求参数) 这个api是封装的axios有不懂的可以看vue2+vuex+axios那篇文章
            // .then(res => {
                setTimeout(() => {
                 //要使用的后台返回的数据写在setTimeout里面
                  this.$nextTick(() => {
                    this.loading = false;
                    })
                 }, 1000)
            // });
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
    },
    components: {LoadMore}
  }
</script>
<style>
  .finan{
    width: 10rem;
    /*height: 10rem;*/
    border: 1px solid red;
  }
  .loaded-data-box{
    border: 1px solid pink;
  }
</style>