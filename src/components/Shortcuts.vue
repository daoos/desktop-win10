<template>
  <div id="desktop-shortcuts" class="shortcuts-hidden">
    <template v-for="app in shortcuts">
      <div class="shortcut-item" :key="app.id" :title="app.title"
           @dblclick="openApp(app)">
        <Icon class="icon" :type="app.icon"></Icon>
        <div class="title">{{app.title}}</div>
      </div>
    </template>
  </div>
</template>
<script>
/* global Win10 */
export default {
  props: {
    desktop: {
      type: Object
    },
    shortcuts: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.desktop.renderShortcuts('desktop-shortcuts')
  },
  methods: {
    openApp (app) {
      this.desktop.openWindow({
        url: app.path,
        icon: app.icon,
        title: app.title,
        id: app.id
      })
    }
  }
}
</script>
<style lang="scss">
  #desktop-shortcuts{
    height: calc(100% - 40px);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*flex-wrap: wrap;*/
    .shortcut-item{
      position: absolute;
      width: 80px;
      height: 83px;
      overflow: hidden;
      cursor: pointer;
      padding: 0;
      transition: all 0.5s;
      &:hover{
        background-color: rgba(255, 255, 255, 0.11);
      }
      .icon{
        width: 50px;
        height: 50px;
        overflow: hidden;
        margin: 5px auto;
        color: white;
        box-sizing: border-box;
        text-align: center;
        border-radius: 5px;
        display: block;
        font-size: 37px;
        line-height: 50px;
      }
      .title {
        color: white;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        margin-bottom: 5px;
      }
    }
  }
</style>
