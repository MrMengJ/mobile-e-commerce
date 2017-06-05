$(function () {

})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})


// "完成"按钮高亮
$('.import input').on('input propertychange', function () {
    if ($('.password input').val() !== '' && $('.passwordAgain input').val() !== '') {
        $('.finishBtn').addClass('active')
    } else {
        $('.finishBtn').removeClass('active')
    }
})


// 限制密码长度为6到20位长度
$('.password input').blur(function () {
    var truePassword = /^\S{6,20}$/;
    if (!(truePassword.test($(this).val()))) {
        $('.password p').text('登录密码长度应为6到20位');
        $(this).val('');
        $('.registerBtn').removeClass('active');
    } else {
        $('.password p').text('');
    }
})

$('.passwordAgain input').blur(function () {
    var truePassword = /^\S{6,20}$/;
    if (!(truePassword.test($(this).val()))) {
        $('.passwordAgain .firstP').text('登录密码长度应为6到20位');
        $(this).val('');
        $('.registerBtn').removeClass('active');
    } else {
        $('.passwordAgain .firstP').text('');
    }
})

// 聚焦自动全选填充
$('.import input').focus(function () {
    $(this).select();
})

//验证密码
//第一个密码的地方验证
$('.password input').blur(function () {
    // if ($('.passwordAgain input').val() !== ''){
        if ($(this).val() !== $('.passwordAgain input').val()) {
            $('.passwordAgain p:last-child').text('前后密码不一致');
            // $('.passwordAgain').val("");
            $('.finishBtn').removeClass('active');
        }else{
            $('.passwordAgain p:last-child').text('');
        }
    // }
})

//第二个密码的地方验证
$('.passwordAgain input').blur(function () {
    // if ($('.password input').val() !== ''){
        if ($(this).val() !== $('.password input').val()) {
            $('.passwordAgain p:last-child').text('前后密码不一致');
            // $(this).val("");
            $('.finishBtn').removeClass('active');
        }else{
            $('.passwordAgain p:last-child').text('');
        }
    // }
})

//"完成"按钮是否可用
$(".finishBtn").on('click',function () {
    if ($(this).hasClass('active')){
        var url = $('.finishBtn').data('href');
        $('.finishBtn').attr('href',url);
    }
})
