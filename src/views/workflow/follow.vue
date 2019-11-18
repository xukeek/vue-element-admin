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
        prop="processDefinitionKey"
        label="模型标识"
      />
      <el-table-column
        prop="processDefinitionName"
        label="模型名称"
      />
      <el-table-column>
        <template slot-scope="{row}">
          <img :src="'/api/workflow/instance/diagram/' + row.id" width="40" height="40" class="head_pic"/>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        label="startTime"
      />

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
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
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index'
// import { deepClone } from '@/utils'
import { queryWorkflowInstance } from '@/api/workflow'

export default {
  name: 'WorkflowFollow',
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
      }
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
    handleCreate() {
      this.$router.push({ path: '/workflow/create' })
    },
    async getList() {
      this.listLoading = true
      const res = await queryWorkflowInstance(this.listQuery)
      const data = res.data
      this.list = data.content
      this.total = data.totalElements
      this.listLoading = false
    },
    handleStop(row) {

    }
  }
}
</script>
