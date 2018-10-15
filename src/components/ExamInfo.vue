<template lang="html">
  <div class="ExamInfo" @click="hidden">
    <div class="bg" @click="hidden">
      <div class="txt">{{openInfo.examName}}</div>
      <cube-scroll>
        <div class="list-wrapper">
          <div class="content border-bottom">
            <div class="left-txt">学号:{{openInfo.className}}</div>
            <div class="right-txt">{{openInfo.name}}</div>
          </div>
          <div class="content border-bottom">
            <div class="left-txt">语文</div>
            <div :class="(openInfo.chinese >= 60) ? 'right-txt' : 'right-red'">{{openInfo.chinese}}</div>
          </div>
          <div class="content border-bottom">
            <div class="left-txt">数学</div>
            <div :class="(openInfo.math >= 60) ? 'right-txt' : 'right-red'">{{openInfo.math}}</div>
          </div>
          <div class="content border-bottom">
            <div class="left-txt">英语</div>
            <div :class="(openInfo.english >= 60) ? 'right-txt' : 'right-red'">{{openInfo.english}}</div>
          </div>
          <div class="content border-bottom">
            <div class="left-txt">政治</div>
            <div :class="(openInfo.politics >= 60) ? 'right-txt' : 'right-red'">{{openInfo.politics}}</div>
          </div>
          <div class="content border-bottom">
            <div class="left-txt">生物</div>
            <div :class="(openInfo.biology >= 60) ? 'right-txt' : 'right-red'">{{openInfo.biology}}</div>
          </div>
          <div class="content border-bottom">
            <div class="left-txt">地理</div>
            <div :class="(openInfo.geography >= 60) ? 'right-txt' : 'right-red'">{{openInfo.geography}}</div>
          </div>
          <div class="content border-bottom">
            <div class="left-txt">历史</div>
            <div :class="(openInfo.geography >= 60) ? 'right-txt' : 'right-red'">{{openInfo.geography}}</div>
          </div>
          <div class="content border-bottom">
            <div class="left-txt">物理</div>
            <div :class="openInfo.physics >= 60 ? 'right-txt' : 'right-red'">{{openInfo.physics}}</div>
          </div>
          <div class="content border-bottom">
            <div class="left-txt">化学</div>
            <div :class="openInfo.chemistry >= 60 ? 'right-txt' : 'right-red'">{{openInfo.chemistry}}</div>
          </div>
          <div class="sum">
            <div class="one">总分</div>
            <div class="two">年级排名</div>
            <div class="three">班级排名</div>
          </div>
          <div class="sum border-bottom">
            <div class="one">{{openInfo.sum}}</div>
            <div class="two">{{openInfo.schoolRank}}</div>
            <div class="three">{{openInfo.classRank}}</div>
          </div>
          <div class="line"></div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamInfo',
  props: {
    openInfo: Object
  },
  methods: {
    hidden () {
      this.$emit('hidden')
      //  监听点击事件，点击后隐藏成绩详情
      // console.log('hidden')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../src/assets/style/varibles.styl'
.ExamInfo
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.5)
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
    .txt
      margin: .2rem
    .content
      display: flex
      .left-txt
        flex: 1
        margin: .2rem
      .right-txt
        flex: 1
        color: #fff
        margin: .2rem
      .right-red
        flex: 1
        color: #DC143C
        margin: .2rem
    .sum
      display: flex
      font-size: .28rem
      .one
        flex: 1
        margin: .2rem 0
      .two
        flex: 1
        margin: .2rem 0
      .three
        flex: 1
        margin: .2rem 0
    .line
      height: $footerHeight
</style>
