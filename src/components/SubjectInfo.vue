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
      <div class="content border-bottom" v-if="!activeShow">
        <div class="details">平均分</div>
        <div :class="(this.flat >= 60) ? 'details' : 'details-red'">{{this.flat}}</div>
        <div class="details">及格率</div>
        <div :class="(this.pass >= 60) ? 'details' : 'details-red'">{{this.pass + '%'}}</div>
      </div>
      <div class="content border-bottom" v-if="!activeShow">
        <div class="details">排名</div>
        <div class="details">姓名</div>
        <div class="details">成绩</div>
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
            <div class="content border-bottom" v-for="(item, index) of subjectInfo4" :key="index">
              <div class="details">{{index + 1}}</div>
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
      subjectInfo4: [],
      activeShow: true,
      value: '所有班级',
      flat: '',
      pass: '',
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
      this.subjectInfo4 = []
      let data = this.subjectInfo2
      data.forEach((item, index) => {
        if (item.subject == value) {
          this.subjectInfo3.push(item)
        }
      })
      let arr = this.subjectInfo3
      arr.sort(function(a,b){
        return b.value - a.value;
      })
      this.subjectInfo4 = arr
      // 单科成绩按成绩排序
      let sum = 0
      let count = 0
      arr.forEach((item, index) => {
        sum += item.value
        if (item.value >= 60) {
          count++
        }
      })
      this.flat = sum / arr.length
      this.flat = this.flat.toFixed(2)
      count = count / arr.length * 100
      this.pass = count.toFixed(2)
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
      font-size: .38rem
      line-height: .38rem
      padding-bottom: .1rem
    .content
      display: flex
      .details
        flex: 1
        margin: .2rem 0
        // height: 1.2rem
        // line-height: 1.2rem
        font-size: .32rem
      .details-red
        flex: 1
        color: #DC143C
        margin: .2rem 0
        // height: 1.2rem
        // line-height: 1.2rem
        font-size: .32rem
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
    height: 2.6rem
</style>
