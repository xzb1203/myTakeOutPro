<template>
  <div class="app-content">
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{background:'#F8F8F9'}"
      height="550"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="foldTable">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <span><img :src="serverUrl+props.row.imgUrl" alt="" class="foldImg"></span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime | formattingTime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating+'分' }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount+'份' }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="180"
        align="center"
      />
      <el-table-column
        prop="category"
        label="所属分类"
        width="180"
        align="center"
      />
      <el-table-column
        prop="price"
        label="商品价格"
        width="180"
        align="center"
      />
      <el-table-column
        label="商品图片"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <img :src="serverUrl+scope.row.imgUrl">
        </template>
      </el-table-column>
      <el-table-column
        prop="goodsDesc"
        label="商品描述"
        width="180"
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
    <Dilog ref="dilog" />
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
  </div>
</template>

<script>
import { goodsList, goodsDel } from '@/api/goods'
import { goodsImgUrl } from '@/utils/ImgUrl'

import Dilog from './Dilog'
export default {
  name: 'GoodsList',
  components: {
    Dilog
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      serverUrl: goodsImgUrl// 图片地址
    }
  },
  created() {
    this.fetchGoodsList()
  },
  methods: {
    fetchGoodsList() {
      const { currentPage, pageSize } = this
      const params = { currentPage, pageSize }
      goodsList(params).then(res => {
        const { data, total } = res
        console.log(data)
        this.tableData = data
        this.total = total
      })
    },
    // 每页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchGoodsList()
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchGoodsList()
    },
    // 编辑
    edit(row) {
      this.$refs.dilog.dialogVisible = true
      this.$refs.dilog.fromData = { ...row }
    },
    // 删除
    clickDel(row) {
      this.$confirm('确定删除该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { id: row.id }
        goodsDel(params).then(res => {
          this.fetchGoodsList()
          this.$message.success('删除成功')
        })
      }).catch(() => {
        return
      })
    }
  }
}
</script>

<style lang="scss" scoped>
img{
  width: 100px;
}
.foldTable{
  display: flex;
  flex-wrap: wrap;
  .el-form-item{
    width: 45%;
  }
  .foldImg{
    position: absolute;
    top: -35px;
  }
}
</style>
