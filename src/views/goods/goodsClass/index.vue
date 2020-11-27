<template>
  <div class="app-content">
    <el-button-group>
      <el-button icon="el-icon-menu" @click="addClass">添加分类</el-button>
      <el-button icon="el-icon-s-goods" @click="addGoods">添加商品</el-button>
    </el-button-group>
    <br><br>
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#F8F8F9'}"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
      />
      <el-table-column
        label="分类名称"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.edit">{{ scope.row.cateName }}</el-tag>
          <el-input v-else v-model="scope.row.cateName" size="mini" style="width:150px" />
        </template>
      </el-table-column>
      <el-table-column
        label="是否启用"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="!scope.row.edit"
          />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="{row}">
          <el-button type="text" :icon="row.edit ?'el-icon-success' :'el-icon-edit'" size="small" @click="clickedit(row)">{{ row.edit ?'完成' :'编辑' }}</el-button>
          <el-button type="text" icon="el-icon-delete" size="small" @click="clickdelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[3,5,7,9]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <Dilog ref="dilog" />
  </div>
</template>

<script>
import { goodsCatelist, goodsEditcate, goodsDelcate } from '@/api/goods'
import Dilog from './Dilog'
export default {
  name: 'GoodsClass',
  components: {
    Dilog
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      edit: false
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      const { currentPage, pageSize } = this
      const params = { currentPage, pageSize }
      goodsCatelist(params).then(res => {
        for (const item of res.data) {
          item.edit = false
          item.state = !!item.state
        }
        const { data, total } = res
        this.total = total
        this.tableData = data
      })
    },
    clickedit(row) {
      row.edit = !row.edit
      if (!row.edit) {
        const { id, cateName, state } = row
        const params = { id, cateName, state }
        goodsEditcate(params).then(res => {
          this.fetchList()
          this.$message.success(res.msg)
        })
      }
    },
    clickdelete(row) {
      this.$confirm('确定删除该分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        goodsDelcate(row.id).then(res => {
          this.fetchList()
          this.$message.success(res.msg)
        })
      }).catch(() => {
        return
      })
    },
    // 每页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchList()
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchList()
    },
    addClass() {
      this.$refs.dilog.dialogVisible = true
      this.$refs.dilog.dilog = true
      this.$refs.dilog.title = '添加分类'
    },
    addGoods() {
      this.$refs.dilog.dialogVisible = true
      this.$refs.dilog.title = '添加商品'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
