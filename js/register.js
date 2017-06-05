$(document).ready(function () {

})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})


//获取验证码按钮变红
// input propertychange是时时检测输入框中内容的变化，而change()是在输入框失去焦点以后才检测内容的变化
$('.phoneNum input').on('input propertychange', function () {
    if ($(this).val() !== '') {
        $('.phoneNum .codeBtn').addClass('active')
    }else{
        $('.phoneNum .codeBtn').removeClass('active')
    }
})

//所有选项都填写完毕，注册按钮变红
$('.import input').on('input propertychange',function () {
    var input1 = $('.securityCode input').val() !== '';
    var input2 = $('.phoneNum input').val() !== '';
    var input3 = $('.phoneNumCode input').val() !== '';
    var input4 = $('.password input').val() !== '';
    if ((input1 && input2) && (input3 && input4)) {
        $('.registerBtn').addClass('active');
    }
    else{
        $('.registerBtn').removeClass('active');
    }
})

// 输入正确的手机号码
$('.phoneNum input').blur(function () {
    var truePhoneNum = /^1[3|4|5|7|8]\d{9}$/;
    if(!(truePhoneNum.test($(this).val()))){
        $('.phoneNum p').text('请输入正确的手机号码')
        $(this).val('');
        $('.phoneNum .codeBtn').removeClass('active')
        $('.registerBtn').removeClass('active');
    }else{
        $('.phoneNum p').text('')
    }
})


// 限制密码长度为6到20位长度
$('.password input').blur(function () {
    var truePassword = /^\S{6,20}$/;
    if (!(truePassword.test($(this).val()))){
        $('.password p').text('登录密码长度应为6到20位');
        $(this).val('');
        $('.registerBtn').removeClass('active');
    }else{
        $('.password p').text('');
    }
})

// 是否可以注册了
$(".registerBtn").on('click',function () {
    if ($(this).hasClass('active')){
        var url = $('.registerBtn').data('href');
        $('.registerBtn').attr('href',url)
    }
})

