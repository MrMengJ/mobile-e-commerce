$(document).ready(function () {

})
$(".category .catLeft li a").on('click',function () {
    $(this).parent().addClass('active').siblings().removeClass('active');
    var index = parseInt($(this).parent().index());
    // $('.category .catRight .catRight_con:eq(index)').addClass('active').siblings().removeClass('active');这样写就没有用
    $('.category .catRight .catRight_con').eq(index).addClass('active').siblings().removeClass('active');
})

$('.icon_menu').click(function () {
    $('.header_bar').toggle();
})