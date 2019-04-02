/**
 * Created by HaijunZhang on 2019/3/28.
 */
import $ from 'jquery'
const layer = require('desktop-layer')
class Desktop {
  constructor () {
    this.init()
    this.openedWindows = []
  }
  init () {
    this.eveSet()
    this.clearWindows();
  }
  clearWindows () {
    $('.layui-layer-iframe').remove()
  }
  // 判断屏幕是否属于小屏
  isSmallScreen (size) {
    if (!size) {
      size = 768
    }
    const width = document.body.clientWidth
    return width < size
  }
  setBackground (url) {
    $('.desktop-wrapper').css({background: `url('${url}')`});
  }
  // 获取打开窗口层级最高的展示
  checkTop () {
    let maxIndex = 0;
    let maxZ = 0;
    let data = {};
    this.openedWindows.forEach(item => {
      if (!item.show) return;
      const layer = this.getLayeroByIndex(item.index)
      const z = layer.css('z-index');
      if (z > maxZ) {
        maxIndex = item.index
        maxZ = z;
        data = item
      }
    });
    this.hideAllbar();
    if (maxIndex) {
      this.setTop(this.getLayeroByIndex(maxIndex))
      this.taskMiddleBarClick(data)
    }
  }
  setTop (layer) {
    // 置顶窗口
    let maxZindex = 0
    $('.win10-open-iframe').each(function () {
      const z = parseInt($(this).css('z-index'))
      // $(this).css('z-index', z - 1)
      if (z > maxZindex) {
        maxZindex = z
      }
    })
    layer.css('z-index', maxZindex + 1)
  }
  hideWindowByIndex (index) {
    for (let item of this.openedWindows) {
      if (index === item.index) {
        item.show = false;
        break;
      }
    }
  }
  hideAllbar (data) {
    this.openedWindows.forEach(item => {
      if (data && data.index === item.index) return;
      item.active = false
    })
  }
  taskMiddleBarClick (data) {
    this.hideAllbar(data);
    const layer = this.getLayeroByIndex(data.index);
    if (data.show) { // 窗口展示
      if (data.active) { // taskbar选中
        data.show = false;
        data.active = false
        this.checkTop();
        layer.hide();
      } else {
        data.active = true;
        this.setTop(layer)
      }
    } else {
      data.active = true;
      data.show = true;
      this.setTop(layer)
      layer.show();
    }
  }
  // 获取打开窗口的宽度与偏移量
  getWindowAreaAndOffset (areaAndOffset) {
    let area = '';
    let offset = '';
    if (this.isSmallScreen() || areaAndOffset === 'max') {
      area = ['100%', (document.body.clientHeight - 40) + 'px']
      offset = ['0', '0']
    } else if (typeof areaAndOffset === 'object') {
      area = areaAndOffset[0]
      offset = areaAndOffset[1]
    } else {
      area = ['80%', '80%']
      if (this.openedWindows.length) {
        const item = [...this.openedWindows].pop();
        const layero = this.getLayeroByIndex(item.index);
        const offsets = layero.offset();
        // 坐标修正
        let x = offsets.left + 30;
        let y = offsets.top + 30;
        const x1 = $(window).width() * 0.2;
        const y1 = $(window).height() * 0.2;
        console.log(x, x1)
        console.log(y, y1);
        x = x > x1 ? x1 : x;
        y = y > y1 ? y1 : y;
        offset = [`${y}px`, `${x}px`]
      } else {
        offset = 'auto';
      }
    }
    return [area, offset]
  }
  getLayeroByIndex (index) {
    return $(`#layui-layer${index}`)
  }
  deleteWindowByIndex (index) {
    const key = this.openedWindows.findIndex(item => { return item.index === index });
    this.openedWindows.splice(key, 1);
  }
  // 判断当前窗口是否打开
  getOpenWindow (id) {
    let data = '';
    for (let a of this.openedWindows) {
      if (a.id === id) {
        data = a;
      }
    }
    return data;
  }
  openWindow (options) {
    const self = this;
    let { url, title, id, areaAndOffset, icon } = options;
    // 一个图标打开多次判断
    const openItem = this.getOpenWindow(id)
    if (openItem) {
      this.taskMiddleBarClick(Object.assign(openItem, { active: false }));
      return
    }
    const [area, offset] = this.getWindowAreaAndOffset(areaAndOffset);
    const reg = /^(https?:\/\/|\.\.?\/|\/\/?)/
    if (!reg.test(url)) {
      url = 'http://' + url
    }
    const index = layer.open({
      type: 2, // 2 为iframe
      maxmin: true, // 开启最大化最小化按钮
      title: `<i class="icon ${icon}"></i> ${title}`,
      resize: true,
      shade: 0,
      content: url,
      area: area,
      offset: offset,
      anim: 1,
      isOutAnim: true,
      skin: 'win10-open-iframe',
      cancel: function (index, layero) {
        self.deleteWindowByIndex(index);
        self.checkTop()
      },
      min: function (layero) {
        layero.hide()
        self.hideWindowByIndex(index);
        self.checkTop()
        return false
      },
      full: function (layero) { // 默认全屏会隐藏最小化按钮
        layero.find('.layui-layer-min').css('display', 'inline-block')
      }
    })
    const obj = {
      url,
      title,
      index,
      icon,
      id,
      active: false,
      show: false
    }
    this.openedWindows.push(obj)
    this.taskMiddleBarClick(obj)
    this.clickDesktop()
  }
  // 渲染桌面快捷方式计算器位置
  renderShortcuts () {
    const target = $('#desktop-shortcuts .shortcut-item');
    const h = parseInt(document.getElementById('desktop-shortcuts').offsetHeight / 100)
    let x = 0;
    let y = 0
    target.each(function () {
      $(this).css({
        left: x * 82 + 10,
        top: y * 100 + 10
      })
      y++
      if (y >= h) {
        y = 0
        x++
      }
    })
  }
  showContextmenu (e, id) {
    $('.content-menu').hide();
    const target = $(`#${id}`);
    let { clientX: x, clientY: y } = e;
    // 修正坐标
    if (x + 150 > document.body.clientWidth) {
      x -= 150
    }
    if (y + target.height() > document.body.clientHeight) {
      y -= target.height()
    }
    target.css({
      left: x,
      top: y,
      display: 'block'
    })
  }
  closeAllWindows () {
    this.openedWindows = [];
    this.clearWindows()
  }
  hideAllWindows () {
    this.openedWindows.forEach(item => {
      const layero = this.getLayeroByIndex(item.index)
      item.show = false;
      item.active = false;
      layero.hide()
    });
  }
  showAllWindows () {
    this.openedWindows.forEach(item => {
      const layero = this.getLayeroByIndex(item.index)
      item.show = true;
      layero.show()
    });
    this.checkTop()
  }
  // 事件绑定
  eveSet () {
    const self = this;
    $(window).resize(() => {
      this.renderShortcuts()
    })
    // 点击窗口置顶
    $(document).on('mousedown', '.win10-open-iframe', function () {
      const layer = $(this)
      self.setTop(layer)
      self.checkTop()
    })
    $(document).on('click', function (event) {
      if (!event.button) {
        $('.content-menu').hide()
      }
    })
  }
}
export default new Desktop()
