$(document).ready(function () {
    //关注数量
    var proNum = $('.attention_pro li').length;
    $('.pro_attention .category_number').text(proNum);
    var shopNum = $('.attention_shop li').length;
    $('.shop_attention .category_number').text(shopNum);
})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})

//切换查看关注的商品还是店铺
$('.attentionCategoy li').on('click',function () {
    $(this).find('.wrap').addClass('active').parent().parent().siblings().find('.wrap').removeClass('active')
    var index = $(this).index();
    $('.attention_content ul').eq(index).css('display','block').siblings().css('display','none')
})

//取消关注并同时减少关注的商品数量
$('.attention_pro li .cancel_attention').on('click',function () {
    $(this).parent().parent().parent().parent().html('').css('height','0');
    var preProNum = parseInt($('.pro_attention .category_number').text())-1;
    $('.pro_attention .category_number').text(preProNum);
})


//添加至购物车提醒
$('.pro_bt_rf').on('click',function () {
    $('.shopcar_hint').show(600);
    setTimeout(function () {
        $('.shopcar_hint').hide(600)
    },2000)});

//取消关注提醒
$('.cancel_attention').on('click',function () {
    $('.cancel_hint').show(600);
    setTimeout(function () {
        $('.cancel_hint').hide(600)
    },2000)});