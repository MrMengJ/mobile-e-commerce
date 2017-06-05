$(document).ready(function () {
    var currentX ;//当前translateX值
})

$(document).ready(function () {
    // 切换默认的隐藏的导航栏显示状态
    $('.icon_menu').on('click',function () {
        $('.header_bar').toggle();
        $(".yhq").css('padding-top',$('.fixed-wrap').height())
    })
    //页面加载设置fixed-wrap.wrap的宽度
    $('.fixed-wrap .wrap').width(document.body.clientWidth);
    //领取优惠券
    $('.yhq .content_rf_box1').on('click',function () {
        $(this).css('display','none').siblings().css('display','block');
    })

    // $(".all-category-wrap").height(0);
    $(".yhq").css('padding-top',$('.fixed-wrap').height());


    categoryMove();
    toggle_category();
    show_category();
    all_category()
})

// 改变窗口大小是重载页面
// window.onresize = function () {
//     location.reload(true);
// }


// // 选择栏切换效果
// $('.bar li span').on('click',function () {
//     $(this).addClass('active').parent().siblings().children().removeClass('active');
//     var index = $(this).parent().index();
//     $('.yhq .container ul').eq(index).addClass('active').siblings().removeClass('active');
// })


//优惠券面板（.yhq）的动态margin-top值



//选择栏bar的top值
// function barTop() {
//     var headerH = $('.header').height();
//     console.log(headerH)
//     $(".bar").css('top',headerH);
// }


// 优惠券分类滑动选择
function categoryMove() {
    var parentDom = document.getElementsByClassName('bar_left')[0];//获取父盒子
    var childDom =parentDom.getElementsByTagName('ul')[0];//获取子盒子
    var liDom = $('.bar_left li');//li标签，类别列表
    var yhqDom = $('.yhq .container');
    var liW = liDom.width();//单个类别的宽
    var productWidth = 0;//所有类别总占用总宽度
    // 遍历设置商品总宽度
    liDom.each(function(index,element){
        productWidth += element.offsetWidth;
    })

    //获取父盒子宽度
    var parentW = parentDom.offsetWidth;

    //设置子盒子宽度
    // childDom.offsetWidth = productWidth; //无效
    // childDom.clientWidth = productWidth; //无效
    $(childDom).width(productWidth);//有效  这是为何？？
    var childW = childDom.offsetWidth;

    var startX = 0;//开始时的X坐标
    var endX = 0; //结束时的X坐标
    var moveX = 0;//手指滑动的距离
    currentX = 0;//当前translateY的值

    var startTime = 0;//开始时的时间
    var endTime = 0;//结束时的时间
    // 限制最大、最小滑动距离
    var minMoveX = -(childW - parentW);
    var maxMoveX = 0;

    //添加过渡动画
    function addTransition() {
        childDom.style.webkitTransition = 'all .3s ease 0s';
        childDom.style.mozTransition = 'all .3s ease 0s';
        childDom.style.oTransition = 'all .3s ease 0s';
        childDom.style.transition = 'all .3s ease 0s';
    }

    //删除过渡动画
    function removeTransition() {
        childDom.style.webkitTransition = 'all 0s ease 0s';
        childDom.style.mozTransition = 'all 0s ease 0s';
        childDom.style.oTransition = 'all 0s ease 0s';
        childDom.style.transition = 'all 0s ease 0s';
    }


    //touchstart 手指接触屏幕
    childDom.addEventListener('touchstart',function(event){
        startX = event.touches[0].clientX;//获取开始时的X坐标
        startTime = new Date().getTime();//获取开始时间
    },false)

    //touchmove  手指滑动屏幕
    childDom.addEventListener('touchmove',function (event) {
        event.preventDefault();
        endX = event.touches[0].clientX; //获取结束时的X坐标
        moveX = endX - startX;
        // console.log("move前currentX:"+currentX)
        // console.log("currentX+moveX:"+currentX+moveX)
        if ((currentX+moveX) <= maxMoveX && (currentX+moveX) >= minMoveX){
            childDom.style.webkitTransform = "translateX("+(currentX+moveX)+"px)";
            childDom.style.mozTransform = "translateX("+(currentX+moveX)+"px)";
            childDom.style.oTransform = "translateX("+(currentX+moveX)+"px)";
            childDom.style.msTransform = "translateX("+(currentX+moveX)+"px)";
            childDom.style.Transform = "translateX("+(currentX+moveX)+"px)";
        }
        // console.log("move后currentX:"+currentX)
    },false)

    //touchcannel touch事件意外中断
    childDom.addEventListener('touchcannel',function () {
        //记录当前的translateX值
        if((currentX+moveX) >= minMoveX && (currentX+moveX) <= maxMoveX){
            currentX = moveX + currentX;
        }

        //重置数据
        startX = 0;
        endX = 0;
        moveX = 0;
    },false)

    //touchend 手指离开屏幕
    childDom.addEventListener('touchend',function () {
        //记录当前的translateX值
        if((currentX+moveX) >= minMoveX && (currentX+moveX) <= maxMoveX){
            currentX = moveX + currentX;
            // console.log(currentX)
        }

        // console.log("touchend后currentX："+currentX)
        endTime  = new Date().getTime();

        //点击效果
        if ((endTime - startTime) < 200 && moveX == 0){
            // console.log(123)
            // 判断事件发生身上
            if (event.target.tagName == 'SPAN'){
                var target = event.target.parentNode;
                //当前span为'active'状态
                $(event.target).addClass('active').parent().siblings().children().removeClass('active');

            }else if(event.target.tagName == 'LI'){
                var target = event.target;
                //当前span为'active'状态
                $(target).children().addClass('active').parent().siblings().children().removeClass('active')
            }

            //遮罩高度为0
            $('.shade').height(0);

            //获取当前li为第几个
            var index = parseInt($(target).index());
            //计算滑动的距离
            var left = liW * index;
            var integer = parseInt(childW/parentW); //取整
            var remainder = childW%parentW; //取余
            if (left <= ((integer-1)*parentW+remainder)){
                addTransition();
                childDom.style.webkitTransform = "translateX("+(-left)+"px)";
                childDom.style.mozTransform = "translateX("+(-left)+"px)";
                childDom.style.oTransform = "translateX("+(-left)+"px)";
                childDom.style.msTransform = "translateX("+(-left)+"px)";
                childDom.style.Transform = "translateX("+(-left)+"px)";
                //设置当前的translateX的值
                currentX = -left;
                // console.log("点击1后current:"+currentX);
            }else{
                childDom.style.webkitTransform = "translateX("+(-(childW - parentW))+"px)";
                childDom.style.mozTransform = "translateX("+(-(childW - parentW))+"px)";
                childDom.style.msTransform = "translateX("+(-(childW - parentW))+"px)";
                childDom.style.oTransform = "translateX("+(-(childW - parentW))+"px)";
                childDom.style.Transform = "translateX("+(-(childW - parentW))+"px)";

                //设置当前的translateX的值
                currentX = -(childW - parentW);
                // console.log("点击2后current:"+currentX);
            }

            //all-category相应状态改变
            $(".all-category li").eq(index).children('span').addClass('active').parent().siblings().children('span').removeClass('active')
            $(".all-category-wrap").hide(300);


            //模拟加载效果
            yhqDom[0].style.webkitTransition= "all 0.2s ease 0s";
            yhqDom[0].style.transition = "all 0.2s ease 0s";
            yhqDom[0].style.opacity = 0;
            setTimeout(function(){
                yhqDom[0].style.opacity = 1;
            },300);
            // 优惠券部分加载
            var yhqPannel =  $('.yhq .container ul').eq(index);
            //点击才加载图片，不点击不加载，提升性能，优化体验
            yhqPannel.find('img').each(function () {
                $(this).attr('src',$(this).data('src'))
            })
            yhqPannel.addClass('active').siblings().removeClass('active');
            // 以上两个有的话，fixed-wrap的宽度会变为640,原因不明，所以先暂时加了下面的代码
            //设置fixed-wrap wrap的宽度为body的宽度
            $('.fixed-wrap .wrap').width(document.body.clientWidth);


        }

        // console.log("end后currentX："+currentX)
        //重置数据
        startX = 0;
        endX = 0;
        moveX = 0;
    },false)
}

