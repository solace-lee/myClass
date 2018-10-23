<template lang="html">
  <div class="subject-info">
    <div class="close iconfont" @click="hidden">&#xe809;</div>
    <div class="bg">
      <div class="title border-bottom">{{subjectInfo[0].name}}单科详情</div>
      <div class="sels" v-if="!activeShow">
        <cube-select
        class="sel"
        v-model="value"
        :options="classList"
        :auto-pop="autoPop"
        :title="title"
        @change="changeClass"
        >
        </cube-select>
        <cube-select
        class="sel"
        v-model="value2"
        :options="examNumber"
        :auto-pop="autoPop"
        :title="title2"
        @change="changeExam"
        >
        </cube-select>
      </div>
      <cube-scroll>
        <div class="list-wrapper">
          <div class="list" v-if="activeShow">
            <div class="content border-bottom" v-for="(item, index) of subjectInfo" :key="index">
              <div class="details">{{item.subject}}</div>
              <div :class="(item.value >= 60) ? 'details' : 'details-red'">{{item.value}}</div>
            </div>
            <div class="line"></div>
          </div>
          <div class="list" v-if="!activeShow">
            <div class="content border-bottom" v-for="(item, index) of subjectInfo3" :key="index">
              <div class="details">{{item.studentName}}</div>
              <div :class="(item.value >= 60) ? 'details' : 'details-red'">{{item.value}}</div>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubjectInfo',
  props: {
    subjectInfo: Array,
    active: Number,
    classList: Array,
    examNumber: Array
  },
  data () {
    return {
      subjectInfo2: [],
      subjectInfo3: [],
      activeShow: true,
      value: '所有班级',
      value2: '',
      autoPop: false,
      title: '选择班级',
      title2: '选择考试'
    }
  },
  methods: {
    hidden () {
      this.$emit('subjectHidden')
      //  监听点击事件，点击后隐藏科目详情
      // console.log('subjectHidden')
    },
    change (value, index, text) {
      // console.log('change', value, index, text)
      this.$emit('selectClass', value)
    },
    changeClass (value, index, text) {
      let data = this.subjectInfo
      if (value == '所有班级') {
        this.subjectInfo2 = data
      } else {
        this.subjectInfo2 = []
        data.forEach((item, index) => {
          if (item.className == value) {
            this.subjectInfo2.push(item)
            //  获取与所选班级对应的学生成绩
          }
        })
      }
      this.changeExam(this.value2)
    },
    changeExam (value, index, text) {
      this.subjectInfo3 = []
      let data = this.subjectInfo2
      data.forEach((item, index) => {
        if (item.subject == value) {
          this.subjectInfo3.push(item)
        }
      })
      // console.log('选中了考试名字' + value)
    }
  },
  mounted () {
    if (this.active == 1) {
      this.activeShow = true
    } else if (this.active == 2) {
      this.activeShow = false
    }
    this.value2 = this.examNumber[0]
    this.subjectInfo2 = this.subjectInfo
    this.changeExam(this.value2)
  }
}
</script>

<style lang="stylus" scoped>
@import '../../src/assets/style/varibles.styl'
.subject-info
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.6)
  .close
    color: #fff
    text-align: center
    font-size: .6rem
    padding: 5%
  .bg
    position: absolute
    box-sizing: border-box
    overflow: hidden
    top: 10%
    left: 10%
    right: 10%
    bottom: 10%
    padding: .2rem
    background: $bgColor
    border-radius: 5px
    color: #fff
    text-align: center
    .title
      font-size: .42rem
      padding: .2rem
    .content
      display: flex
      .details
        flex: 1
        margin: .2rem
        // height: 1.2rem
        // line-height: 1.2rem
        font-size: .38rem
      .details-red
        flex: 1
        color: #DC143C
        margin: .2rem
        // height: 1.2rem
        // line-height: 1.2rem
        font-size: .38rem
    .sels
      // font-size: .3rem
      height: .66rem
      display: flex
      .sel
        flex: 1
        font-size: .3rem
        height: .66rem
        line-height: .3rem
  .line
    height: 1.4rem
</style>
