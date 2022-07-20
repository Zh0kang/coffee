<template>
  <div class="loginpage">
    <div>
      <van-nav-bar
        title="登录页面"
        left-text="注册"
        right-text="关闭"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="iamgebox">
      <img src="../assets/image/coffee.png" />
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="userlogin.phone"
          name="手机号码"
          label="手机号码"
          placeholder="手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          v-model="userlogin.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            size="normal"
            native-type="submit"
            @click="denglu"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { validForm } from "../assets/js/validForm";
export default {
  data() {
    return {
      userlogin: { username: "", password: "" },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/register" });
    },
   
    onSubmit(values) {
      console.log("submit", values);
    },
    denglu() {
      console.log("userL", this.userlogin);
      let userinfo = this.userlogin;
      let o = {
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
        return;
      }
      console.log(this.appkey);

      if (!validForm.valid(o)) {
        return;
      }
          //复制对象
      let info = Object.assign({}, userinfo);
      info.appkey = this.appkey;
     
      let data = info;
      console.log(data);
      this.axios({
        method: "POST",
        url: "/Login",
        data,
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          localStorage.setItem("_token", res.data.token);
          this.$router.push({
            name: "Homepage",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loginpage {
  height: 100vh;
  background-color: white;
}
.iamgebox {
  width: 100%;
  background-color: white;
  text-align: center;
  img {
    min-width: 200px;
  }
}
</style>