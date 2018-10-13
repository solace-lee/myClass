<template lang="html">
  <div class="home">
    <main-header :activeChange="activeChange" :active="active" @loginOut="loginOut"></main-header>
    <main-home class="content" :examList="examList" @change="indexChange"></main-home>
    <login @loginInfo="loginInfo" :active="active"></login>
    <message :active="active" :Status="Status" @reset="reset"></message>
  </div>
</template>

<script>
import axios from 'axios'
import MainHeader from '../components/MainHeader.vue'
import MainHome from './MainHome/MainHome.vue'
import Login from '../components/Login.vue'
import Message from '../components/Message.vue'
export default {
  name: 'home',
  components: {
    MainHeader,
    MainHome,
    Login,
    Message
  },
  data () {
    return {
      activeChange: 0, // navbar索引
      examList: [], //  筛选后的最终数据
      dataBase: [], //  axios获取到的原始数据
      active: 0, //  登录状态
      Status: 0 //  登录错误提示代码
    }
  },
  methods: {
    getExamData () {
      axios.get('https://solace-lee.github.io/json/exam.json')
        .then(this.examData)
      //  获取原始数据
    },
    examData (res) {
      res = res.data
      if (res) {
        this.dataBase = res
      }
      //  原始数据存储到database
      let loginActive = localStorage.getItem('loginActive')
      let studentName = localStorage.getItem('studentName')
      let className = localStorage.getItem('className')
      if (loginActive === 1) {
        this.loginInfo({ userName: studentName, className: className })
      }
      //  判断本地是否有保存登录状态，如果是，则立马登录
    },
    indexChange (index) {
      console.log('index=' + index)
      this.activeChange = index
      // 根据页面更改navbar的索引值
    },
    loginInfo (info) {
      this.examList = []
      //  登录前清空历史记录
      const data = this.dataBase
      // console.log(data)
      data.forEach((item, index) => {
        if (item.name === info.userName && item.className === info.className) {
          this.examList.push(item)
          if (this.examList.length > 0) {
            this.active = 1 * 1
            localStorage.setItem('loginActive', this.active)
            console.log(this.active + '登录成功代码')
            //  遍历原始数据，找到匹配项然后push到最终记录中，同时保存登录状态到本地
          }
        } else {
          this.Status = 2 * 1
          console.log(this.Status + '登录代码')
          //  没有找到匹配项登录不成功，修改提醒状态
        }
      })
    },
    loginOut (outNO) {
      this.active = outNO
      //  退出登录重置登录状态
    },
    reset (i) {
      setTimeout(() => {
        this.Status = i * 1
        console.log(this.Status + 'this.Status')
        //  3秒后重置错误提示状态
      }, 3000)
    }
  },
  mounted () {
    //  do something after mounting vue instance
    this.getExamData()
    // 挂载后开始获取原始数据
    let loginActive = localStorage.getItem('loginActive')
    if (loginActive === 1) {
      this.active = loginActive * 1
      // 读取本都登录状态，如果有，则隐藏登录页
    }
  }
}
</script>
<style lang="stylus" scoped>
 @import '../../src/assets/style/varibles.styl'
  .content
    position: absolute
    left: 0
    right: 0
    top: $headerHeight
    bottom: 0
</style>
