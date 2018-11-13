<template lang="html">
  <div class="Login">
    <div class="ifShow" v-show="show">
      <div class="content">
        <div class="title">学生成绩查询</div>
        <div class="all">
          <div class="teacher" v-if="!selectShow">
            <input type="text" v-model="userName" class="txt" name="教师姓名" value="" placeholder="请输入教师姓名">
            <div class="userinfo">{{userName}}</div>
            <input type="text" v-model="className" class="txt" name="id" value="" placeholder="请输入密码">
            <div class="userinfo">{{className}}</div>
            <div class="login-in" v-on:click="handleTeacherLogin">{{loginBtn}}</div>
            <div class="login-change" v-on:click="change">切换账号</div>
            <div class="info">
              <div class="info1">如无法登录请联系</div>
              <div class="info1">{{appInfo}}</div>
            </div>
          </div>
          <div class="parents" v-if="selectShow">
            <input type="text" v-model="userName" class="txt" name="学生姓名" value="" placeholder="请输入学生姓名">
            <div class="userinfo">{{userName}}</div>
            <input type="text" v-model="className" class="txt" name="班级" value="" placeholder="请输入密码">
            <div class="userinfo">{{className}}</div>
            <div class="login-in" v-on:click="handleClickLogin">{{loginBtn}}</div>
            <div class="login-change" v-on:click="change">切换账号</div>
            <div class="info">
              <div class="info1">如无法登录请联系</div>
              <div class="info1">{{appInfo}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    active: Number
  },
  data () {
    return {
      userName: '',
      className: '',
      loginBtn: '家长登录',
      appInfo: '初一四班班主任陈老师',
      show: true,
      selectShow: true //  true
    }
  },
  watch: {
    active () {
      if (this.active == 1 || this.active == 2) {
        this.show = false
        // 1为家长登录状态，2为科任教师登录状态 ，如果已经登录则不显示登录窗口
      } else if (this.active == 0) {
        this.show = true
      }
    },
    selectShow () {
      if (this.selectShow) {
        this.loginBtn = '家长登录'
      } else if (!this.selectShow) {
        this.loginBtn = '教师登录'
      }
    }
  },
  methods: {
    handleClickLogin () {
      // console.log('要登录了')
      localStorage.setItem('userName', this.userName)
      localStorage.setItem('idName', this.className)
      this.$emit('loginInfo', { userName: this.userName, className: this.className })
      // 点击登录后保存用户名和班级名称到本地
    },
    handleTeacherLogin () {
      // console.log('教师登录')
      localStorage.setItem('userName', this.userName)
      localStorage.setItem('idName', this.className)
      this.$emit('teacherLoginInfo', { userName: this.userName, className: this.className })
    },
    change () {
      this.selectShow = !this.selectShow
      this.className = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../src/assets/style/varibles.styl'
.ifShow
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.7);
  text-align: center
  .content
    margin: 22% 0
    color: #fff
    font-size: .44rem
    .title
      font-size: .64rem
      padding: .6rem 0
    .txt
      width: 4rem
      border-radius: .1rem
      color: #000
      padding: 0 .4rem
      margin: .2rem 0
    .userinfo
      min-height: .46rem
      font-size: .4rem
      color: #CCC
    .login-in
      // display: inline
      background: $bgColor
      font-size: .5rem
      width: 2.4rem
      padding: .18rem
      margin: .2rem auto
      border-radius: .1rem
    .login-change
      // display: inline
      background: #666
      font-size: .36rem
      height: .36rem
      line-height: .36rem
      color: #eee
      width: 1.8rem
      padding: .18rem .18rem
      margin: .3rem auto
      border-radius: .1rem
    .info
      width: 60%
      padding: .18rem
      margin: .1rem auto
      font-size: .36rem
      line-height: .5rem
      color: #666
</style>
