<template>
  <div class="index-container">
     <el-row :gutter="12" style="margin-bottom:20px">
      <el-col :span="8">
        <el-card shadow="always" style="text-align:center">
          <div slot="header" class="clearfix" >
            <span>总作品数量</span>
          </div>
          <span style="font-size:2rem;font-weight:bold">17</span>
        </el-card>
      </el-col>
     <el-col :span="8">
       <el-card shadow="always" style="text-align:center">
          <div slot="header" class="clearfix" >
            <span>今日作品</span>
          </div>
          <span style="font-size:2rem;font-weight:bold">3</span>
        </el-card>
      </el-col>
     <el-col :span="8">
       <el-card shadow="always" style="text-align:center">
          <div slot="header" class="clearfix" >
            <span>模板数量</span>
          </div>
          <span style="font-size:2rem;font-weight:bold">20</span>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="14">
         <plan></plan>
      </el-col>
      <el-col :span="10">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>更新日志</span>
          </div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :color="activity.color"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import VabChart from '@/plugins/echarts'
  import Plan from './components/Plan'
  export default {
    name: 'Index',
    components: {
      // VabChart,
      Plan,
    },
    data() {
      return {
        //更新日志
        reverse: true,
         activities: [{
          content: '后台页面布局搭建',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '完成作品与用户管理',
          timestamp: '2018-04-03 20:46',
        }, {
          content: '复制页面问题',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '登录注册添加滑动验证',
          timestamp: '2018-04-03 20:46'
        },{
          content: '预览出现危险分享bug',
          timestamp: '2018-04-03 20:46'
        },{
          content: '清空画布',
          timestamp: '2018-04-03 20:46'
        },{
          content: '历史面板需可还原',
          timestamp: '2018-04-03 20:46',
        },{
          content: '添加二维码组件',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }],
        noticeList: [],

      }
    },
    created() {
      // this.fetchData() //获取信息
    },
    mounted() {

    },
    methods: {
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit('theme')
      },
      async fetchData() {
        // 获取更改日志
       // const { data } = await getList()
        // data.map((item, index) => {
        //   if (index === data.length - 1) {
        //     item.color = '#0bbd87'
        //   }
        // })
        // this.activities = data
        // const res = await getNoticeList()
        // this.noticeList = res.data
      },
    },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding:20px;
    margin: 0 !important;
    background: #f5f7f8 !important;

  }
</style>
