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
      :broder="true"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="名字"
      />

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
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
import { queryForm } from '@/api/form'

export default {
  name: 'FormList',
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
    async getList() {
      this.listLoading = true
      const res = await queryForm(this.listQuery)
      const data = res.data
      this.list = data.content
      this.total = data.totalElements
      this.listLoading = false
    },
    handleCreate() {
      this.$router.push({ path: '/form/create' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/form/edit/' + row.id })
    }
  }
}
</script>
