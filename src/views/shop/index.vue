<template>
  <div>
    <el-card>
      <el-form ref="formName" :model="form" label-width="80px">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="店铺公告" prop="bulletin">
          <el-input v-model="form.bulletin" type="textarea" rows="10" />
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.avatar" :src="shopImgUrl+form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            :action="serverUrl"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="form.pics"
          >
            <i class="el-icon-plus" />
          </el-upload>

        </el-form-item>
        <el-form-item label="起送价格" prop="deliveryPrice">
          <el-input v-model="form.deliveryPrice" />
        </el-form-item>
        <el-form-item label="送达时间" prop="deliveryTime">
          <el-input v-model="form.deliveryTime" />
        </el-form-item>
        <el-form-item label="店铺描述" prop="description">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="店铺评分" prop="score">
          <el-rate v-model="form.score" :colors="colors" class="score" />
        </el-form-item>
        <el-form-item label="店铺销量" prop="sellCount">
          <el-input v-model="form.sellCount" />
        </el-form-item>
        <el-form-item label="活动支持" prop="supports">
          <el-checkbox-group v-model="form.supports">
            <el-checkbox label="在线支付满28减5" name="type" />
            <el-checkbox label="VC无限橙果汁全场8折" name="type" />
            <el-checkbox label="单人精彩套餐" name="type" />
            <el-checkbox label="特价饮品8择抢购" name="type" />
            <el-checkbox label="单人特色套餐" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('formName')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { shopInfo, shopEdit } from '@/api/shop'
import { shopImgUrl, serverUrl } from '@/utils/ImgUrl'
export default {
  name: 'Shop',
  data() {
    return {
      serverUrl, // 店铺图片上传地址
      form: { supports: [] },
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [],
      shopImgUrl,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  created() {
    this.fetchShopInfo()
  },
  methods: {
    handleAvatarSuccess(res) {
      this.form.avatar = res.imgUrl
    },
    fetchShopInfo() {
      shopInfo().then(res => {
        const { data } = res
        for (const item of data.pics) {
          this.fileList.push({ url: this.shopImgUrl + item })
        }
        data.pics = this.fileList
        this.form = data
      })
    },
    handleRemove(fileList) {
      this.form.pics = this.form.pics.filter(item => item.uid !== fileList.uid)
      console.log(this.fileList)
    },
    handleSuccess(res) {
      if (res.code === 0) {
        this.form.pics.push({ url: this.shopImgUrl + res.imgUrl })
      }
    },
    submitForm() {
      const arr = this.form.pics.map(item => item.url)
      const result = []
      for (const item of arr) {
        result.push(item.substring(item.lastIndexOf('/') + 1))
      }
      const params = { ...this.form }
      params.pics = result
      params.supports = JSON.stringify(params.supports)
      params.date = JSON.stringify(params.date)
      params.pics = JSON.stringify(params.pics)
      shopEdit(params).then(res => {
        this.$message.success(res.msg)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
.score{
  position: relative;
  top: 10px;
}
</style>
