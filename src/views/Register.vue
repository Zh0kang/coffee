<template>
  <div class="register">
    <div>
      <van-nav-bar
        title="注册页面"
        left-text="登录"
        right-text="关闭"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="iamge">
      <img src="../assets/image/coffee.png" />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="userregister.nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="userregister.phone"
        type="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="userregister.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button type="info" size="normal" @click="register"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import "../assets/less/register.less";
import { validForm } from "../assets/js/validForm";
import {Notify} from 'vant';
export default {
  methods: {
    onClickLeft() {
      this.$router.push({ path: `/login/` });
    },
    onClickRight() {
      Toast("按钮");
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    register() {
      let userinfo = this.userregister;
      let o = {
        nickname: {
          value: userinfo.nickname,
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
          erroMsg: "你的昵称不符合格式",
        },
        phone: {
          value: userinfo.phone,
          reg: /^1[3-9]\d{9}$/,
          erroMsg: "你的手机号码不符合格式",
        },
        password: {
          value: userinfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          erroMsg: "你的密码不符合格式",
        },
      };
      if (!validForm.valid(o)) {
        return; //阻止和返回数据
      }
      console.log(this.appkey);
      let info = Object.assign({}, userinfo);
      info.appkey = this.appkey;
      /* let params = "";
      for (let key in info) {
        params += `${key}=${info[key]}&`;
      }

      //序列化
      let data = params.slice(0, -1); */
      let data = info;

      console.log(data);
      this.axios({
        method: "POST",
        url: "/register",
        data,
      }).then((res) => {
        console.log(res);
      });
    },
  },
  data() {
    return {
      userregister: { nickname: "", password: "", phone: "" },
    };
  },
};
</script>

<style lang="less" scoped>
</style>