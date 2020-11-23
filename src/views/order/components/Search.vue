<template>
  <div>
    <el-form ref="ruleForm" :label-position="labelPosition" label-width="80px" :model="queryTerm" style="display:flex">
      <el-form-item label="订单编号" prop="orderNo">
        <el-input v-model="queryTerm.orderNo" placeholder="请输入订单编号" size="small" />
      </el-form-item>
      <el-form-item label="收货人" prop="consignee">
        <el-input v-model="queryTerm.consignee" placeholder="请输入收货人" size="small" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="queryTerm.phone" placeholder="请输入手机号" size="small" />
      </el-form-item>
      <el-form-item label="订单状态" prop="orderState">
        <el-select v-model="queryTerm.orderState" placeholder="用户状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :label-position="labelPosition" label-width="80px" :model="queryTerm" style="display:flex">
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="queryTerm.date"
          size="small"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-mm-dd hh:mm:ss"
          :default-time="['12:00:00', '08:00:00']"
        />
        <el-button class="search" type="primary" icon="el-icon-search" size="small" @click="clickQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="clickrest">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    rest: { type: Function, default: null }
  },
  data() {
    return {
      labelPosition: 'right',
      // 查询条件
      queryTerm: {
        orderNo: '', // 订单号
        consignee: '', // 收货人
        phone: '', // 手机号
        orderState: '', // 订单状态
        date: null// 时间范围
      },
      options: [{
        value: '已受理'
      }, {
        value: '派送中'
      }, {
        value: '已完成'
      }
      ],
      value: ''

    }
  },
  methods: {
    clickQuery() {
      console.log(this.queryTerm)
      this.$emit('getQuery', this.queryTerm)
    },
    clickrest() {
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields()
      })
      this.rest()
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  margin-left: 10px;
  background-color: #20B2AA;
  border: none;
}
</style>
