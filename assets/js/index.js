$(function () {
  // 调用 getUSerInfo 获取用户基本信息
  getUserInfo()

  // 绑定退出事件

  var layer = layui.layer
  $('#btnLogout').on('click', function () {
    // 提示用户是否确定退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 1、清空本地存储中的 token
      localStorage.removeItem('token')
      // 2、重新跳转到登陆页面
      location.href = '/login.html'

      // 3、关闭 confirm 咨讯框
      layer.close(index)
    })
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers 就是请求头的配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    },
    // 无论成功还是失败，最终都会调用 complete 回调函数
    /* complete: function (res) {
      console.log(res)
      // 在 complete 回到函数中，可以使用 res.responseJSON 拿到服务器相应来回的数据
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 1、强制清空 token
        localStorage.removeItem('token')
        // 2、强制跳转到登陆页面
        location.href = '/login.html'
      }
    } */
  })
}

// 渲染用户的头像

function renderAvatar(user) {
  // 1、获取用户的名称
  var name = user.nickname || user.username
  // 2、设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3、渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    // 把首字母转成大写
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
