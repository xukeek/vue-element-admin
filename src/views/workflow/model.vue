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
      <el-button class="filter-item" type="primary" @click="handleCreate">新建</el-button>
    </div>

    <el-table
      :data="list"
      broder
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="名字"
      />

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
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
import { queryWorkflow } from '@/api/workflow'

export default {
  name: 'Form',
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
      const res = await queryWorkflow(this.listQuery)
      this.list = res.content
      this.total = res.totalElements
      this.listLoading = false
    }
  }
}
</script>
