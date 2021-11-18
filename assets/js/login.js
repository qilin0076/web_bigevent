$(function() {
    // 点击注册账号的连接
    $('#reg-box').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击登录账号的连接
    $('#login-box').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 从layui中获取form对象
    var form = layui.form;
    // 从layui中获取layer对象
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            // 通过属性选择
            var pwd = $('.reg-box [name = password]').val();
            if (pwd !== value) {
                return "两次输入的密码不一致请重新输入"
            }
        }
    });
    // 监听注册表单的提交按钮
    $('#form_reg').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },

            success: function(response) {
                if (response.status !== 0) {
                    layer.msg(response.message);
                    return console.log('res：' + response.message);
                }
                console.log("注册成功！");
                layer.msg("注册成功！请登陆");
                // 触发点击事件
                $('#login-box').click();
            }
        });
    });
    // 监听登陆的提交按钮
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            // 快速获取表单内的数据（必须要包含name属性)
            data: $(this).serialize(),
            success: function(response) {
                if (response.status !== 0) {
                    layer.msg(response.message);
                    return console.log('res：' + response.message);
                }
                console.log("登录成功！");
                // 将登录成功的token存储在localStorage中
                // 在HTML5中，新加入了一个localStorage特性，这个特性主要是用来作为本地存储来使用的，解决了cookie存储空间不足的问题(cookie中每条cookie的存储空间为4k)
                // localStorage常用方法
                // localStorage.setItem('存储名','存储值')
                localStorage.setItem('token', response.token);
                layer.msg("登录成功");
                console.log(response.token);
                // location.href="/url" 当前页面打开URL页面
            }
        });
    });
})