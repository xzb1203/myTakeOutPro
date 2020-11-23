<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="55%"
      center
    >
      <div class="content">
        <p v-for="(item, index) in dilogValue" :key="index">
          <label>{{ item.label+':' }}</label>
          <span v-show="title==='查看'">{{ item.value }}</span>
          <span v-show="title==='编辑'"><el-input v-model="item.value" :disabled="item.disabled" /></span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="Confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { dilogValue } from './tabNameList'
import { orderEdit } from '@/api/order'
export default {
  props: {
    rowData: { type: Object, default: null },
    title: { type: String, default: null }
  },
  data() {
    return {
      dialogVisible: false,
      gridData: [],
      dilogValue,
      arr: [], // 当前列的值
      rowId: '',
      fatherPage: {}// 父组件当前页数
    }
  },

  watch: {
    rowData: {
      handler(val) {
        for (const key in val) {
          this.arr.push(val[key])
        }
        for (let i = 0; i < this.dilogValue.length; i++) {
          this.dilogValue[i].value = this.arr[i + 1]
        }
      },
      deep: true
    }
  },
  methods: {
    Confirm() {
      if (this.title === '编辑') {
        const changeVal = []
        for (const item of this.dilogValue) {
          changeVal.push(item.value)
        }
        const [orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState] = changeVal
        orderEdit({ id: this.rowId, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState }).then(res => {
          this.$message.success(res.msg)
          this.$parent.fetchList(this.fatherPage)
        })
      }
      this.dialogVisible = false
      this.arr = []
    },
    cancel() {
      this.dialogVisible = false
      this.arr = []
    }
  }

}
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  p{
    width: 33%;
    display: flex;
    align-items: center;
    label{
      margin-right: 5px;
    }
  }
}
</style>
