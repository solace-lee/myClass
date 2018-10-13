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
      if (this.Status === 0) {
        //  status值为0时为重置错误信息代码，不显示
        this.show = false
      } else {
        this.show = true
        setTimeout(() => {
          console.log(this.show)
          this.show = false
        }, 3000)
        //  显示提示信息并在3秒后隐藏
      }
    },
    active () {
      if (this.active === 1) {
        this.msg = '登录成功'
      } else if (this.active === 0) {
        this.msg = '已注销'
        this.resetStatus()
        //  注销后重置错误提示状态
      }
    },
    Status () {
      if (this.active === 0) {
        if (this.Status === 2) {
          this.resetStatus()
          this.msg = '填写有误'
        } else if (this.Status === 0) {
          this.msg = '正在重置提示信息'
        }
      }
    }
  },
  methods: {
    resetStatus () {
      this.$emit('reset', 0)
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
  background: rgba(0, 0, 0, 0.5)
  text-align: center
  height: .6rem
  line-height: .6rem
  border-radius: .2rem
</style>
