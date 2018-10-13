<template lang="html">
  <div class="UpLoadList">
    <div class="about">
      <div class="title">
        您没有权限使用上传功能或该功能未上线
      </div>
      <div class="remember">
        如需上传成绩请联系开发人员
      </div>
      <div class="footer">
        <p>仅限白云区同和启明中学使用</p>
        <p>该APP为公益性开发，不收集个人信息</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpLoadList'
}
</script>

<style lang="stylus" scoped>
.UpLoadList
  .about
    color: #666
    font-size: .3rem
    line-height: .86rem
    text-align: center
    margin: 20% 0
    .title
      font-size: .36rem
      color: #C71585
    .remember
      font-weight: bold
</style>
