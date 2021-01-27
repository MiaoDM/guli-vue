<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from '@/api/edu/teacher'

export default {
  data() {
    return {
      teacher: {
        name: '',
        sort: 0,
        level: 0,
        career: '',
        intro: '',
        avatar: ''
      },
      saveBtnDisabled: false
    }
  },
  created() {
    this.init()
  },
  watch: {
    // 监听
    // 路由变化的方式，路由发成变化，方法就会执行
    $route(to, from) {
      this.init()
    }
  },
  methods: {
    init() {
      // 判断路径中有ID值，进行修改
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      } else {
        // 路径中么有ID值，进行添加
        this.teacher = {}
      }
    },
    saveOrUpdate() {
      if (this.teacher.id) {
        this.updateTeacher()
      } else {
        this.saveTeacher()
      }
    },
    // 添加讲师
    saveTeacher() {
      teacher.addTeacher(this.teacher)
        .then(response => {
          // 添加成功
          // 提示信息
          this.$message({
            message: '添加教师信息成功',
            type: 'success'
          })
          // 回到列表 路由跳转
          this.$router.push({ path: '/teacher/table' })
        })
    },
    // 修改讲师
    updateTeacher() {
      teacher.updateTeacherInfo(this.teacher)
        .then(response => {
          // 提示信息
          this.$message({
            message: '修改教师信息成功',
            type: 'success'
          })
          // 回到列表 路由跳转
          this.$router.push({ path: '/teacher/table' })
        })
    },
    // 根据讲师的ID查询信息
    getInfo(id) {
      teacher.getTeacherInfo(id)
        .then(response => {
          console.log(response.data.teacher)
          this.teacher = response.data.teacher
        })
    }
  }
}
</script>