//点击右边三角按钮显示/隐藏all-category-wrap
var angle = 0;
function toggle_category() {
    $(".bar_right").on('click',function () {
        angle += 180;
        $(this).find('img').css({
            webkitTransform: "rotate(" + angle + "deg)",
            mozTransform: "rotate(" + angle + "deg)",
            msTransform: "rotate(" + angle + "deg)",
            oTransform: "rotate(" + angle + "deg)",
            transform: "rotate(" + angle + "deg)",
        })

        var all_category =  $(".all-category");
        var all_categoryH = all_category.height();
        // //添加过渡动画
        // function addTransition() {
        //     all_category[0].style.webkitTransition = 'all .3s ease 0s';
        //     all_category[0].style.mozTransition = 'all .3s ease 0s';
        //     all_category[0].style.oTransition = 'all .3s ease 0s';
        //     all_category[0].style.transition = 'all .3s ease 0s';
        // }
        // //删除过渡动画
        // function removeTransition() {
        //     all_category[0].style.webkitTransition = 'all 0s linear 0s';
        //     all_category[0].style.mozTransition = 'all 0s linear 0s';
        //     all_category[0].style.oTransition = 'all 0s linear 0s';
        //     all_category[0].style.transition = 'all 0s linear 0s';e
        // }
        // addTransition();
        // 判断是隐藏还是显示
        if( all_category.hasClass('active')){
            all_category.removeClass('active');
            $('.shade').height(0);
            $(".all-category-wrap").hide(300)
            // $(".all-category-wrap").css('display','none')
            // $(".all-category-wrap").height(0);//暂时还无法添加动画效果

        }else{
            all_category.addClass('active')
            $('.shade').height(document.body.clientHeight);
            $(".all-category-wrap").show(300)

        }



    })
}

