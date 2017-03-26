// window.onload = function () {
//     var win = document.getElementsByClassName('win')[0];
//     var winCon = win.getElementsByClassName('win_box')[0];
//     var delBtnTop;
//
//     var deleteBtn = document.getElementsByClassName('deleteBox');
//     // for (var i = 0; i < deleteBtn.length; i++) {
//     //     deleteBtn[i].onclick = function () {
//     //         // document.body.style.position = 'absolute';
//     //         win.style.display = 'block';
//     //         // var top = document.body.scrollTop + (window.innerHeight - winCon.offsetHeight)/2;
//     //         /*            winCon.style.webkitTransition = 'all 0.5s ease 0s';
//     //          winCon.style.transition = 'all 0.5s ease 0s';
//     //          winCon.style.opacity = 1;
//     //          winCon.style.webkitTransform = 'translateY('+top+'px)';
//     //          winCon.style.transform = 'translateY('+top+'px)';*/
//     //
//     //         winCon.className = "win_box bounceInDown";
//     //
//     //
//     //         /*动画*/
//     //         delBtnTop = this.getElementsByClassName('deleteBox_top')[0];
//     //         delBtnTop.style.webkitTransition = 'all 0.5s ease 0s';
//     //         delBtnTop.style.transition = 'all 0.5s ease 0s';
//     //         delBtnTop.style.webkitTransform = 'translateY(-5px) rotate(-45deg)';
//     //         delBtnTop.style.transform = 'translateY(-5px) rotate(-45deg)';
//     //     };
//     // };
//
//     // winCon.getElementsByClassName('cancel')[0].onclick = function () {
//     //     winCon.style.opacity = 0;
//     //     winCon.style.webkitTransform = 'translateY(0px)';
//     //     winCon.style.transform = 'translateY(0px)';
//     //     win.style.display = 'none';
//     //     /*动画*/
//     //     if (deleteBtn) {
//     //         delBtnTop.style.webkitTransition = 'all 0.5s ease 0s';
//     //         delBtnTop.style.transition = 'all 0.5s ease 0s';
//     //         delBtnTop.style.webkitTransform = 'translateY(0px) rotate(0deg)';
//     //         delBtnTop.style.transform = 'translateY(0px) rotate(0deg)';
//     //     }
//     //     return false;
//     // };
//     // winCon.getElementsByClassName('submit')[0].onclick = function () {
//     //     winCon.style.opacity = 0;
//     //     winCon.style.webkitTransform = 'translateY(0px)';
//     //     winCon.style.transform = 'translateY(0px)';
//     //     win.style.display = 'none';
//     //
//     //     /*动画*/
//     //     if (deleteBtn) {
//     //         delBtnTop.style.webkitTransition = 'all 0.5s ease 0s';
//     //         delBtnTop.style.transition = 'all 0.5s ease 0s';
//     //         delBtnTop.style.webkitTransform = 'translateY(0px) rotate(0deg)';
//     //         delBtnTop.style.transform = 'translateY(0px) rotate(0deg)';
//     //     }
//     //     return false;
//     // };
//
//     var checkBtn = document.getElementsByClassName('check_box');
//     for (var j = 0; j < checkBtn.length; j++) {
//         checkBtn[j].onclick = function () {
//             var hasChecked = this.getAttribute('title');
//             if (hasChecked !== null) {
//                 this.removeAttribute('title');
//             } else {
//                 this.setAttribute('title', 'checked');
//             }
//         }
//     }
// };


$(document).ready(function(){
    //页面加载默认全选所商品
    $('.check_box').attr('title', 'checked');



    // var priceA = 0;
    // var length = $('.product_check_box').length;
    // var productA = document.getElementsByClassName('product_check_box')
    // var i = 0
    // for(i;i<length;i++){
    //     productA[i].onclick=ha()
    // };
    //
    //
    // function ha() {
    //     // var allPro = document.getElementsByClassName('product_check_box');
    //     if(productA[i].getAttribute('title') == 'checked'){
    //         priceA = priceA - parseInt(this.innerText);
    //     }else{
    //         priceA = priceA + parseInt(this.innerText);
    //     }
    //     return priceA;
    //     console.log(priceA)
    // }


    // 选中效果
    var checkBtn = document.getElementsByClassName('check_box');
    for (var j = 0; j < checkBtn.length; j++) {
        checkBtn[j].onclick = function () {
            var hasChecked = this.getAttribute('title');
            if (hasChecked !== null) {
                this.removeAttribute('title');
            } else {
                this.setAttribute('title', 'checked');
            }
        }
    }
})

$(document).ready(function () {

})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})

// 运费说明
$('.shop_title .explain').on('click', function () {
    $('.shade_full').css('display', 'block');
})
$('.shade_full .content_box_bt').on('click', function () {
    $('.shade_full').css('display', 'none');
})

//改变商品数量
//增加数量
$('.changeNum_right').on('click', function () {
    // var val = parseInt($(this).siblings('.goods_amount').val())+1;
    var val = parseInt($(this).prev().val()) + 1;
    $(this).prev().val(val);
    $(this).siblings('span').css('backgroundPosition', '8px -115px')
});
//减少数量
$('.changeNum_left').on('click', function () {
    var val = parseInt($(this).next().val()) - 1;
    if (val > 0) {
        $(this).next().val(val);
    }
});
//数量不可以为非正整数
$(".changeNum input").blur(function () {
    var val = parseInt($(this).val());
    if (val = 1) {
        $(this).val(1)
        alert('选择数量不可以为非正整数喔')
    }
})



