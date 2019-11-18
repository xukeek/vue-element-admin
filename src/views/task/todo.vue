<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        :placeholder="'名称'"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="processDefinition.key"
        label="模型标识"
      />
      <el-table-column
        prop="processDefinition.name"
        label="模型名称"
      />
      <el-table-column>
        <template slot-scope="{row}">
          <img :src="'/api/workflow/instance/diagram/' + row.processInstanceId" width="40" height="40" class="head_pic">
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        label="startTime"
      />

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleFinishTask(row)">
            办理
          </el-button>
          <el-button type="primary" size="mini" @click="handleStop(row)">
            停止
          </el-button>
          <el-button type="danger" size="mini" @click="handleUpdate(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <el-dialog
      title="办理"
      :visible.sync="taskFormDialogVisible"
      width="30%"
    >
      <ncform v-model="formBean" :form-schema="taskFormSchema" form-name="your-form-name" @submit="doFinishTask()" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doFinishTask">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index'
import serialize from 'serialize-javascript'
// import { deepClone } from '@/utils'
import { queryTasks, saveTaskForm } from '@/api/workflow'

export default {
  name: 'TaskTodo',
  components: { Pagination },
  directives: { permission },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        name: undefined,
        page: 1,
        size: 30,
        deleted: false,
        tags: [],
        orderBy: null
      },
      taskFormDialogVisible: false,
      formBean: {},
      taskFormSchema: {},
      taskId: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    async getList() {
      this.listLoading = true
      const res = await queryTasks(this.listQuery)
      const data = res.data
      this.list = data.content
      this.total = data.totalElements
      this.listLoading = false
    },
    handleStop(row) {

    },
    handleFinishTask(row) {
      if (row.formBean && row.formBean.metadata) {
        this.formBean = {}
        this.taskFormSchema = this.deserialize(row.formBean.metadata)
        this.taskId = row.id
        this.taskFormDialogVisible = true
      }
    },
    deserialize(serializedJavascript) {
      // eslint-disable-next-line no-eval
      return eval('(' + serializedJavascript + ')')
    },
    doFinishTask() {
      this.$ncformValidate('your-form-name').then(data => {
        if (data.result) {
          saveTaskForm(this.taskId, { formData: serialize(this.formBean) }).then(response => {
            this.taskFormDialogVisible = false
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    }
  }
}
</script>
