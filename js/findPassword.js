$(function () {
    var input1 = $('.securityCode input').val();
    var input2 = $('.username input').val();
    if (input1 && input2) {
        $('.nextBtn').addClass('active');
    }
    else{
        $('.nextBtn').removeClass('active');
    }
})


// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})

// 聚焦自动全选填充
$('.import input').focus(function () {
    $(this).select();
})

//下一步按钮显示效果
//input propertychange是时时检测输入框中内容的变化，而change()是在输入框失去焦点以后才检测内容的变化
$('.import input').on('input propertychange',function () {
    var input1 = $('.securityCode input').val();
    var input2 = $('.username input').val();
    if (input1 && input2) {
        $('.nextBtn').addClass('active');
    }
    else{
        $('.nextBtn').removeClass('active');
    }
})

//下一步是否有效
$(".nextBtn").on('click',function () {
    if ($(this).hasClass('active')){
        var url = $('.nextBtn').data('href');
        $('.nextBtn').attr('href',url);
    }
})
