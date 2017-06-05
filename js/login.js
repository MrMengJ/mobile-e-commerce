$(document).ready(function () {

})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})

// 聚焦自动全选填充
$('.import input').focus(function () {
    $(this).select();
})

//一个月免登录
$('.fastLogin span').on('click',function () {
    if ($(this).hasClass('active')){
        $(this).removeClass('active');
    }else{
        $(this).addClass('active');
    }
})

$('.fastLogin p').on('click',function () {
    if ($(this).siblings().hasClass('active')){
        $(this).siblings().removeClass('active')
    }else{
        $(this).siblings().addClass('active');
    }
})


// 登录按钮显示效果
//input propertychange是时时检测输入框中内容的变化，而change()是在输入框失去焦点以后才检测内容的变化
// 这里其实还可以实用键盘按下事件keyup()来实现，但个人认为是实用了on('input propertychange',function (){})这中方案
$('.import input').on('input propertychange',function () {
    var input1 = $('.securityCode input').val() !== '';
    var input2 = $('.username input').val() !== '';
    var input3 = $('.password input').val() !== '';
    if (input1 && input2 && input3) {
        var url = $('.loginBtn').addClass('active').data('href');
        console.log(url)
        $('.loginBtn').attr('href',url)
    }
    else{
        $('.loginBtn').removeClass('active');
        $('.loginBtn').removeAttr('href');
    }
})

// 一键登录
$('.easyLogin').on('click',function () {
    console.log(15)
    $(this).text('正在拉起手机APP')
})