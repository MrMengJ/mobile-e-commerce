$(document).ready(function () {

})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click',function () {
    $('.header_bar').toggle();
})

// 选择栏切换效果
$('.bar li span').on('click',function () {
    $(this).addClass('active').parent().siblings().children().removeClass('active');
    var index = $(this).parent().index();
    $('.yhq .container ul').eq(index).addClass('active').siblings().removeClass('active');
})

//领取优惠券
$('.yhq .content_rf_box1').on('click',function () {
    $(this).css('display','none').siblings().css('display','block');
})