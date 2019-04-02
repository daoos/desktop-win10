<template>
  <div id="start-menu" @click.stop="">
    <div class="list win10-menu-hidden animated animated-slideOutLeft">
      <div class="item" @click="exit">
        <i class="black icon fa fa-power-off fa-fw"></i><span class="title">关闭</span>
      </div>
      <div class="item" @click="openApp({title: '切换壁纸', path: '/static/plugins/theme_switcher/theme_switcher.html',icon: 'icon fa fa-fw fa-picture-o blue', id: 'wall'})">
        <i class="icon fa fa-fw fa-picture-o blue"></i><span class="title">切换壁纸</span>
      </div>
    </div>
    <div class="blocks">
      <div class="menu-group" v-for="row in startMenus" :key="row.name">
        <div class="group-title">{{row.name}}</div>
        <grid-layout
                     :layout="row.data"
                     :col-num="12"
                     :row-height="80"
                     :vertical-compact="true"
                     :margin="[10, 10]"
                     :isDraggable="false"
                     :isResizable="false"
                     :use-css-transforms="true">
          <grid-item v-for="item in row.data" :key="item.i"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :i="item.i">
            <div class="card" :style="{background: item.color}" @click="openApp(item)">
              <i class="icon" :class="item.icon"></i>
              <span class="title">{{item.title}}</span>
            </div>
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
const GridLayout = VueGridLayout.GridLayout
const GridItem = VueGridLayout.GridItem

export default {
  inject: ['startMenus', 'desktop'],
  components: {
    GridLayout, GridItem
  },
  data () {
    return {
    }
  },
  methods: {
    exit () {
      this.$emit('exit')
    },
    openApp (app) {
      this.desktop.openWindow({
        url: app.path,
        icon: app.icon,
        title: app.title,
        id: app.i
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #start-menu{
    position: fixed;
    bottom: 41px;
    background-color: rgba(19, 23, 28, 0.81);
    height: 60%;
    width: 75%;
    max-width: 880px;
    overflow: auto;
    padding-left: 10px;
    z-index: 19930000;
    overflow-y: hidden;
    transition: bottom 0.5s;
    &.hidden{
      bottom: -70%;
    }
    .list{
      width: 240px;
      padding: 5px 10px;
      font-size: 12px;
      height: 100%;
      .item, .sub-item {
        color: white;
        margin: 1px 0;
        line-height: 40px;
        padding: 0 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        transition: background-color 0.3s;
        position: relative;
        width: calc(100% - 20px);
        &:hover{
          background-color: rgba(72, 72, 72, 0.58);
          cursor: pointer;
        }
        .icon{
          line-height: 36px;
          font-size: 22px;
          float: left;
          margin-right: 0.5em;
          width: 36px;
          position: relative;
          top: 2px;
          background-color: #393D49;
        }
      }
      .sub-item{
        padding-left: 30px;
        width: calc(100% - 40px);
      }
    }
    .menu-group{
      width: 50%;
      .group-title{
        color: #fff;
        padding: 5px;
        padding-top: 12px;
        font-size: 13px;
      }
    }
    .blocks{
      position: absolute;
      top: 0px;
      right: 0px;
      display: flex;
      width: calc(100% - 260px);
      .card{
        height: 100%;
        opacity: 0.85;
        background-color: rgb(58, 85, 194);
        color: #fff;
        cursor: pointer;
        &:hover{
          border: 1px solid #eee;
        }
        .icon{
          width: 50px;
          height: 50px;
          position: absolute;
          margin: -20px -25px;
          left: 50%;
          top: 40%;
          font-size: 50px;
        }
        .title{
          display: inline-block;
          position: absolute;
          bottom: 10px;
          left: 20px;
        }
      }
    }
  }

</style>
