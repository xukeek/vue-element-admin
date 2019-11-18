export default (_self, h) => {
  const icons = []
  // 配置按钮
  if (_self.obj.config) {
    icons.push(h('i', {
      class: {
        'el-icon-setting': true
      },
      props: {
      },
      on: {
        click() {
          _self.$emit('handleConfEle', _self.index)
        }
      }
    }))
  }
  // 删除按钮
  icons.push(h('i', {
    class: {
      'el-icon-delete': true
    },
    props: {
    },
    on: {
      click() {
        _self.$emit('handleRemoveEle', _self.index)
      }
    }
  }))
  return h('div', {
    class: {
      'item-icon': true
    }
  }, icons)
}
