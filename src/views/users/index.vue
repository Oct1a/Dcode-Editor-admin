<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="130">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="110" align="center">
        <template slot-scope="scope">
            <el-avatar :size="50" :src="scope.row.avatar || defaultImage"></el-avatar>

        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="邮箱" width="200" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.email }}</el-tag>
        </template>
      </el-table-column>
       <el-table-column class-name="status-col" label="权限" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.permissions | statusFilter">{{ scope.row.permissions | statusState }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间"  >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>  {{ scope.row.created | timeParse}}</span>
        </template>
      </el-table-column>

       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleChangePower(scope.row._id)"
          v-show="scope.row.username != 'admin'"
          >更改权限</el-button>
        <el-button
          size="mini"
          v-show="scope.row.username != 'admin'"
          :type="scope.row.status ? 'danger' : 'info'"
          @click="handleChangeStatus(scope.row._id,!scope.row.status)">点击{{scope.row.status ? '禁用':'启用'}}</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserAll,changeStatus,changePower } from '@/api/user'
import {formatTime} from '@/utils/index'
export default {
  filters: {
    statusFilter(status) {
      return status==1 ? 'danger' :'info'
    },
    statusState(status){
      return status==1 ? '管理员' :'普通用户'
    },
    timeParse(time){
      return formatTime(new Date(time).getTime())
    },
    getPageNum(page){
        return page ? Object.keys(page).length : 0
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      defaultImage:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserAll().then(response => {
        console.log(response)
        this.list = response.body
        this.listLoading = false
      })
    },
    handleChangePower(id){
       this.$confirm(`确定变更用户权限?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changePower({id}).then(response=>{
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.fetchData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已恢复用户正常使用'
          });
        });
    },
    handleChangeStatus(id,state){
        this.$confirm(`此操作将${state ?'启用': '禁用'}该用户, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeStatus({id,state}).then(response=>{
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.fetchData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已恢复用户正常使用'
          });
        });
    },
    filterNullPage(value, row) {
      return Object.keys(row.pages).length != value;
    },
  }
}
</script>
