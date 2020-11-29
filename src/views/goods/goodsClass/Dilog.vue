<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form v-if="title==='添加分类'" ref="ruleForm" :model="ruleForm" status-icon label-width="80px">
        <el-form-item
          label="分类名称"
          prop="cateName"
          :rules="[{ required: true, message: '请输入分类名称', trigger: 'blur' }]"
        >
          <el-input v-model="ruleForm.cateName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否启用" prop="state">
          <el-switch v-model="ruleForm.state" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
      </el-form>
      <el-form v-else :model="ruleForm2" label-width="80px">
        <el-form-item label="商品名称" prop="name" :rules="[{ required: true, message: '请输入商品名称', trigger: 'blur' }]">
          <el-input v-model="ruleForm2.name" />
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="ruleForm2.category" placeholder="请选择" @visible-change="visibleChange">
            <el-option
              v-for="item in selectList"
              :key="item.id"
              :label="item.cateName"
              :value="item.cateName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="ruleForm2.price" :min="5" :max="1000" label="描述文字" />
        </el-form-item>
        <el-form-item label="商品图片" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="ruleForm2.imgUrl" :src="goodsImgUrl+ruleForm2.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsDesc">
          <el-input v-model="ruleForm2.goodsDesc" type="textarea" rows="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">取 消</el-button>
        <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { goodsAddcate, goodsCategories, goodsAdd } from '@/api/goods'
import { goodsImgUrl } from '@/utils/ImgUrl'

export default {
  data() {
    return {
      dialogVisible: false,
      title: '',
      ruleForm: {},
      ruleForm2: {},
      dilog: false,
      selectList: [],
      goodsImgUrl,
      serverUrl: 'http://127.0.0.1:5000/goods/goods_img_upload'// 图片地址

    }
  },
  methods: {
    confirm() {
      if (this.title === '添加分类') {
        const { cateName, state } = this.ruleForm
        goodsAddcate({ cateName, state }).then(res => {
          this.$parent.fetchList()
          this.$message.success(res.msg)
        })
      } else {
        const { name, category, price, imgUrl, goodsDesc } = this.ruleForm2
        goodsAdd({ name, category, price: price, imgUrl, goodsDesc }).then(res => {
          this.$message.success(res.msg)
        })
      }
      this.dialogVisible = false
    },
    cancel() {
      this.dialogVisible = false
    },
    visibleChange(state) {
      if (state) {
        goodsCategories().then(res => {
          this.selectList = res.categories
        })
      }
    },
    handleAvatarSuccess(res) {
      this.ruleForm2.imgUrl = res.imgUrl
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
