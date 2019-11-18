<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form class="b-a" label-width="100px">
          <draggable :clone="cloneData" :list="form_list" :options="dragOptions1">
            <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
              <renders
                v-for="(items, index) in form_list"
                :key="'l' + index"
                :ele="items.ele"
                :obj="items.obj"
              />
            </transition-group>
          </draggable>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form>
          <el-form-item label="表单名称">
            <el-input v-model="formName" />
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="formData" class="b-a" label-width="100px">
          <draggable :clone="cloneData" :list="sortable_item" :options="dragOptions2">
            <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
              <renders
                v-for="(element,index) in sortable_item"
                :key="'r' + index"
                :index="index"
                :ele="element.ele"
                :obj="element.obj || {}"
                :data="formData"
                :sortable-item="sortable_item"
                :config-icon="true"
                @handleRemoveEle="removeEle"
                @handleConfEle="confEle"
                @changeVisibility="changeVisibility"
                @handleChangeVal="val => handleChangeVal(val,element)"
              />
            </transition-group>
          </draggable>
        </el-form>
        <el-button type="primary" @click="handleSubmit('form')">保存</el-button>
      </el-col>
    </el-row>

    <el-dialog
      title="提示"
      :visible.sync="configDialogVisible"
      width="30%"
    >
      <ncform v-model="configFormModel" :form-schema="configFormSchema" form-name="your-form-name" @submit="submitConfig()" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="configDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitConfig">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// @ is an alias to /src
import draggable from 'vuedraggable'
import { inputMapper, form_list } from './components/custom/FormList'
import { saveForm } from '@/api/form'
import renders from './components/custom/Render'
import serialize from 'serialize-javascript'

export default {
  name: 'FormBuilder',
  components: {
    draggable,
    renders
  },
  data() {
    return {
      form_list,
      inputMapper,
      list2: [],
      formData: {},
      formName: '',
      sortable_item: [],
      configDialogVisible: false,
      configFormSchema: {},
      configFormModel: {},
      configIndex: 0
    }
  },
  computed: {
    // 拖拽表单1
    dragOptions1() {
      return {
        animation: 0,
        ghostClass: 'ghost',
        // 分组
        group: {
          name: 'shared',
          pull: 'clone',
          revertClone: false
        },
        // 禁止拖动排序
        sort: false
      }
    },
    // 拖拽表单2
    dragOptions2() {
      return {
        animation: 0,
        ghostClass: 'ghost',
        group: {
          // 只允许放置shared的控件,禁止pull
          put: ['shared']
        }
      }
    }
  },
  methods: {
    handleSubmit(name) { // 保存
      this.$refs[name].validate((valid) => {
        const formMetadata = {
          type: 'object',
          properties: {

          }
        }
        this.sortable_item.forEach((v, i) => {
          formMetadata.properties['p' + i] = v.model
        })
        const postData = {
          name: this.formName,
          metadata: serialize(formMetadata)
        }
        saveForm(postData).then(response => {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    // https://github.com/SortableJS/Vue.Draggable#clone
    // 克隆,深拷贝对象
    cloneData(original) {
      // 深拷贝对象，防止默认空对象被更改
      return JSON.parse(JSON.stringify(original))
    },
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val)
    },
    // 显示modal,配置被克隆控件
    confEle(index) {
      const inputConfig = this.inputMapper[this.sortable_item[index].ele]
      this.configFormSchema = inputConfig.metadata
      this.configFormModel = Object.assign({}, this.sortable_item[index].model || {})
      this.configIdex = index
      this.configDialogVisible = true
    },
    // 删除克隆控件
    removeEle(index) {
      const name = this.sortable_item[index].obj.name
      this.sortable_item.splice(index, 1)
      if (!name) return
      for (const i in this.sortable_item) {
        // 当relation为true并且关联字段被确认
        if (this.sortable_item[i].obj.relation && this.sortable_item[i].obj.relation_name === name) {
          this.$set(this.sortable_item[i].obj, 'relation', false)
          this.$set(this.sortable_item[i].obj, 'relation_name', '')
          this.$set(this.sortable_item[i].obj, 'relation_value', '')
          break
        }
      }
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      this.$set(this.sortable_item[index].obj, 'visibility', visibility)
    },
    submitConfig() {
      this.$ncformValidate('your-form-name').then(data => {
        if (data.result) {
          this.sortable_item[this.configIdex].model = this.configFormModel
          this.configDialogVisible = false
        }
      })
    }
  }
}

</script>
<style>
  .form-list-group {
    min-height: 200px;
    padding: 20px !important;
  }

  .b-a {
    border: 1px solid #ccc;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .items,
  .items * {
    cursor: move;
  }

  /* 配置按钮默认位置 */

  /* 例如P Hr Title按钮 */
  .items .item-icon {
    transition: all 2s ease;
    position: absolute;
    top: -28px;
    right: 0;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }

  /* form控件下配置按钮位置 */
  .ivu-form-item.items .item-icon {
    top: -25px;
  }

  /* 配置按钮样式 */

  .item-icon i {
    cursor: pointer !important;
    margin-right: 5px;
  }

  .items:hover .item-icon {
    transition: inherit;
    opacity: 1;
    max-height: 50px;
  }
</style>
