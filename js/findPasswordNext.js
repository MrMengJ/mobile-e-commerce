$(document).ready(function () {

    //随机生成字符串
    function randomString(len) {
        var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0;i<len;i++){
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    //随机用户名
    $('.username_text span:last-child').text(randomString(10));

    if ($('.yzNum input').val() !== '') {
        $('.nextBtn').addClass('active')
    }else{
        $('.nextBtn').removeClass('active')
    }
    
})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})

// // 输入正确的手机号码
// $('.phoneNum input').blur(function () {
//     var truePhoneNum = /^1[3|4|5|7|8]\d{9}$/;
//     if(!(truePhoneNum.test($(this).val()))){
//         $('.phoneNum p').text('请输入正确的手机号码')
//         $(this).val('');
//         $('.nextBtn').removeClass('active');
//     }else{
//         $('.phoneNum p').text('')
//     }
// })


// 聚焦自动全选填充
$('.import input').focus(function () {
    $(this).select();
})


//下一步高亮
$('.yzNum input').on('input propertychange', function () {
    if ($(this).val() !== '') {
        $('.nextBtn').addClass('active')
    }else{
        $('.nextBtn').removeClass('active')
    }
})

//下一步是否有效
$(".nextBtn").on('click',function () {
    if ($(this).hasClass('active')){
        var url = $('.nextBtn').data('href');
        $('.nextBtn').attr('href',url);
    }
})
