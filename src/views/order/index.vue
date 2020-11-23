<template>
  <div style="padding:15px">
    <!-- 搜索组件 -->
    <Search :rest="rest" @getQuery="getQuery" />
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      v-loading="loading"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{background:'#F8F8F9'}"
    >
      <el-table-column
        v-for="(item, index) in tabNameList"
        :key="index"
        :property="item.property"
        :label="item.label"
        :width="item.width"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button icon="el-icon-view" type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button icon="el-icon-edit" type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <Dilog ref="dilog" :row-data="rowData" :title="title" />
  </div>
</template>

<script>
import Search from './components/Search'
import Dilog from './components/Dilog'
import { tabNameList } from './components/tabNameList'
import { orderList } from '@/api/order'
import { time } from '@/utils/time'
export default {
  components: {
    Search,
    Dilog
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      tabNameList: [],
      orderState: null,
      loading: true,
      // 子组件对话框数据
      rowData: null,
      title: '',
      nowPage: {}
    }
  },
  created() {
    var params = { currentPage: this.currentPage, pageSize: this.pageSize }
    this.fetchList(params)
  },
  methods: {
    fetchList(params) {
      this.nowPage = params
      orderList(params).then(res => {
        const { data, total } = res
        // 时间格式化
        for (const item of data) {
          item.deliveryTime = time(item.deliveryTime)
          item.orderTime = time(item.orderTime)
          item.orderAmount = item.orderAmount.toFixed(1)
        }
        this.tableData = data
        this.total = total
        this.tabNameList = tabNameList
        this.loading = false
      })
    },
    // 每页条数
    handleSizeChange(val) {
      this.pageSize = val
      const params = { currentPage: this.currentPage, pageSize: this.pageSize }
      this.fetchList(params)
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      var params = { currentPage: this.currentPage, pageSize: this.pageSize, orderState: this.orderState }
      this.fetchList(params)
    },
    // 查询
    getQuery(val) {
      var { orderNo, consignee, phone, orderState, date } = val
      this.orderState = orderState
      var { currentPage, pageSize } = this
      var params = { currentPage, pageSize, orderNo, consignee, phone, orderState, date }
      this.fetchList(params)
    },
    // 重置
    rest() {
      var params = { currentPage: this.currentPage, pageSize: this.pageSize }
      this.fetchList(params)
    },
    // 查看
    handleClick(row) {
      this.$refs.dilog.dialogVisible = true
      this.rowData = row
      this.title = '查看'
    },
    // 编辑
    edit(row) {
      console.log(row)
      this.$refs.dilog.dialogVisible = true
      this.$refs.dilog.rowId = row.id
      this.$refs.dilog.fatherPage = this.nowPage
      this.rowData = row
      this.title = '编辑'
    }
  }
}
</script>

<style lang="scss" scoped>
.has-gutter{
  background-color: red;
}
</style>
