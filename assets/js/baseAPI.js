// 每次发起$.ajax、$.get、$post请求的时候都会先调用$.ajaxPrefilter函数，在这个函数中我们可以拦截拿到ajax请求的配置对象，只有这个函数调用完毕，才发起真正的ajax请求
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // 在发起ajax请求的时候先把访问路径拼接
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
    if (options.url.indexOf('/my/') !== -1) {
        // 统一为有权限的接口，设置headers请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        };
        console.log(1);
    };
    // 防止无权限进入页面
    options.complete = function(res) {
        // complete函数不管ajax请求成功还是失败都会调用这个函数
        console.log('执行了一次complete回调函数');
        console.log(res);
        console.log(res.responseJSON.status);
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token（手动添加的token也没有效）
            localStorage.removeItem('token');
            // 2. 强制跳转到登录页面
            location.href = 'login.html';
        };
    }
})