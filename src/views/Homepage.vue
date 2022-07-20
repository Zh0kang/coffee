<template>
  <div class="homepage">
    <!-- 导航 -->
    <div>
      <van-nav-bar>
        <template #left>
          <div class="item_box">
            <span>下午好</span>
            <span class="username"> 张林康</span>
          </div>
        </template>
        <template #right>
          <van-search
            placeholder="请输入搜索关键词"
            @focus="searchFocus"
          />
        </template>
      </van-nav-bar>
    </div>
    <!-- 导航 end -->
    <!-- 内容 -->
    <div class="concentbox">
      <!-- 轮播图 -->
      <div class="bannerbox">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in banners" :key="index">
            <img :src="item.bannerImg" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 轮播图 end -->
      <div class="hot">
        <span>热卖推荐</span>
      </div>
      <div class="hotconcent">
        <!-- 热卖商品 -->
        <div
          class="hot_box"
          v-for="item in hotlist"
          :key="item.pid"
          @click="routes(item.pid)"
        >
        <p 
          id = 'divpid' style="display:none;" :data-index="item.pid">{{item.pid}}</p>
          <div class="hotimg">
            <img :src="item.smallImg" alt="" />
            <span>hot</span>
          </div>
          <p class="hotname">{{ item.name }}</p>
          <p class="enname">{{ item.enname }}</p>
          <p style="color: #166ee0">
            ￥<span>{{ item.price }}</span>
          </p>
        </div>
        <!-- 热卖商品 end -->
      </div>
    </div>
    <!-- 内容 end -->
  </div>
</template>

<script>
import "../assets/less/homepage.less";
export default {
  data() {
    return {
      value: "",
      banners: [],
      hotlist: [],
    };
  },
  created() {
    //生命周期
    this.gethot();
    //获取推荐
    this.banner();
    //this.routes();
  },
  methods: {
    routes(pid){
      // 带着商品标识符——路由传参
      this.$router.push({
        path: `/detail/${pid}`
      });
    },
    //轮播图
    banner() {
      this.axios({
        method: "GET",
        url: "/banner",
        params: {
          appkey: this.appkey,
        },
      }).then((res) => {
        /* console.log(res); 打印数据*/
        if (res.data.code == 300) {
          this.banners = res.data.result;
        }
      });
    },
    //获取推荐
    gethot() {
      this.axios({
        method: "GET",
        url: "/typeProducts",
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 500) {
          this.hotlist = res.data.result;
        }
      });
    },
    searchFocus() {
       this.$router.push({name: 'Search'});
     } 
  },
};
</script>

<style>
</style>