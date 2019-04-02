<template>
  <div class="desktop-wrapper" @contextmenu.prevent.stop="showContextmenu" @click="clickDesktop">
    <Shortcuts :desktop="desktop" :shortcuts="shortcuts"></Shortcuts>
    <TaskBar :desktop="desktop" ref="taskBar" @menuToggle="menuToggle" @messageToggle="messageToggle"></TaskBar>
    <message-center :class="{'hide-message': !isShowMessageCenter}" :messages="messages" @msgClick="$emit('msgClick')" @closeMessage="$emit('closeMessage')"  @clearAll="$emit('clearAll')"></message-center>
    <start-menu :class="{'hidden': !isShowStartMenu}"  @exit="$emit('exit')"></start-menu>
    <div id="context-menu-desktop" class="content-menu">
      <ul>
        <li @click="enableFullScreen">
          <i class="iconfont icon-BMSzhuanqu_quanping"></i> 进入全屏
        </li>
        <li @click="disableFullScreen">
          <i class="iconfont icon-BMSzhuanqu_suofang"></i> 退出全屏
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import desktop from './desktop'
import Shortcuts from './Shortcuts'
import TaskBar from './TaskBar'
import MessageCenter from './MessageCenter';
import StartMenu from './StartMenu';
export default {
  provide () {
    return {
      startMenus: this.startMenus,
      desktop
    }
  },
  props: {
    shortcuts: {
      type: Array,
      default () {
        return []
      }
    },
    startMenus: {
      type:Array,
      default () {
        return []
      }
    },
    messages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Shortcuts, TaskBar, MessageCenter, StartMenu
  },
  data () {
    return {
      desktop,
      isShowMessageCenter: false,
      isShowStartMenu: false
    }
  },
  created () {
    window.desktop = desktop;
    this.desktop.clickDesktop = this.clickDesktop;
  },
  methods: {
    showContextmenu (e) {
      this.desktop.showContextmenu(e, 'context-menu-desktop');
    },
    enableFullScreen () {
      const docElm = document.documentElement
      // W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      }
      // FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      }
      // Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
      }
      // IE11
      else if (docElm.msRequestFullscreen) {
        document.body.msRequestFullscreen()
      }
    },
    disableFullScreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },
    clickDesktop () {
      this.isShowMessageCenter = false;
      this.isShowStartMenu = false;
    },
    messageToggle () {
      this.isShowMessageCenter = !this.isShowMessageCenter;
    },
    menuToggle () {
      this.isShowStartMenu = !this.isShowStartMenu;
    }
  }
}
</script>
<style lang="scss" scoped>
  .desktop-wrapper {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    position: fixed;
    background: url("/static/img/wallpapers/main.jpg");
    @import "./contextmenu";
  }
</style>
