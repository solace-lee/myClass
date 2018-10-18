<template lang="html">
  <div class="Message">
    <div class="info" v-if="show">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    active: Number,
    Status: Number
  },
  data () {
    return {
      msg: '',
      show: false
    }
  },
  watch: {
    msg () {
      if (!this.msg) {
        //  msg值为空时为重置错误信息代码，不显示
        this.show = false
      } else {
        this.show = true
        setTimeout(() => {
          this.show = false
        }, 3000)
        //  显示提示信息并在3秒后隐藏
      }
    },
    active () {
      this.msg = ''
      switch (this.active) {
        case 1:
          this.msg = '登录成功'
          break
        case 0:
          this.msg = '已注销'
          this.resetStatus()
          //  注销后重置错误提示状态
          break
      }
    },
    Status () {
      switch (this.Status) {
        case 0:
          this.msg = ''
          break
        case 1:
          this.resetStatus()
          this.msg = '加载数据库'
          break
        case 2:
          this.msg = '填写有误'
          this.resetStatus()
          break
        case 3:
          this.resetStatus()
          this.msg = '网络异常'
          break
      }
    }
  },
  methods: {
    resetStatus () {
      this.$emit('reset')
      // 重置错误提示状态
    }
  }
}
</script>

<style lang="stylus" scoped>
.info
  position: fixed
  top: 74%
  left: 30%
  right: 30%
  // bottom: 14%
  color: #fff
  background: rgba(80, 187, 167, 0.8)
  text-align: center
  height: .6rem
  line-height: .6rem
  border-radius: .2rem
</style>
