<template lang="html">
  <div class="exam-list">
    <div class="exam-info">
      <div class="content border-bottom">
        <div class="name">考试列表</div>
        <div class="sum">总分</div>
        <div class="number">级排</div>
        <div class="date">班排</div>
      </div>
    </div>
    <div class="exam-content">
      <cube-scroll :options="scrollOptions">
        <div class="list-wrapper">
          <div class="content border-bottom" v-for="(item, index) of examList" :key="item.id" @click="examInfo(index)">
            <div class="name">{{item.examName}}</div>
            <div class="sum">{{item.sum}}</div>
            <div class="number">{{item.schoolRank}}</div>
            <div class="date">{{item.classRank}}</div>
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
    examList: Array
  },
  data () {
    return {
      scrollOptions: {
        directionLockThreshold: 0
      }
    }
  },
  methods: {
    examInfo (index) {
      this.$emit('openIndex', index)
      //  向上派发点击事件及索引
    }
  },
  mounted () {
    let contents = document.getElementsByClassName('list-wrapper')[0]
    let innerwidth = window.innerWidth
    contents.style.width = innerwidth + 'px'
    console.log('手机屏幕宽度' + innerwidth)
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
