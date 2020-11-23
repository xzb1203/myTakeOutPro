<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div v-if="title!=='修改密码'" class="content">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
          <el-form-item label="用户名">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item v-if="title==='添加账号'" label="密码">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item label="用户级别">
            <el-select v-model="form.userGroup" placeholder="请选择用户级别">
              <el-option label="超级管理员" value="超级管理员" />
              <el-option label="普通管理员" value="普通管理员" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="原密码" prop="oldPsd">
            <el-input v-model="ruleForm.oldPsd" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPsd">
            <el-input v-model="ruleForm.newPsd" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="affirm" type="password">
            <el-input v-model.number="ruleForm.affirm" />
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <h4>{{ '当前账号ID为:'+ (id==='' ?'vuex数据丢失,请重新登录' :id) }}</h4>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { usersEdit, usersAdd, usersEditpwd, usersCheckoldpwd } from '@/api/user'
export default {
  data() {
    // 判断原密码是否正确
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const params = { oldPwd: this.ruleForm.oldPsd, id: this.id }
        usersCheckoldpwd(params).then(res => {
          if (res.code) {
            callback(new Error(res.msg))
          } else {
            callback()
          }
        })
      }
    }
    // 验证新密码
    var getNewPsd = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    // 两次密码验证
    var getRightRes = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== Number(this.ruleForm.newPsd)) {
        console.log(value, this.ruleForm.newPsd)
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      title: '',
      userId: '', // 当前用户ID
      form: {
        account: '',
        password: '',
        userGroup: []
      },
      ruleForm: {
        oldPsd: '',
        newPsd: '',
        affirm: ''
      },
      rules: {
        oldPsd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPsd: [
          { validator: getNewPsd, trigger: 'blur' }
        ],
        affirm: [
          { validator: getRightRes, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      id: state => state.user.id
    })
  },
  methods: {
    confirm() {
      const { account, userGroup, password } = this.form
      switch (this.title) {
        case '信息修改':
          var data = { id: this.userId, account, userGroup }
          usersEdit(data).then(res => {
            this.$message.success(res.msg)
          })
          break
        case '添加账号':
          var data2 = { account, password, userGroup }
          usersAdd(data2).then(res => {
            this.$message.success(res.msg)
          })
          break
        case '修改密码':
          var data3 = { newPwd: this.ruleForm.newPsd, id: this.id }
          usersEditpwd(data3).then(res => {
            this.$message.success(res.msg)
          })
          break
        default:
          this.$message.error('没有这个选项!')
          break
      }
      this.$parent.fetchData()
      this.form = {}
      this.dialogVisible = false
    },
    cancel(formName) {
      this.form = {}
      if (this.title === '修改密码') this.$refs[formName].resetFields()
      this.dialogVisible = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select{
  width: 100%;
}
</style>
