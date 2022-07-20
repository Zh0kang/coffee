<template>
  <div>
    <div>
      
      <van-tabs v-model="active">

        <van-tab title="菜单分类形式">
          <van-tree-select
           height="194vw"
            :items="items"
            :main-active-index.sync="active2"
            class="vantreeselect"
            @click-nav="left"
          >
            <template #content>
              <div class="describebox" v-for="item in typelist" :key="item.pid" @click="routes(item.pid)">
                <div class="imgbox">
                  <img :src="item.smallImg" alt="" />
                  <span>{{ item.type }}</span>
                </div>
                <div class="introducebox">
                  <div class="naembox">{{ item.name }}</div>
                  <div class="ennamebox">
                    描述信息：<span>{{ item.desc }}</span>
                  </div>
                  <div class="pricebox">
                    <div class="pricecolor">
                      ￥<span>{{ item.price }}</span>
                    </div>
                    <div class=""></div>
                  </div>
                </div>
              </div>
            </template>
          </van-tree-select>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import "../assets/less/menu.less";
export default {
  data() {
    return {
      active: 1,
      active2: 0,
      items: [{ text: "分类形式", children: [] }, { text: "分组2" }],
      typelist: [],
    };
  },
  created() {
    this.getType();
    this.getTypeProducts();
  },
  methods: {
    routes(pid){
      // 带着商品标识符——路由传参
      this.$router.push({
        path: `/detail/${pid}`
      });
    },
    left(index) {
      let items = this.items;
      for (let i = 0; items.length; i++) {
        if (i == index) {
          this.getTypeProducts(items[i].type);
          break;
        }
      }
    },
    getType() {
      this.axios({
        method: "GET",
        url: "/type",
        params: {
          appkey: this.appkey,
        },
      }).then((res) => {
        console.log("getType===>", res);
        if (res.data.code == 400) {
          // 声明变量接受返回的数据
          let data = res.data.result;
          // 向数组首位添加推荐
          data.unshift({
            type: "isHot",
            value: 1,
            typeDesc: "推荐",
          });
          data = data.map(function (value) {
            value.text = value.typeDesc;
            return value;
          });
          this.items = data;
        }
      });
    },
    getTypeProducts(val) {
      //为空则默认推荐
      if (!val) {
        val = "isHot";
      }
      let params = {
        appkey: this.appkey,
      };
      //判断点击的val
      if (val == "isHot") {
        params.key = "isHot";
        params.value = 1;
      } else {
        params.key = "type";
        params.value = val;
      }
      this.axios({
        method: "GET",
        url: "/typeProducts",
        params,
      }).then((res) => {
        console.log("getTypeProducts===>", res);
        if (res.data.code == 500) {
          this.typelist = res.data.result;
        }
      });
    },
  },
};
</script>

<style>
</style>