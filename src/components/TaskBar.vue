<template>
  <div id="task_bar" @contextmenu.prevent.stop="showContextmenu">
    <div class="btn_group btn_group_left">
      <div class="btn" @click.stop="$emit('menuToggle')"><span class="fa fa-windows"></span></div>
    </div>
    <div class="btn_group btn_group_middle">
      <div @click="desktop.taskMiddleBarClick(item)" v-for="item in desktop.openedWindows" :key="item.index" class="btn" :class="{active: item.active}">
        <div class="btn_title">
          <i class="icon" :class="item.icon"></i> {{item.title}}
        </div>
      </div>
    </div>
    <div class="btn_group btn_group_right">
      <div class="btn btn_time">{{time.hours}}:{{time.mins}}<br/>{{time.year}}/{{time.month}}/{{time.date}}</div>
      <div class="btn btn_message" @click.stop="$emit('messageToggle')"><span id="win10-msg-nof" class="fa fa-comment-o"></span></div>
      <div class="btn btn_show_desktop" @click="showDesktop"></div>
    </div>
    <div id="context-menu-bar" class="content-menu">
      <ul>
        <li @click="desktop.showAllWindows()">
          <i class="iconfont icon-BMSzhuanqu_quanping"></i> 全部显示
        </li>
        <li  @click="desktop.hideAllWindows()">
          <i class="iconfont icon-BMSzhuanqu_suofang"></i> 全部隐藏
        </li>
        <li  @click="desktop.closeAllWindows()">
          <i class="iconfont icon-BMSzhuanqu_suofang"></i> 全部关闭
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    desktop: {
      type: Object
    }
  },
  data () {
    return {
      time: {}
    }
  },
  computed: {},
  mounted () {
  },
  created () {
    this.initTime()
  },
  methods: {
    initTime () {
      setInterval(() => {
        const myDate = new Date()
        const year = myDate.getFullYear()
        const month = myDate.getMonth() + 1
        const date = myDate.getDate()
        const hours = myDate.getHours()
        let mins = myDate.getMinutes()
        if (mins < 10) {
          mins = '0' + mins
        }
        this.time = {
          year, month, date, hours, mins
        }
      }, 1000)
    },
    showContextmenu (e) {
      this.desktop.showContextmenu(e, 'context-menu-bar');
    },
    showDesktop () {
      this.desktop.hideAllWindows()
    }
  }
}
</script>
<style lang="scss" scoped>
  #task_bar{
    @import "./contextmenu";
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 40px;
    background-color: rgba(19, 23, 28, 0.9);
    z-index: 19930813;
    .btn_group {
      height: 100%;
      .btn{
        float: left;
        color: white;
        text-align: center;
        line-height: 40px;
        height: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        transition: background-color 0.3s;
        &:hover{
          background-color: rgba(106, 105, 100, 0.71);
          cursor: pointer;
        }
      }
    }
    .btn_group_left {
      float: left;
      overflow: auto;
      max-width: 200px;
      .btn{
        height: 100%;
        width: 48px;
        overflow: hidden;
        font-size: 20px;
      }
    }
    .btn_group_middle {
      float: left;
      width: calc(100% - 240px);
      overflow: auto;
      .btn{
        float: left;
        box-sizing: border-box;
        height: inherit;
        max-width: 140px;
        border-bottom: 4px solid #707070;
        line-height: 40px;
        color: white;
        text-align: center;
        font-size: 12px;
        word-break: keep-all;
        padding: 0 10px;
        margin-right: 1px;
        position: relative;
        &.active{
          background-color: #3B3D3F;
        }
        &:hover{
          cursor: pointer;
        }
      }
      .btn_title{
        float: left;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        white-space: nowrap;
        .icon{
          font-size: 15px;
          padding: 1px;
          width: 20px;
          height: 20px;
          line-height: 20px;
          display: inline-block;
          border-radius: 3px;
          text-align: center;
          margin-right: 0.5em;
        }
      }
      &::-webkit-scrollbar {
        width: 2px;
      }
      &::-webkit-scrollbar-track {
        background-color: #808080;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(30, 39, 34, 0.41);
      }
    }
    .btn_group_right {
      float: right;
      max-width: 200px;
      overflow: auto;
      .btn {
        height: 100%;
        min-width: 4px;
        padding: 0 10px;
        font-size: 12px;
      }
      .btn_time{
        font-size: 12px;
        line-height: 20px !important
      }
      .btn_message {
        font-size: 20px;
        cursor: pointer;
      }
      .btn_show_desktop{
        border-left: grey 1px solid;
        width: 5px;
        cursor: pointer;
        margin-left: 3px;
        padding: 0 !important
      }
    }
  }

</style>
