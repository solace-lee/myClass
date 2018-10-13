<template lang="html">
  <div class="Login">
    <div class="ifShow" v-show="show">
      <div class="content">
        <div class="title">学生成绩查询系统</div>
        <input type="text" v-model="userName" class="txt" name="学生姓名" value="" placeholder="学生姓名">
        <div class="userinfo">{{userName}}</div>
        <input type="text" v-model="className" class="txt" name="班级" value="" placeholder="班级(如：初一04班)">
        <div class="userinfo">{{className}}</div>
        <div class="login-in" v-on:click="handleClickLogin">{{loginBtn}}</div>
        <div class="info">
          <div class="info1">如无法登录请联系</div>
          <div class="info1">{{appInfo}}</div>
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
      loginBtn: '登 录',
      appInfo: '初一四班班主任陈老师',
      show: true
    }
  },
  watch: {
    active () {
      if (this.active == 1) {
        console.log('false')
        this.show = false
        // 如果已经登录则不显示登录状态
      } else if (this.active == 0) {
        this.show = true
      }
    }
  },
  methods: {
    handleClickLogin () {
      console.log('要登录了')
      localStorage.setItem('studentName', this.userName)
      localStorage.setItem('className', this.className)
      this.$emit('loginInfo', { userName: this.userName, className: this.className })
      // 点击登录后保存用户名和班级名称到本地
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
    margin: 25% 0
    color: #fff
    font-size: .46rem
    .title
      font-size: .66rem
      padding: .2rem 0
    .txt
      color: #000
      margin: .2rem 0
    .userinfo
      min-height: .46rem
      font-size: .4rem
      color: #CCC
    .login-in
      background: $bgColor
      font-size: .5rem
      width: 1.3rem
      padding: .18rem
      margin: .4rem auto
      border-radius: .1rem
    .info
      width: 60%
      padding: .18rem
      margin: .4rem auto
      font-size: .36rem
      line-height: .5rem
      color: #666
</style>
