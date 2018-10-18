<template>
  <div class="mainheader">
    <div class="content">
      <div class="menu" @click="menuBar">
        <div class="iconfont home-icon">&#xe62d;</div>
      </div>
      <div class="title">
        {{this.title}}
        <span class="iconfont titleMore" v-show="this.more">&#xe62e;</span>
      </div>
      <div class="search" @click="showLoginOut">
        <div class="iconfont search-icon">&#xe659;</div>
      </div>
    </div>
    <div class="loginOutMsg" v-show="show">
      <div class="box">
        <div class="title">注销请猛击确定</div>
        <div class="choose">
          <div class="yes" @click="loginOutBtn">确定</div>
          <div class="no" @click="showLoginOut">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainheader',
  props: {
    activeChange: Number,
    active: Number
  },
  data () {
    return {
      title: '',
      more: false,
      show: false,
      count: 0
    }
  },
  watch: {
    activeChange () {
      this.changeNav(this.activeChange)
      //  监听home.vue中传递过来的活动页索引值
    },
    active () {
      this.homeTitle()
    }
  },
  methods: {
    changeNav (e) {
      // console.log('修改header的title值到索引' + e)
      //  判断当前处于什么页面，修改header的title值
      switch (e) {
        case 0:
          this.homeTitle()
          this.more = false
          break
        case 1:
          this.title = '单科成绩'
          this.more = false
          break
        case 2:
          this.title = '成绩上传'
          this.more = false
          break
      }
    },
    menuBar () {
      console.log('点击了刷新键')
      //  刷新数据库
      // this.$router.go(0)
      this.$emit('refresh')
    },
    loginOutBtn () {
      console.log('点击了退出登录键')
      if (this.count < 10) {
        this.count++
        // console.log(this.count + 'i')
      } else {
        localStorage.setItem('loginActive', 0)
        this.$emit('loginOut', 0)
        this.showLoginOut()
      }
      //  未防止家长查询其他孩子的成绩，将退出按钮设置成点击10次才能切换账号
    },
    homeTitle () {
      if (this.active == 1) {
        //  判断是否为登录状态
        let userName = localStorage.getItem('userName')
        let idName = localStorage.getItem('idName')
        this.title = userName + '    ' + '(学号:' + idName + ')'
      } else if (this.active == 2) {
        let userName = localStorage.getItem('userName')
        this.title = userName
      } else if (this.active == 0) {
        this.title = '请登录'
      }
      //  设置主页中头部学生个人信息
    },
    showLoginOut () {
      this.show = !this.show
      this.count = 0
      //  注销按钮事件
    }
  },
  mounted () {
    //  网页加载完毕对header的title值经行渲染
    this.changeNav(this.activeChange)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../assets/style/varibles.styl'
.mainheader
  .content
    position: fixed
    display: flex
    left: 0
    right: 0
    top: 0
    height: $headerHeight
    line-height: $headerHeight
    background: $bgColor
    min-width: 0
    .menu
      float: left
      text-align: center
      width: 60px
    .title
      flex: 1
      font-size: 18px
      color: $headerColor
      line-height: $headerHeight
    .search
      float: right
      text-align: center
      width: 60px
  .loginOutMsg
    z-index: 99
    position: fixed
    // display: flex
    top: 36%
    left: 0
    right: 0
    color: #fff
    width: 5rem
    margin: 0 auto
    padding: .2rem
    text-align: center
    border-radius: .2rem
    background: $bgColor
    .title
      font-size: .5rem
      margin: .2rem 0
    .choose
      display: flex
      font-size: .4rem
      .yes
        flex: 1
        margin: .2rem
        padding: .2rem 0
        background: rgba(0, 0, 0, 0.3)
        border-radius: .2rem
      .no
        flex: 1
        margin: .2rem
        padding: .2rem 0
        background: rgba(0, 0, 0, 0.3)
        border-radius: .2rem
  .iconfont
    font-size: 20px
    color: $headerColor
  .titleMore
    font-size: 12px
    color: $headerColor
</style>
