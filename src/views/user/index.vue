<template>
  <div class="app-content">
    <el-button-group>
      <el-button icon="el-icon-delete" @click="batchDel">批量删除</el-button>
      <el-button icon="el-icon-circle-plus-outline" @click="addUser">添加账号</el-button>
      <el-button icon="el-icon-edit" @click="changePsw">修改密码</el-button>
    </el-button-group>
    <br>
    <br>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{background:'#F8F8F9'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        prop="account"
        label="账号"
        align="center"
      />
      <el-table-column
        prop="userGroup"
        label="用户组"
        align="center"
      />
      <el-table-column
        prop="ctime"
        label="创建时间"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" type="text" size="small" @click="clickDel(scope.row)">删除</el-button>
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
    <!-- <p>{{ '我是' | myName }}</p> -->
  </div>
</template>

<script>
import { usersList, usersDel, usersBatchdel } from '@/api/user'
import { time } from '@/utils/time'
import Dilog from './components/Dilog'
export default {
  components: {
    Dilog
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 3,
      total: 0,
      tableData: [],
      selectVal: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 编辑
    edit(row) {
      this.$refs.dilog.dialogVisible = true
      this.$refs.dilog.title = '信息修改'
      this.$refs.dilog.form.account = row.account
      this.$refs.dilog.form.userGroup = row.userGroup
      this.$refs.dilog.userId = row.id
      console.log(row)
    },
    // 删除
    clickDel(row) {
      this.$confirm('确定删除该账号吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = { id: row.id }
        usersDel(id).then(res => {
          this.$message.success(res.msg)
          this.fetchData()
        })
      }).catch(() => {
        return
      })
    },
    // 每页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    // 获取表格数据
    fetchData() {
      const { currentPage, pageSize } = this
      var params = { currentPage, pageSize }
      usersList(params).then(res => {
        res.data.forEach(element => {
          element.ctime = time(element.ctime)
        })
        this.total = res.total
        this.tableData = res.data
      })
    },
    // 添加账号
    addUser() {
      this.$refs.dilog.dialogVisible = true
      this.$refs.dilog.title = '添加账号'
    },
    // 修改密码
    changePsw() {
      this.$refs.dilog.dialogVisible = true
      this.$refs.dilog.title = '修改密码'
    },
    // 批量删除
    batchDel() {
      this.$confirm('确定删除该账号吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { ids: JSON.stringify(this.selectVal) }
        usersBatchdel(params).then(res => {
          this.$message.success(res.msg)
          this.fetchData()
        })
      }).catch(() => {
        return
      })
    },
    // 获取所有选中的id
    handleSelectionChange(val) {
      const selectArr = []
      for (const item of val) {
        selectArr.push(item.id)
      }
      this.selectVal = selectArr
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
