<template lang="html">
  <div class="mainhome">
    <div class="content">
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop=false
          :initial-index="initialIndex"
          :auto-play=false
          :show-dots=false
          :options="slideOptions"
          @change="changePage"
        >
          <cube-slide-item>
            <exam-list
              :examList="examList"
              :classList="classList"
              :selectList="selectList"
              :examNumber="examNumber"
              :active="active"
              @openIndex="openIndex"
              @selectClass="selectClass"
              @selectExam="selectExam"
            ></exam-list>
          </cube-slide-item>

          <cube-slide-item>
            <message-list @selectSubject="selectSubject"></message-list>
          </cube-slide-item>

          <cube-slide-item>
            <up-load-list></up-load-list>
          </cube-slide-item>

        </cube-slide>
      </div>
      <cube-tab-bar
        v-model="selectedLabelSlotsOnly"
        @click="clickHandler"
        @change="changeHandler">
        <!-- <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
          <i slot="icon" :class="item.icon"></i>
        </cube-tab> -->
        <cube-tab label="考试列表">
          <div class="iconfont">&#xe6f3;</div>
          <!-- use en empty tag to replace default slot -->
          <span></span>
        </cube-tab>
        <cube-tab label="单科成绩">
          <div class="iconfont">&#xe706;</div>
          <!-- use en empty tag to replace default slot -->
          <span></span>
        </cube-tab>
        <cube-tab label="成绩上传">
          <div class="iconfont">&#xec46;</div>
          <!-- use en empty tag to replace default slot -->
          <span></span>
        </cube-tab>
      </cube-tab-bar>
      <exam-info v-show="show" :openInfo="openInfo" @hidden="hidden"></exam-info>
      <subject-info v-if="subjectShow" @subjectHidden="subjectHidden" :subjectInfo="subjectInfo" :active="active" :classList="classList" :examNumber="examNumber"></subject-info>
      <student-list v-if="studentListShow" :selectExamList="selectExamList" @studentListHidden="studentListHidden" @openIndex="openIndex"></student-list>
    </div>
  </div>
</template>

<script>
import ExamList from './ExamList/ExamList.vue'
import MessageList from './MessageList/MessageList.vue'
import UpLoadList from './UpLoadList/UpLoadList.vue'
import ExamInfo from '../../components/ExamInfo.vue'
import SubjectInfo from '../../components/SubjectInfo.vue'
import StudentList from '../../components/StudentList.vue'
export default {
  name: 'mainhome',
  props: {
    examList: Array,
    classList: Array,
    active: Number
  },
  components: {
    ExamList,
    MessageList,
    UpLoadList,
    ExamInfo,
    SubjectInfo,
    StudentList
  },
  data () {
    return {
      openInfo: {},
      subjectInfo: [],
      selectList: [],
      selectExamList: [],
      examNumber: [],
      show: false,
      subjectShow: false,
      studentListShow: false,
      initialIndex: 0,
      selectedLabelSlotsOnly: '考试列表',
      tabs: [{
        label: '考试列表',
        icon: 'cubeic-home'
      }, {
        label: '单科成绩',
        icon: 'cubeic-message'
      }, {
        label: '成绩上传',
        icon: 'cubeic-hot'
      }],
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  watch: {
    initialIndex () {
      // 保存最后一次切换的nav页索引到本地存储
      sessionStorage.setItem('index', this.initialIndex)
      this.$emit('change', this.initialIndex)
    },
    examList () {
      let data = this.examList
      this.examNumber = []
      this.selectList = []
      data.forEach((item, index) => {
        if (this.examNumber.indexOf(item.examName) == -1) {
          this.examNumber.push(item.examName)
          //  获取原始数据中的考试名称，并去重
        }
      })
      this.selectList = this.examList
    }
  },
  methods: {
    clickHandler (label) {
      //  适合用来刷新（点击导航栏按钮事件）
      // console.log(label)
    },
    changeHandler (label) {
      //  监听导航栏改变事件
      switch (label) {
        case '考试列表':
          this.initialIndex = 0
          break
        case '单科成绩':
          this.initialIndex = 1
          break
        case '成绩上传':
          this.initialIndex = 2
          break
      }
      // if you clicked different tab, this methods can be emitted
    },
    changePage (current) {
      //  监听到导航栏改变时激活的方法，将派发导航栏索引
      this.initialIndex = current * 1
      this.selectedLabelSlotsOnly = this.tabs[current].label
    },
    openIndex (index) {
      //  监听成绩列表的点击事件，和对应索引值，并将对应数据存储到openInfo
      this.show = true
      if (this.active == 1) {
        this.openInfo = this.examList[index]
      } else if (this.active == 2) {
        this.openInfo = this.selectExamList[index]
      }
      // console.log(this.openInfo)
    },
    selectSubject (info) {
      //  获取单科成绩页点击按钮的值
      this.subjectInfo = []
      let data = this.examList
      let subjectName = ''
      switch (info) {
        case 'chinese':
          subjectName = '语文'
          break
        case 'math':
          subjectName = '数学'
          break
        case 'english':
          subjectName = '英语'
          break
        case 'politics':
          subjectName = '政治'
          break
        case 'biology':
          subjectName = '生物'
          break
        case 'geography':
          subjectName = '地理'
          break
        case 'physics':
          subjectName = '物理'
          break
        case 'chemistry':
          subjectName = '化学'
          break
      }
      data.forEach((item, index) => {
        let list = {}
        list.name = subjectName
        list.subject = item.examName
        list.className = item.className
        list.studentName = item.name
        list.value = item[info]
        this.subjectInfo.push(list)
        //  将匹配的值压入subjectInfo中
      })
      this.subjectShow = true
    },
    hidden () {
      //  隐藏成绩详情
      this.show = false
    },
    subjectHidden () {
      //  隐藏单科成绩详情
      this.subjectShow = false
    },
    studentListHidden () {
      this.studentListShow = false
      console.log('隐藏了');
    },
    selectClass (value) {
      // console.log(value);
      let data = this.examList
      if (value == '所有班级') {
        this.selectList = data
      } else {
        this.selectList = []
        data.forEach((item, index) => {
          if (item.className == value) {
            this.selectList.push(item)
            //  获取与所选班级对应的学生成绩
          }
        })
      }
    },
    selectExam (exam) {
      this.selectExamList = []
      let data = this.selectList
      data.forEach((item, index) => {
        if (item.examName == exam) {
          this.selectExamList.push(item)
        }
      })
      this.studentListShow = true
      console.log('选中了考试名字' + exam);
    }
  },
  created () {
    //  读取最近一次切换nav的记录并在挂载后跳转到该页
    let index = sessionStorage.getItem('index')
    this.initialIndex = index * 1
    this.changePage(index)
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../src/assets/style/varibles.styl'
.mainhome
  .tab-slide-container
    position: fixed
    top: $headerHeight
    left: 0
    right: 0
    bottom: $footerHeight
  .cube-tab-bar
    position: fixed
    left: 0
    right: 0
    bottom: 0
    background: #eee
    height: $footerHeight
    line-height: .86rem
    font-size: .86rem;
  .cube-tab
    .iconfont
      font-size: .56rem
</style>
