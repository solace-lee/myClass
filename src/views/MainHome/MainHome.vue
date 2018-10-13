<template lang="html">
  <div class="mainhome">
    <div class="content">
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop=false
          :initial-index="initialIndex"
          :auto-play=false
          :show-dots=false
          :options="slideOptions"
          @change="changePage"
        >
          <cube-slide-item>
            <exam-list :examList="examList" @openIndex="openIndex"></exam-list>
          </cube-slide-item>

          <cube-slide-item>
            <message-list></message-list>
          </cube-slide-item>

          <cube-slide-item>
            <up-load-list></up-load-list>
          </cube-slide-item>

        </cube-slide>
      </div>
      <cube-tab-bar
        v-model="selectedLabelSlotsOnly"
        @click="clickHandler"
        @change="changeHandler">
        <!-- <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
          <i slot="icon" :class="item.icon"></i>
        </cube-tab> -->
        <cube-tab label="考试列表">
          <div class="iconfont">&#xe6f3;</div>
          <!-- use en empty tag to replace default slot -->
          <span></span>
        </cube-tab>
        <cube-tab label="成绩详情">
          <div class="iconfont">&#xe706;</div>
          <!-- use en empty tag to replace default slot -->
          <span></span>
        </cube-tab>
        <cube-tab label="成绩上传">
          <div class="iconfont">&#xec46;</div>
          <!-- use en empty tag to replace default slot -->
          <span></span>
        </cube-tab>
      </cube-tab-bar>
      <exam-info v-show="show" :openInfo="openInfo" @hidden="hidden"></exam-info>
    </div>
  </div>
</template>

<script>
import ExamList from './ExamList/ExamList.vue'
import MessageList from './MessageList/MessageList.vue'
import UpLoadList from './UpLoadList/UpLoadList.vue'
import ExamInfo from './ExamList/components/ExamInfo.vue'
export default {
  name: 'mainhome',
  props: {
    examList: Array
  },
  components: {
    ExamList,
    MessageList,
    UpLoadList,
    ExamInfo
  },
  data () {
    return {
      openInfo: {},
      show: false,
      initialIndex: 0,
      selectedLabelSlotsOnly: '考试列表',
      tabs: [{
        label: '考试列表',
        icon: 'cubeic-home'
      }, {
        label: '成绩详情',
        icon: 'cubeic-message'
      }, {
        label: '成绩上传',
        icon: 'cubeic-hot'
      }],
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  watch: {
    initialIndex () {
      // 保存最后一次切换的nav页索引到本地存储
      localStorage.setItem('index', this.initialIndex)
      this.$emit('change', this.initialIndex)
    }
  },
  methods: {
    clickHandler (label) {
      //  适合用来刷新（点击导航栏按钮事件）
      console.log(label)
    },
    changeHandler (label) {
      //  监听导航栏改变事件
      switch (label) {
        case '考试列表':
          this.initialIndex = 0
          break
        case '成绩详情':
          this.initialIndex = 1
          break
        case '成绩上传':
          this.initialIndex = 2
          break
      }
      // if you clicked different tab, this methods can be emitted
    },
    changePage (current) {
      //  监听到导航栏改变时激活的方法，将派发导航栏索引
      this.initialIndex = current * 1
      this.selectedLabelSlotsOnly = this.tabs[current].label
    },
    openIndex (index) {
      //  监听成绩列表的点击事件，和对应索引值，并将对应数据存储到openInfo
      this.openInfo = this.examList[index]
      this.show = true
      // console.log(this.openInfo)
    },
    hidden () {
      //  隐藏成绩详情
      this.show = false
    }
  },
  created () {
    //  读取最近一次切换nav的记录并在挂载后跳转到该页
    let index = localStorage.getItem('index')
    this.initialIndex = index * 1
    this.changePage(index)
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../src/assets/style/varibles.styl'
.mainhome
  .tab-slide-container
    position: fixed
    top: $headerHeight
    left: 0
    right: 0
    bottom: $footerHeight
  .cube-tab-bar
    position: fixed
    left: 0
    right: 0
    bottom: 0
    background: #eee
    height: $footerHeight
    line-height: .86rem
    font-size: .86rem;
  .cube-tab
    .iconfont
      font-size: .56rem
</style>
