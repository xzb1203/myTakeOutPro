<template>
  <div>
    <el-card>
      <el-form :model="form" label-width="80px">
        <el-form-item label="店铺名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input v-model="form.bulletin" type="textarea" rows="10" />
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.avatar" :src="'http://127.0.0.1:5000/upload/shop/'+form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            :action="serverUrl"
            list-type="picture-card"
            :on-remove="handleRemove"
            :file-list="form.pics"
          >
            <i class="el-icon-plus" />
          </el-upload>

        </el-form-item>
        <el-form-item label="起送价格">
          <el-input v-model="form.deliveryPrice" />
        </el-form-item>
        <el-form-item label="送达时间">
          <el-input v-model="form.deliveryTime" />
        </el-form-item>
        <el-form-item label="店铺描述">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="form.score" />
        </el-form-item>
        <el-form-item label="店铺销量">
          <el-input v-model="form.sellCount" />
        </el-form-item>
        <el-form-item label="活动支持">
          <el-checkbox v-model="form.supports">备选项</el-checkbox>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            v-model="value1"
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00'
            }"
            placeholder="任意时间点"
          />
          <el-time-picker
            v-model="value2"
            arrow-control
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00'
            }"
            placeholder="任意时间点"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { shopInfo } from '@/api/shop'
export default {
  name: 'Shop',
  data() {
    return {
      serverUrl: 'http://127.0.0.1:5000/shop/upload', // 店铺图片上传地址
      form: {},
      dialogVisible: false,
      dialogImageUrl: '',
      value1: new Date(2016, 9, 10, 18, 40),
      value2: new Date(2016, 9, 10, 18, 40)
    }
  },
  created() {
    this.fetchShopInfo()
  },
  methods: {
    handleAvatarSuccess(res) {
    },
    fetchShopInfo() {
      shopInfo().then(res => {
        const { data } = res
        const fileList = []
        for (const item of data.pics) {
          fileList.push({ url: 'http://127.0.0.1:5000/upload/shop/' + item })
        }
        data.pics = fileList
        this.form = data
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    submitForm() {

    },
    resetForm() {

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
