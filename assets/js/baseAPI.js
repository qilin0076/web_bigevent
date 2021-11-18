// 每次发起$.ajax、$.get、$post请求的时候都会先调用$.ajaxPrefilter函数，在这个函数中我们可以拦截拿到ajax请求的配置对象，只有这个函数调用完毕，才发起真正的ajax请求
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // 在发起ajax请求的时候先把访问路径拼接
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
})