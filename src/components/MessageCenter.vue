<template>
  <div class="message-center" @click.stop="">
    <div class="center-title">
      <h4 style="float: left">通知中心 </h4>
      <span class="clean_all" @click="clearAll">全部清除</span>
    </div>
    <div class="msgs">
      <div class="msg" @click="$emit('msgClick')" v-for="(item,index) in messages" :key="index" :class="{'animated slideOutRight': item.isRemove}">
        <div class="title">{{item.title}}</div>
        <div class="content">{{item.content}}</div>
        <div class="btn_close_msg fa fa-close" @click="closeMessage(index, item)"></div>
      </div>
      <div v-if="!messages.length">没有新通知</div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    messages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  created () {

  },
  methods: {
    clearAll () {
      this.messages.forEach(item => {
        this.$set(item, 'isRemove', true);
      });
      setTimeout(() => {
        this.messages = [];
        this.$emit('clearAll');
      }, 500);
    },
    closeMessage (index, item) {
      this.$set(item, 'isRemove', true);
      setTimeout(() => {
        this.messages.splice(index, 1)
        this.$emit('closeMessage', item.id);
      }, 500);
    }
  }
}
</script>
<style lang="scss" scoped>
  .message-center {
    position: fixed;
    right: 0;
    bottom: 41px;
    width: 350px;
    background-color: rgba(19, 23, 28, 0.81);
    height: calc(100% - 40px);
    transition: all 0.5s;
    overflow-x: hidden;
    overflow-y: auto;
    color: white;
    box-sizing: border-box;
    z-index: 19930000;
    &.hide-message{
      right: -350px
    }
    .center-title{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding-left: 10px;
      transition: background-color 0.5s;
      .clean_all{
        color: grey;
        text-align: right;
        font-size: 12px;
        float: right;
        margin-top: 40px;
        margin-right: 24px;
        transition: color 0.5s;
        &:hover{
          cursor: pointer;
          color: white;
        }
      }
      &:hover{
        background-color: rgba(255, 255, 255, 0.19);
      }
    }
    .msgs {
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      padding: 10px;
      overflow: hidden;
      .msg {
        background: #2d2727;
        width: calc(100% - 40px);
        min-height: 40px;
        padding: 10px;
        margin-top: 6px;
        transition: background-color 0.5s;
        position: relative;
        .title {
          color: #c7c7c7;
          font-size: 14px;
          line-height: 28px;
        }
        .content {
          font-size: 12px;
          color: #9b9b9b;
          padding-bottom: 5px;
        }
        &:hover{
          background-color: rgba(255, 255, 255, 0.19);
          .title {
            color: white;
          }
          .btn_close_msg {
            color: grey;
          }
          .content {
            color: white;
          }
        }
        .btn_close_msg {
          cursor: pointer;
          color: transparent;
          padding: 3px;
          position: absolute;
          top: 11px;
          right: 11px;
          &:hover{
            color: white;
          }
        }
      }
    }
  }

</style>
