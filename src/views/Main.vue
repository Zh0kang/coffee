<template>
  <div>
    <!-- 路由视图 -->
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item
        badge=""
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.url"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data(){
        return{
            active: 0,
            tabbarData:[
                {
                    title:"首页",
                    icon:{
                        active:require("../assets/image/home_active.png"),
                        inactive:require("../assets/image/home.png"),
                    },
                    url:{
                        name:"Homepage",
                    },
                },
                {
                    title:"菜单",
                    icon:{
                        active:require("../assets/image/menu_active.png"),
                        inactive:require("../assets/image/menu.png"),
                    },
                    url:{
                        name:"Menu",
                    },
                },
                {
                    title:"购物袋",
                    icon:{
                        active:require("../assets/image/shopbag_active.png"),
                        inactive:require("../assets/image/shopbag.png"),
                    },
                    url:{
                        name:"Shopbag",
                    },
                },
                {
                    title:"个人中心",
                    icon:{
                        active:require("../assets/image/my_active.png"),
                        inactive:require("../assets/image/my.png"),
                    },
                    url:{
                        name:"My",
                    },
                }]
        }
    }
};
</script>

<style lang="less" scoped>
</style>