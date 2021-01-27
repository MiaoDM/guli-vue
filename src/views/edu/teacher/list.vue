<template>
  <div class="app-container">
    <!--    表单查询区域-->
    <el-form :inline="true" :model="teacherQuery" ref="searchFormRef">
      <el-form-item label="讲师名" prop="name">
        <el-input v-model="teacherQuery.name" placeholder="讲师名"></el-input>
      </el-form-item>

      <el-form-item label="讲师头衔" prop="level">
        <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="特级讲师" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间" prop="begin">
        <el-date-picker type="datetime" placeholder="选择开始时间" v-model="teacherQuery.begin"
                        value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间" prop="end">
        <el-date-picker type="datetime" placeholder="选择结束时间" v-model="teacherQuery.end"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button type="default" @click="resetForm()">清空</el-button>
      </el-form-item>

    </el-form>
    <!--    表格区域-->
    <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      heighlight-current-row>
      <el-table-column
        type="index">
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>

      <el-table-column
        label="头衔">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级讲师' : '特级讲师' }}
        </template>
      </el-table-column>

      <el-table-column
        prop="intro"
        label="资历"
        width="380px">
      </el-table-column>

      <el-table-column
        prop="gmtCreate"
        label="添加时间">
      </el-table-column>

      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>

      <el-table-column
        label="操作"
        min-width="200px">
        <template slot-scope="scope">
          <router-link :to="'/teacher/save/'+scope.row.id">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          </router-link>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页区域-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

</template>

<script>
import teacher from '@/api/edu/teacher'

export default {
  // 核心代码位置
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      teacherQuery: {},
      list: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取讲师列表
    getList() {
      teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then(response => {
          this.total = response.data.total
          this.list = response.data.rows
        })
    },
    // 处理页面数目变化
    handleSizeChange(size) {
      this.limit = size
      this.getList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getList()
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
      this.getList()
    },
    deleteDataById(id) {
      this.$confirm('此操作将永久删除该讲师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.deleteTeacherById(id)
          .then(response => {
            // 提示信息
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            // 回到列表页面
            this.getList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>
