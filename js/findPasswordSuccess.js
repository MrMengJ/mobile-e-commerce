$(function () {
    showTime();
})


//剩下的时间的显示及自动跳转
function showTime() {
    var setIn = setInterval(function () {
        var cut_time = $('.cut-time').text();
        cut_time--;
        $('.cut-time').text(cut_time);
        //清除计时器
        if ($('.cut-time').text() == 0){
            clearInterval(setIn);
           window.location = 'login.html'
}
},1000)
}