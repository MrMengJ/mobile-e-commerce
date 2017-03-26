$(document).ready(function () {

})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})


// 切换状态栏
$('.nav li').on('click',function () {
    $(this).children().addClass('active').parent().siblings().children().removeClass('active');
    var index = $(this).index();
    $('.main_content ul').eq(index).addClass('active').siblings().removeClass('active');
})


// 删除商品
//动画
$('.delete_box').on('click',function () {
    $(this).addClass('active');
    //必须要加active，这是唯一标识哪个被点击了
    $('.win').css('display', 'block');
    $('.win_box').addClass('bounceInDown');
})

//取消删除
$('.win .cancel').on('click', function () {
    $('.win_box').css({
        'opacity': '0',
        'webkitTransform': 'translateY(0px)',
        'transform': 'translateY(0px)',
    })
    $('.win').css('display','none');
})

// 确认删除商品
$('.win .submit').on('click', function () {
    $('.win_box').css({
        'opacity': '0',
        'webkitTransform': 'translateY(0px)',
        'transform': 'translateY(0px)',
    })
    $('.win').css('display','none');
    $('.delete_box.active').parent().parent().html('').css('display','none');
    $('.delete_box.active').removeClass('active')
})