// 选择  //有bug，暂未解决，用原生的js写了一个
// $('.check_box').on('click',function () {
//   if ($(this).attr('checked') == 'checked'){
//       $(this).removeAttr('checked');
//   } else{
//       $(this).attr('checked','checked');
//   }
// })
// 全选非全选
//点击商品选择按钮
$('.product_check .check_box').on('click', function () {
    // 为什么是这样呢？？因为在click事件之后，this的checked属性被移除了，而if里面的是在事件click之前的状态  下面多项类似操作也是同样的道理！！！
    if ($(this).attr('title') == 'checked') {
        $('.option_check .check_box').removeAttr('title');
        $(this).parent().parent().parent().parent().prev().find('.check_box').removeAttr('title');
    }
})

//点击全选选择按钮
$('.option_check .check_box').on('click', function () {
    if ($(this).attr('title') == 'checked') {
        $('.product_check .check_box').removeAttr('title');
        $('.shop_check .check_box').removeAttr('title');
    }
    else {
        $('.product_check .check_box').attr('title', 'checked');
        $('.shop_check .check_box').attr('title', 'checked');
    }
})

//点击商店选择按钮
$('.shop_check .check_box').on('click', function () {
    if ($(this).attr('title') == 'checked') {
        $(this).parent().parent().next().find('.check_box').removeAttr('title');
        $('.option_check .check_box').removeAttr('title')
    } else {
        $(this).parent().parent().next().find('.check_box').attr('title', 'checked');
    }
})


// $('.product_check .check_box').on('click',function () {
// //     // var shop_check = $('.shop_check .check_box')[0];
// //     // var num = shop_check.has('.title')
// //     // var shopCheck = document.getElementsByClassName('shop_check_box');
// //     // var num = 0;
// //     // for (var i = 0 ; i<shopCheck.length;i++){
// //     //     if(shopCheck[i].getAttribute('title') == 'checked'){
// //     //         num++;
// //     //     }
// //     // }
// //     // console.log(shopCheck.length)
// //     // console.log(num)
// //     // if (num = shopCheck.length){
// //     //     console.log(12)
// //     //     $('.option_check .check_box').removeAttr('title','checked')
// //     // }
// //     // else{
// //     //     $('.option_check .check_box').attr('title')
// //     // }
//     var productCheck = document.getElementsByClassName('product_check_box');
//     var num1 = 0;
//     for (var i = 0 ; i<productCheck.length;i++){
//         if(productCheck[i].getAttribute('title') == 'checked'){
//             num1++;
//
//
//
//         }
//         console.log(num1)
//     }
//     // console.log(productCheck);
//     // console.log(num1)
//     if (num1 = productCheck.length){
//         $(this).parent().parent().parent().parent().next().find(".check_box").removeAttr('title')
//     }
//     else{
//         $(this).parent().parent().parent().parent().next().find(".check_box").attr('title','checked')
//     }
// })

// 删除商品
//动画
$('.deleteBox').on('click', function () {
    $(this).addClass('active');
    $('.win').css('display', 'block');
    $(this).children('.deleteBox_top').css({
        'webkitTransition': 'all 0.5s ease 0s',
        'transition': 'all 0.5s ease 0s',
        'webkitTransform': 'translateY(-5px) rotate(-45deg)',
        'transform': 'translateY(-5px) rotate(-45deg)'
    });
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
    $('.deleteBox.active').children('.deleteBox_top').css({
        'webkitTransition': 'all 0.5s ease 0s',
        'transition': 'all 0.5s ease 0s',
        'webkitTransform': 'translateY(0px) rotate(0deg)',
        'transform': 'translateY(0px) rotate(0deg)'
    })
    $('.deleteBox.active').removeClass('active');
})
// 确认删除商品
$('.win .submit').on('click', function () {
    $('.win_box').css({
        'opacity': '0',
        'webkitTransform': 'translateY(0px)',
        'transform': 'translateY(0px)',
    })
    $('.win').css('display','none');
    $('.deleteBox.active').children('.deleteBox_top').css({
        'webkitTransition': 'all 0.5s ease 0s',
        'transition': 'all 0.5s ease 0s',
        'webkitTransform': 'translateY(0px) rotate(0deg)',
        'transform': 'translateY(0px) rotate(0deg)'
    })
    $('.deleteBox.active').parent().parent().parent().parent().html('').css('display','none');
    $('.delete_box.active').removeClass('active');
})


//结算
// $('.check_box').on('click', function () {
//     // var priceAll = $('.price_num'); jqeury中的许多方法对其伪数组的成员来说没用，这个时候只能把jquery对象转化为js对象了
//     // var priceAll = document.getElementsByClassName('price_num');
//     var priceAmount = 0;
//     // if ($(this).attr('title') == 'checked'){
//         var priceChecked = $(".product_check .check_box[title='checked']").parent().next().find(".price_num").get(1);
//         console.log(priceChecked);
//     //     for (var i = 1;i < priceChecked.length;i++){
//     //         priceAmount = priceAmount + parseInt(priceAmount[i].innerText);
//     //              console.log(parseInt(priceChecked[i].innerText));
//     //          }
//     //
//     // }
//
//     // var priceAmount = 0;
//     // for (var i = 0;i < priceAll.length;i++){
//     //     priceAmount = priceAmount + parseInt(priceAll[i].innerText);
//     //     console.log(parseInt(priceAll[i].innerText));
//     // }
//     // $('.option_info .amount span').text(priceAmount);
//     // if ($(this).attr('title') == 'checked') {
//     //
//     // }
// })

// var length = $('product_check_box').length;
// for(var i = 0;i<length;i++){
//     console.log(132)
//     $('product_check_box')[i].on('click',function(){
//         ha();
//         console.log(priceA)
//     })
// }

