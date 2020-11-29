<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form v-if="fromData" ref="form" :model="fromData" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="fromData.name" />
        </el-form-item>
        <el-form-item label="所属分类">
          <el-input v-model="fromData.category" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="fromData.price" />
        </el-form-item>
        <el-form-item label="商品图片">
          <img :src="serverUrl+fromData.imgUrl" alt="">
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="fromData.goodsDesc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="config">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodsImgUrl } from '@/utils/ImgUrl'
export default {
  data() {
    return {
      dialogVisible: false,
      fromData: null,
      serverUrl: goodsImgUrl// 图片地址
    }
  },
  methods: {
    config() {
      this.dialogVisible = false
    },
    cancel() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
