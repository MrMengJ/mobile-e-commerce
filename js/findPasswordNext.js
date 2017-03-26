$(document).ready(function () {

})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})

$('.phoneNum input').on('input propertychange', function () {
    if ($(this).val() !== '') {
        $('.nextBtn').addClass('active')
    }else{
        $('.nextBtn').removeClass('active')
    }


})