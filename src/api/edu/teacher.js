import request from '@/utils/request'

export default {

  /**
   * 1讲师列表（条件分页查询）
   * @param current
   * @param limit
   * @param teacherQuery
   * @returns {*}
   */
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      // data表示把数据转化成json数据传递到接口里面
      data: teacherQuery
    })
  },
  /**
   * 逻辑删除讲师
   * @param id
   * @returns {*}
   */
  deleteTeacherById(id){
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  // 添加讲师
  addTeacher(teacher){
    return request({
      url: `/eduservice/edu-teacher/addTeacher`,
      method: 'post',
      data:teacher
    })
  },
  // 查询讲师信息
  getTeacherInfo(id){
    return request({
      url: `/eduservice/edu-teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  // 修改
  updateTeacherInfo(teacher){
    return request({
      url: `/eduservice/edu-teacher/updateTeacher`,
      method: 'post',
      data:teacher
    })
  }
}

