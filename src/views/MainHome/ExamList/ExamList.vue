<template lang="html">
  <div class="exam-list">
    <div class="exam-info">
      <div class="content border-bottom" v-if="titleShow">
        <div class="name">考试列表</div>
        <div class="sum">总分</div>
        <div class="number">级排</div>
        <div class="date">班排</div>
      </div>
      <div class="content border-bottom" v-if="!titleShow">
        <div class="name">考试列表</div>
        <cube-select
          class="name"
          v-model="value"
          :options="classList"
          :auto-pop="autoPop"
          :title="title"
          @change="change"
        >
        </cube-select>
        <!-- <div class="number">考试人数</div> -->
        <!-- <div class="number">级排</div> -->
      </div>
    </div>
    <div class="exam-content" v-if="titleShow">
      <cube-scroll :options="scrollOptions">
        <div class="list-wrapper">
          <div class="content border-bottom" v-for="(item, index) of examList" :key="index" @click="examInfo(index)">
            <div class="name">{{item.examName}}</div>
            <div class="sum">{{item.sum}}</div>
            <div class="number">{{item.schoolRank}}</div>
            <div class="date">{{item.classRank}}</div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="exam-content" v-if="!titleShow">
      <cube-scroll :options="scrollOptions">
        <div class="list-wrapper">
          <div class="content border-bottom" v-for="(item, index) of examNumber" :key="index" @click="selectExam(item)">
            <div class="name">{{item}}</div>
            <!-- <div class="sum"></div>
            <div class="number">{{examList.length}}</div> -->
            <!-- <div class="date">{{item.classRank}}</div> -->
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'exam-list',
  props: {
    examList: Array, // 原始数据
    classList: Array, // 匹配到的班级
    selectList: Array, // 对应选择筛选出的数据
    examNumber: Array, // 考试名称数据
    active: Number
  },
  data () {
    return {
      value: '所有班级',
      autoPop: false,
      title: '选择班级',
      titleShow: true,
      scrollOptions: {
        directionLockThreshold: 0
      },
      options: {
      }
    }
  },
  watch: {
    active () {
      if (this.active == 1) {
        this.titleShow = true
      } else if (this.active == 2) {
        this.titleShow = false
      }
    }
  },
  methods: {
    change (value, index, text) {
      // console.log('change', value, index, text)
      this.$emit('selectClass', value)
    },
    examInfo (index) {
      this.$emit('openIndex', index)
      //  向上派发点击事件及索引
    },
    selectExam (item) {
      this.$emit('selectExam', item)
    }
  },
  mounted () {
    let contents = document.getElementsByClassName('exam-content')[0]
    let innerwidth = window.innerWidth
    contents.style.width = innerwidth + 'px'
    // console.log('手机屏幕宽度' + innerwidth)
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../src/assets/style/varibles.styl'
.exam-info
  // box-sizing: border-box
  background: #eee
  height: $headerHeight
  line-height: $headerHeight
  font-size: .3rem
  text-align: center
  padding: 0 8px
  .content
    display: flex;
    .name
      flex: 2
    .sum
      flex: 1
    .number
      flex: 1
    .date
      flex: 1
.examInfoList
  position: fixed
  top: 20%
  left: 10%
  right: -10%
  bottom: 20%
  background: #000
  color: #fff
.exam-content
  position: absolute
  top: $headerHeight
  left: 0
  right: 0
  bottom: 0
  .list-wrapper
    // box-sizing: border-box
    .content
      // box-sizing: border-box
      display: flex;
      height: 1.2rem
      line-height: 1.2rem
      font-size: .36rem
      text-align: center
      padding: 0 8px
      .name
        flex: 2
      .sum
        flex: 1
        color: #4169E1
      .number
        flex: 1
        color: #C71585
      .date
        flex: 1
        color: #483D8B
</style>
