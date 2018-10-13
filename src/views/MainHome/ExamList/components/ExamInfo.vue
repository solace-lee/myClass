<template lang="html">
  <div class="ExamInfo" @click="hidden">
    <div class="bg" @click="hidden">
      <div class="examInfoList">
        <div class="txt">{{openInfo.examName}}</div>
        <div class="content border-bottom">
          <div class="left-txt">{{openInfo.className}}</div>
          <div class="right-txt">{{openInfo.name}}</div>
        </div>
        <div class="content border-bottom">
          <div class="left-txt">语文</div>
          <div class="right-txt">{{openInfo.chinese}}</div>
        </div>
        <div class="content border-bottom">
          <div class="left-txt">数学</div>
          <div class="right-txt">{{openInfo.math}}</div>
        </div>
        <div class="content border-bottom">
          <div class="left-txt">英语</div>
          <div class="right-txt">{{openInfo.english}}</div>
        </div>
        <div class="content border-bottom">
          <div class="left-txt">政治</div>
          <div class="right-txt">{{openInfo.politics}}</div>
        </div>
        <div class="content border-bottom">
          <div class="left-txt">生物</div>
          <div class="right-txt">{{openInfo.biology}}</div>
        </div>
        <div class="content border-bottom">
          <div class="left-txt">地理</div>
          <div class="right-txt">{{openInfo.geography}}</div>
        </div>
        <div class="content border-bottom">
          <div class="left-txt">历史</div>
          <div class="right-txt">{{openInfo.geography}}</div>
        </div>
        <!-- <div class="content border-bottom">
          <div class="left-txt">物理</div>
          <div class="right-txt">0</div>
        </div>
        <div class="content border-bottom">
          <div class="left-txt">化学</div>
          <div class="right-txt">0</div>
        </div> -->
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
      </div>
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
      console.log('hidden')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../src/assets/style/varibles.styl'
.ExamInfo
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.4)
  .bg
    position: absolute
    top: 1.72rem
    left: 10%
    right: 10%
    // bottom: 16%
    background: $bgColor
    border-radius: 5px
    color: #fff
    .examInfoList
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
</style>
