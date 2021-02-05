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
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
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
      saveBtnDisabled: false,
      // 上传弹框的组件是否显示
      imagecropperShow: false,
      // 上传组件的key
      imagecropperKey: 0,
      // 说去dev.env.js里面的数据
      BASE_API: process.env.BASE_API
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
    // 上传成功的方法
    cropSuccess(data) {
      // 上传的接口里面返回图片的地址
      this.teacher.avatar = data.url
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 关闭上传弹框的方法
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
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
