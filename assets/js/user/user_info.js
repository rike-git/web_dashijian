$(function () {
  var form = layui.form
  var layer = layui.layer
  // 创建自定义的用户规则
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称必须要在1~6位数以内'
      }
    }
  })

  initUserInfo()

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户失败')
        }
        console.log(res)
        // 调用 form.val() 快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }
  // 重置表单按钮
  $('#btnReset').on('click', function (e) {
    // 阻止表单的默认行为
    e.preventDefault()
    // 在重新调用 initUserInfo 函数
    initUserInfo()
  })

  // 监听表单的提交事件
  $('.layui-form').on('click', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，冲洗渲染用户的头像和用户的信息
        window.parent.getUserInfo()
      }
    })
  })
})
