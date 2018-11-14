<template lang="html">
  <div class="home">
    <main-header
      :activeChange="activeChange"
      :active="active"
      @loginOut="loginOut"
      @refresh="getExamData"
    ></main-header>
    <main-home
      class="content"
      :examList="examList"
      :classList="classList"
      :active="active"
      @change="indexChange"
    ></main-home>
    <login
      @loginInfo="loginInfo"
      @teacherLoginInfo="teacherLoginInfo"
      :active="active"
    ></login>
    <message
      :active="active"
      :Status="Status"
      @reset="reset"
    ></message>
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
      examList: [], //  筛选后的最终考试数据
      classList: [], // 科任教师任课的班级
      dataBase: [], //  axios获取到的原始数据
      teacherDataBase: [], // axios获取到的教师原始数据
      active: 0, //  登录状态
      Status: 0 //  登录错误提示代码
    }
  },
  methods: {
    getExamData () {
      //  获取原始学生数据
      this.Status = 1 * 1
      // 传递刷新数据库代码
      let getTime = new Date().getTime()
      //  解决浏览器缓存
      let url = 'https://solace-lee.github.io/json/exam.json' + '?time=' + getTime
      // axios.get('/api/exam.json')
      axios.get(url)
        .then(this.examData)
        .then(this.getTeacherData)
        .catch(() => {
          this.Status = 3 * 1
        })
    },
    getTeacherData () {
      //  获取原始教师数据
      let getTime = new Date().getTime()
      let teacherUrl = 'https://solace-lee.github.io/json/teacher.json' + '?time=' + getTime
      // axios.get('/api/teacher.json')
      axios.get(teacherUrl)
        .then(this.teacherData)
        .catch(() => {
          this.Status = 3 * 1
        })
    },
    examData (res) {
      res = res.data
      if (res) {
        this.dataBase = res
      }
      //  原始数据存储到database
      let loginActive = localStorage.getItem('loginActive')
      if (loginActive == 1) {
        let userName = localStorage.getItem('userName')
        let idName = localStorage.getItem('idName')
        this.loginInfo({ userName: userName, className: idName })
      }
      //  判断本地是否有保存家长登录状态，如果是，则立马登录
    },
    teacherData (res) {
      res = res.data
      // console.log(res)
      // 教师原始数据
      if (res) {
        this.teacherDataBase = res
      }
      let loginActive = localStorage.getItem('loginActive')
      if (loginActive == 2) {
        let userName = localStorage.getItem('userName')
        let idName = localStorage.getItem('idName')
        this.teacherLoginInfo({ userName: userName, className: idName })
      }
      //  判断本地是否有保存教师登录状态，如果是，则立马登录
    },
    indexChange (index) {
      // console.log('index=' + index)
      this.activeChange = index
      // 根据页面更改navbar的索引值
    },
    loginInfo (info) {
      this.examList = []
      //  登录前清空历史记录
      const data = this.dataBase
      // console.log(data)
      data.forEach((item, index) => {
        if (item.name == info.userName && item.studentID == info.className) {
          this.examList.push(item)
          if (this.examList.length > 0) {
            this.active = 1 * 1
            localStorage.setItem('loginActive', this.active)
            // console.log(this.active + '登录成功代码')
            //  遍历原始数据，找到匹配项然后push到最终记录中，同时保存登录状态到本地
          }
        } else if (index == data.length - 1 && this.active != 1) {
          this.Status = 2 * 1
          // console.log(this.Status + '登录代码')
          //  没有找到匹配项登录不成功，修改提醒状态
        }
      })
    },
    teacherLoginInfo (info) {
      this.classList = []
      let allClass = '所有班级'
      this.classList.push(allClass)
      //  登录前清空历史记录
      const teacherData = this.teacherDataBase
      // console.log(data)
      teacherData.forEach((item, index) => {
        if (item.name == info.userName && item.teacherid == info.className) {
          // this.examList = data
          if (item.class8) {
            this.classList.push(item.class1, item.class2, item.class3, item.class4, item.class5, item.class6, item.class7, item.class8)
            this.filter()
          } else if (item.class7) {
            this.classList.push(item.class1, item.class2, item.class3, item.class4, item.class5, item.class6, item.class7)
            this.filter()
          } else if (item.class6) {
            this.classList.push(item.class1, item.class2, item.class3, item.class4, item.class5, item.class6)
            this.filter()
          } else if (item.class5) {
            this.classList.push(item.class1, item.class2, item.class3, item.class4, item.class5)
            this.filter()
          } else if (item.class4) {
            this.classList.push(item.class1, item.class2, item.class3, item.class4)
            this.filter()
          } else if (item.class3) {
            this.classList.push(item.class1, item.class2, item.class3)
            this.filter()
          } else if (item.class2) {
            this.classList.push(item.class1, item.class2)
            this.filter()
          } else if (item.class1) {
            this.classList.push(item.class1)
            this.filter()
          }
          this.active = 2 * 1
          localStorage.setItem('loginActive', this.active)
          // console.log(this.active + '教师登录成功代码')
          //  遍历教师数据，找到匹配项后确认登录，同时保存登录状态到本地
        } else if (index == teacherData.length - 1 && this.active != 2) {
          this.Status = 2 * 1
          // console.log(this.Status + '登录代码')
          //  没有找到匹配项登录不成功，修改提醒状态
        }
      })
    },
    filter () {
      this.examList = []
      //  登录前清空历史记录
      // console.log(this.classList)
      //  任课班级列表
      const list = this.classList
      const data = this.dataBase
      data.forEach((item, index) => {
        for (var i = 0; i < list.length; i++) {
          if (list[i] == item.className) {
            this.examList.push(item)
          }
        }
      })
    },
    loginOut (outNO) {
      this.active = outNO
      //  退出登录重置登录状态
    },
    reset () {
      setTimeout(() => {
        this.Status = 0 * 1
        // console.log(this.Status + 'this.Status')
        //  3秒后重置错误提示状态
      }, 3000)
    }
  },
  mounted () {
    //  do something after mounting vue instance
    this.getExamData()
    // 挂载后开始获取原始数据
    let loginActive = localStorage.getItem('loginActive')
    // 是否读取上一次访问的登录状态
    if (loginActive == 1 || loginActive == 2) {
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
