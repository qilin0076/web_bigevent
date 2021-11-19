$(function() {
    // 调用函数
    getUserInfo();
});
// 获取用户的基本信息
function getUserInfo() {
    console.log(1);
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // // headers就是请求头配置对象（统一移入baseAPI.js中）
        // headers: {
        //     // 获取localStorage里面的值
        //     Authorization: localStorage.getItem('token') || '',
        // },
        // 通过dataType选项还可以指定不同数据处理方式，默认类型是：String 预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如 XML MIME 类型就被识别为 XML。在 1.4 中，JSON 就会生成一个 JavaScript 对象，而 script则会执行这个脚本。随后服务器端返回的数据会根据这个值解析后，传递给回调函数。
        // dataType: "dataType",
        success: function(response) {
            if (response.status !== 0) {
                return layui.layer.msg('登录失败！');
            }
            // 调用renderAvatar函数渲染用户的头像
            renderAvatar(response.data);
        }
    });
};
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片图像隐藏文本头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像隐藏图片头像，用户名第一个字母选出转换为大写
        var firstName = name[0].toUpperCase();
        $('.text-avatar').html(firstName).show();
        $('.layui-nav-img').attr('src', user.user_pic).hide();
    }
}