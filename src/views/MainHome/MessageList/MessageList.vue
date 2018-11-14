<template lang="html">
  <div class="MessageList">
    <div class="about">
      <div class="row">
        <div class="title" @click="subject('chinese')">语文</div>
        <div class="title" @click="subject('math')">数学</div>
      </div>
      <div class="row">
        <div class="title" @click="subject('english')">英语</div>
        <div class="title" @click="subject('politics')">政治</div>
      </div>
      <div class="row">
        <div class="title" @click="subject('biology')">生物</div>
        <div class="title" @click="subject('geography')">地理</div>
      </div>
      <div class="row">
        <div class="title" @click="subject('history')">历史</div>
        <div class="title" @click="subject('physics')">物理</div>
      </div>
      <div class="row">
        <div class="title" @click="subject('chemistry')">化学</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  methods: {
    subject (info) {
      this.$emit('selectSubject', info)
      // 向上派发点中的科目信息
      // console.log(info)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../src/assets/style/varibles.styl'
.MessageList
  .about
    box-sizing: border-box
    margin: .2rem
    font-size: .34rem
    line-height: .86rem
    text-align: center
    .row
      display: flex
      .title
        flex: 1
        margin: .2rem
        height: 1rem
        border-radius: .1rem
        line-height: 1rem
        background: $bgColor
        font-size: .4rem
        color: #fff
</style>
