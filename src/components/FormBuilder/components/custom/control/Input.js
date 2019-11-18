export default (_self, h) => {
  return [
    h('el-input', {
      props: {
        value: _self.obj.value || ''
      },
      attrs: {
        maxlength: parseInt(_self.obj.maxlength) || 20,
        placeholder: _self.obj.placeholder || '这是一个输入框'
      },
      on: {
        'change': function(val) {
          //   if (!_self.obj.name) {
          //     return false;
          //   }
          _self.obj.value = event.currentTarget.value
          _self.$emit('handleChangeVal', event.currentTarget.value)
        }
      }
    })
  ]
}

export const inputConf = {
  // 对应数据库内类型
  type: 'input',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '输入框',
  metadata: {
    type: 'object',
    ignoreProperties: ['name', 'required'],
    properties: {
      type: {
        type: 'string',
        defaultValue: 'string',
        ui: {
          hidden: true
        }
      },
      ui: {
        type: 'object',
        ui: {
          hidden: true
        },
        defaultValue: {
          label: 'Label'
        },
        valueTemplate: function(formData, constData, selfData) {
          return {
            label: formData.name
          }
        }
      },
      rules: {
        type: 'object',
        ui: {
          hidden: true
        },
        defaultValue: {
          required: {
            value: false,
            errMsg: '必填!'
          }
        },
        valueTemplate: function(formData, constData, selfData) {
          return {
            required: {
              value: formData.required,
              errMsg: '必填!',
              ssss: formData.name
            }
          }
        }
      },
      name: {
        type: 'string',
        ui: {
          label: '字段名称',
          placeholder: '名称'
        },
        rules: {
          required: {
            value: true, // 规则配置值
            errMsg: '必填!' // 错误提示信息
          }
        }
      },
      required: {
        type: 'boolean',
        defaultValue: false,
        ui: {
          'label': '必填'
        }
      }
    }
  }
}