//点击遮罩区域隐藏all-category-wrap
function show_category(){
    var all_category =  $(".all-category");
    // //添加过渡动画
    // function addTransition() {
    //     all_category[0].style.webkitTransition = 'all .3s ease0s';
    //     all_category[0].style.mozTransition = 'all .3s ease0s';
    //     all_category[0].style.oTransition = 'all .3s ease0s';
    //     all_category[0].style.transition = 'all .3s ease 0s';
    // }
    // //删除过渡动画
    // function removeTransition() {
    //     all_category[0].style.webkitTransition = 'all 0s linear 0s';
    //     all_category[0].style.mozTransition = 'all 0s linear 0s';
    //     all_category[0].style.oTransition = 'all 0s linear 0s';
    //     all_category[0].style.transition = 'all 0s linear 0s';e
    // }
    // addTransition();

    $('.shade').on('click',function () {
        all_category.removeClass('active');
        $(this).height(0);
        $(".all-category-wrap").hide(300);//暂时还无法添加动画效果
    })
}


//分类表里点击相应事件
function all_category() {
    $('.all-category li').on('click',function(){
        $(this).children('span').addClass('active').parent().siblings().children('span').removeClass('active');
        $(".all-category").removeClass('active')
        $(".all-category-wrap").hide(300);
        $('.shade').height(0);
        var index = $(this).index();
        $('.bar_left li').eq(index).children('span').addClass('active').parent().siblings().children('span').removeClass('active');


        var parentDom = document.getElementsByClassName('bar_left')[0];//获取父盒子
        var childDom =parentDom.getElementsByTagName('ul')[0];//获取子盒子
        var liDom = $('.bar_left li');//li标签，类别列表
        var yhqDom = $('.yhq .container');
        var liW = liDom.width();//单个类别的宽
        var productWidth = 0;//所有类别总占用总宽度
        // 遍历设置商品总宽度
        liDom.each(function(index,element){
            productWidth += element.offsetWidth;
        })

        //获取父盒子宽度
        var parentW = parentDom.offsetWidth;

        //设置子盒子宽度
        // childDom.offsetWidth = productWidth; //无效
        // childDom.clientWidth = productWidth; //无效
        $(childDom).width(productWidth);//有效  这是为何？？
        var childW = childDom.offsetWidth;

        currentX = 0;//当前translateY的值


        //添加过渡动画
        function addTransition() {
            childDom.style.webkitTransition = 'all .3s ease 0s';
            childDom.style.mozTransition = 'all .3s ease 0s';
            childDom.style.oTransition = 'all .3s ease 0s';
            childDom.style.transition = 'all .3s ease 0s';
        }

        //删除过渡动画
        function removeTransition() {
            childDom.style.webkitTransition = 'all 0s ease 0s';
            childDom.style.mozTransition = 'all 0s ease 0s';
            childDom.style.oTransition = 'all 0s ease 0s';
            childDom.style.transition = 'all 0s ease 0s';
        }


        var left = liW*index;

        var integer = parseInt(childW/parentW); //取整
        var remainder = childW%parentW; //取余
        if (left <= ((integer-1)*parentW+remainder)){
            addTransition();
            childDom.style.webkitTransform = "translateX("+(-left)+"px)";
            childDom.style.mozTransform = "translateX("+(-left)+"px)";
            childDom.style.oTransform = "translateX("+(-left)+"px)";
            childDom.style.msTransform = "translateX("+(-left)+"px)";
            childDom.style.Transform = "translateX("+(-left)+"px)";
            //设置当前的translateX的值
            currentX = -left;
            // console.log("点击1后current:"+currentX);
        }else{
            childDom.style.webkitTransform = "translateX("+(-(childW - parentW))+"px)";
            childDom.style.mozTransform = "translateX("+(-(childW - parentW))+"px)";
            childDom.style.msTransform = "translateX("+(-(childW - parentW))+"px)";
            childDom.style.oTransform = "translateX("+(-(childW - parentW))+"px)";
            childDom.style.Transform = "translateX("+(-(childW - parentW))+"px)";

            //设置当前的translateX的值
            currentX = -(childW - parentW);
            // console.log("点击2后current:"+currentX);
        }
        //模拟加载效果
        yhqDom[0].style.webkitTransition= "all 0.2s ease 0s";
        yhqDom[0].style.transition = "all 0.2s ease 0s";
        yhqDom[0].style.opacity = 0;
        setTimeout(function(){
            yhqDom[0].style.opacity = 1;
        },300);
        // 优惠券部分加载
        var yhqPannel =  $('.yhq .container ul').eq(index);
        //点击才加载图片，不点击不加载，提升性能，优化体验
        yhqPannel.find('img').each(function () {
            $(this).attr('src',$(this).data('src'))
        })
        yhqPannel.addClass('active').siblings().removeClass('active');

        angle += 180;
        $(".bar_right").find('img').css({
            webkitTransform: "rotate(" + angle + "deg)",
            mozTransform: "rotate(" + angle + "deg)",
            msTransform: "rotate(" + angle + "deg)",
            oTransform: "rotate(" + angle + "deg)",
            transform: "rotate(" + angle + "deg)",
        })
    })
}
