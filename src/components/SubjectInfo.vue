<template lang="html">
  <div class="subject-info" @click="hidden">
    <div class="bg" @click="hidden">
      <div class="title border-bottom">{{subjectInfo[0].name}}单科详情</div>
      <cube-scroll>
        <div class="list-wrapper">
          <div class="list">
            <div class="content border-bottom" v-for="(item, index) of subjectInfo" :key="index">
              <div class="details">{{item.subject}}</div>
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
    subjectInfo: Array
  },
  methods: {
    hidden () {
      this.$emit('subjectHidden')
      //  监听点击事件，点击后隐藏科目详情
      // console.log('subjectHidden')
    }
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
  .line
    height: $footerHeight
</style>
