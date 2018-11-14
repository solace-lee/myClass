<template lang="html">
  <div class="StudentList">
    <div class="close iconfont" @click="hidden">&#xe809;</div>
    <div class="bg">
      <div class="content border-bottom">
        <div class="name">姓名</div>
        <div class="sum">总分</div>
        <div class="number">级排</div>
        <div class="date">班排</div>
      </div>
      <cube-scroll>
        <div class="list-wrapper">
          <div class="content border-bottom" v-for="(item, index) of selectExamList" :key="index" @click="examInfo(index)">
            <div class="name">{{item.name}}</div>
            <div class="sum">{{item.sum}}</div>
            <div class="number">{{item.schoolRank}}</div>
            <div class="date">{{item.classRank}}</div>
          </div>
          <div class="line"></div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentList',
  props: {
    selectExamList: Array
  },
  methods: {
    hidden () {
      this.$emit('studentListHidden')
      //  监听点击事件，点击后隐藏成绩详情
      // console.log('hidden')
    },
    examInfo (index) {
      // console.log('激活了')
      this.$emit('openIndex', index)
      //  向上派发点击事件及索引
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../src/assets/style/varibles.styl'
.StudentList
  z-index: 10
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.5)
  .close
    color: #fff
    text-align: center
    font-size: .6rem
    padding: 5%
  .bg
    position: absolute
    box-sizing: border-box
    top: 10%
    left: 10%
    right: 10%
    bottom: 10%
    overflow: hidden
    background: $bgColor
    border-radius: 5px
    color: #fff
    text-align: center
    padding: 5px
    font-size: .38rem
    .content
      // box-sizing: border-box
      display: flex;
      height: 1rem
      line-height: 1rem
      font-size: .36rem
      text-align: center
      padding: 0 8px
      .name
        flex: 3
      .sum
        flex: 2
        // color: #4169E1
      .number
        flex: 2
        // color: #C71585
      .date
        flex: 2
        // color: #483D8B
    .line
      height: 1.2rem
</style>
