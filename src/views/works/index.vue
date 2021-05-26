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
      <!--排序 :default-sort = "{prop: 'created_on', order: 'descending'}" -->
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缩略图" width="110" align="center">
        <template slot-scope="scope">
            <el-image
                style="width: 50px; height: 70px"
                :src="scope.row.coverImage || defaultImage"
                fit="cover"
                :preview-src-list="previewList"
              >
            </el-image>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="发布状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isPublish | statusFilter">{{ scope.row.isPublish | statusState }}</el-tag>
        </template>
      </el-table-column>
       <el-table-column class-name="status-col" label="页面数量" width="110" align="center">
        <template slot-scope="scope">
          <el-tag >{{ scope.row.pages | getPageNum }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="created_on" label="更新时间"  >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>  {{ scope.row.updated |timeParse}}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" prop="created_at" label="创建时间"  >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>  {{ scope.row.created |timeParse}}</span>
        </template>
      </el-table-column>

       <el-table-column label="操作" fixed="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="openPreview(scope.row._id,scope.row.title)">预览</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWorks,delWork } from '@/api/works'
import {formatTime} from '@/utils/index'
export default {
  filters: {
    statusFilter(status) {
      return status ? 'success' :'info'
    },
    statusState(status){
      return status ? '已发布' :'未发布'
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
      previewList:[],
      defaultImage:'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
    }
  },
  created() {
    this.fetchData()

  },
  methods: {
    fetchData() {
      this.listLoading = true
      getWorks().then(response => {
        console.log(response)
        this.list = response.body
        this.listLoading = false
        this.previewData()
      })
    },
    previewData(){
      this.previewList = this.list.map(v=>{
            return v.coverImage
        })
    },
    handleDelete(id){
      this.$confirm('此操作将永久删除该作品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delWork({id}).then(res=>{
            let index = this.list.findIndex((v,i)=>{
              return v._id == id
            })
            this.list.splice(index,1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(e=>{
            this.$message({
              type: 'info',
              message: '删除失败'
            });
          })
        }).catch(e => {
          console.log(e)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    filterNullPage(value, row) {
      return Object.keys(row.pages).length != value;
    },
    openPreview(id,title) {
        this.$alert(`<iframe src="http://localhost:8080/view/${id}"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          width="100%";
          height="100%";
          />`,
          title || "预览作品",
          {
            dangerouslyUseHTMLString: true,
            customClass:'previewPanel',
            center:true, //整体居中布局
            closeOnClickModal:true, //点击蒙版关闭弹窗
            showConfirmButton:false, //取消确定按钮
          });
      },
  }
}
</script>
<style lang="scss">
  .previewPanel{
    width: 375px;
    height: 700px;
  }
  .el-message-box__content,.el-message-box__container,.el-message-box__message,p{
      height: 100%;
  }
</style>