$(document).ready(function () {

})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})



// input propertychange是时时检测输入框中内容的变化，而change()是在输入框失去焦点以后才检测内容的变化
$('.phoneNum input').on('input propertychange', function () {
    if ($(this).val() !== '') {
        $('.phoneNum .codeBtn').addClass('active')
    }else{
        $('.phoneNum .codeBtn').removeClass('active')
    }
})

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