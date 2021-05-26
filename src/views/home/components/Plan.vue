<template>
<div >
  <el-card shadow="hover">
    <template #header>
      计划
    </template>
    <el-table :data="tableData" row-key="title" >
      <el-table-column width="20px" />
      <el-table-column prop="title" label="目标" width="230px" />
      <el-table-column label="进度" width="220px">
        <template #default="{ row }">
          <el-progress :percentage="row.percentage" :color="row.color" />
        </template>
      </el-table-column>
      <el-table-column width="50px" />
      <el-table-column prop="endTIme" label="完成时间" />
    </el-table>
  </el-card>

</div>
</template>
<script>
  import Sortable from 'sortablejs'
  export default {
    data() {
      return {
        tableData: [
          {
            title: '添加大转盘组件',
            endTIme: '2021-05-31',
            percentage: 1,
            color: '#95de64',
          },
          {
            title: '后台组件管理',
            endTIme: '2021-05-31',
            percentage: 8,
            color: '#69c0ff',
          },
          {
            title: '完善模板库',
            endTIme: '2021-12-31',
            percentage: 76,
            color: '#1890FF',
          },
          {
            title: 'vue-admin-beautiful标星过1K',
            endTIme: '2020-03-31',
            percentage: 100,
            color: '#ffc069',
          },
          {
            title: '活到老，学到老',
            endTIme: '2094-12-16',
            percentage: 25,
            color: '#5cdbd3',
          },
          {
            title: '变成像尤雨溪一样优秀的人',
            endTIme: '此生无望',
            percentage: 1,
            color: '#b37feb',
          },
        ],
      }
    },
    mounted() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        },
      })
    },
  }
</script>
