$(document).ready(function () {
    //控制category高度
    $('.category').height($('body').height() - $('header').height());
    // console.log($('.catleft').height()) //undefined  why??
    // 切换默认的隐藏的导航栏显示状态
    $('.icon_menu').on('click',function () {
        $('.header_bar').toggle();
    })
    initLeft();
    initRight();
})

// 改变窗口大小是重载页面
window.onresize = function () {
    location.reload(true);
}

// $(".category .catLeft li a").on('click', function () {
//     $(this).parent().addClass('active').siblings().removeClass('active');
//     var index = parseInt($(this).parent().index());
//     // $('.category .catRight .catRight_con:eq(index)').addClass('active').siblings().removeClass('active');这样写就没有用
//     $('.category .catRight .catRight_con').eq(index).addClass('active').siblings().removeClass('active');
// })
//



//carLeft 左侧分类交互
function initLeft() {
    // 获取父元素容器
    // var parentDom = $('.catleft');
    var parentDom = document.getElementsByClassName('catLeft')[0];
    // 获取子元素容器
    var childDom = parentDom.getElementsByTagName('ul')[0];
    // 获取列表
    // var liDom =childDom.getElementsByTagName('li')[0];
    var liDom = $('.catLeft li');
    //获取右边分类
    var rightDom = document.getElementsByClassName('catRight')[0]

    //父元素容器的高
    var parentH = parentDom.offsetHeight;
    // var parentH = $('.catLeft').height() //undefined why？？下同
    //子元素容器的高
    var childH = childDom.offsetHeight;
    // //列表中单个li标签的高
    var liH = liDom.height();  //有值
    // var liH = liDom.offsetHeight;

    //滑动
    var startY = 0;//开始时的Y坐标
    var endY = 0;//结束时的Y坐标
    var moveY = 0;//滑动的距离
    var currentY = 0;//当前元素translateY的值
    var startTime = 0;//点击开始时的时间
    var endTime = 0;//点击结束时的时间

    //限制最大最小滑动距离
    var maxMoveY = 150;
    var minMoveY = -(childH - parentH + 150);

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


    //touchstart(当手指接触屏幕的那一刻)
    childDom.addEventListener('touchstart', function (event) {
        // 获取开始时的Y坐标
        startY = event.targetTouches[0].clientY;//相对于父元素
        // startY = event.originalEvent.touches[0].clientY;//originalEvent是jquery在构造一个jq版event对象后引用的原始对象
        //实测以上两种方法效果一样
        startTime = new Date().getTime();//获取开始时的时间
    }, false);

    //touchmove(滑动屏幕)
    // $(childDom).on('touchmove', function (event) {
    //     event.preventDefault();
    //     // console.log("hello")
    //     //获取结束时的Y坐标
    //     endY = event.touches[0].clientY;
    //     // console.log(endY)
    //     moveY = endY - startY;
    //     // 允许滑动的区间
    //     if ((moveY + currentY) <= maxMoveY && (moveY + currentY) >= minMoveY) {
    //         childDom.style.transform = "translateY(" + (moveY + currentY) + "px)";
    //         childDom.style.webkitTransform = "translateY(" + (moveY + currentY) + "px)";
    //     }
    // })

    childDom.addEventListener("touchmove", function (event) {
        event.preventDefault();
        // console.log("hello")
        //获取结束时的Y坐标
        endY = event.targetTouches[0].clientY;
        // console.log(endY)
        moveY = endY - startY;
        // 允许滑动的区间
        if ((moveY + currentY) <= maxMoveY && (moveY + currentY) >= minMoveY) {
            removeTransition();
            childDom.style.webkitTransform = "translateY(" + (moveY + currentY) + "px)";
            childDom.style.mozTransform = "translateY(" + (moveY + currentY) + "px)";
            childDom.style.oTransform = "translateY(" + (moveY + currentY) + "px)";
            childDom.style.msTransform = "translateY(" + (moveY + currentY) + "px)";
            childDom.style.transform = "translateY(" + (moveY + currentY) + "px)";
        }
    }, false)

    // touchcancel(touch事件意外中断)
    childDom.addEventListener('touchcancel', function () {
        // 滑动结束后记录translateY的值
        if ((moveY + currentY) <= 0 && (moveY + currentY) >= (childH - parentH)) {
            currentY = moveY + currentY;
        }
        //下划过头就弹回
        else if ((moveY + currentY) > 0) {
            currentY = 0;
            addTransition();
            childDom.style.webkitTransform = "translateY(" + (currentY) + "px)";
            childDom.style.mozTransform = "translateY(" + (currentY) + "px)";
            childDom.style.oTransform = "translateY(" + (currentY) + "px)";
            childDom.style.msTransform = "translateY(" + (currentY) + "px)";
            childDom.style.transform = "translateY(" + (currentY) + "px)";
        }
        //上划过头就弹回
        else if ((moveY + currentY) < -(childH - parentH)) {
            currentY = -(childH - parentH);
            addTransition();
            childDom.style.webkitTransform = "translateY(" + (currentY) + "px)";
            childDom.style.mozTransform = "translateY(" + (currentY) + "px)";
            childDom.style.msTransform = "translateY(" + (currentY) + "px)";
            childDom.style.oTransform = "translateY(" + (currentY) + "px)";
            childDom.style.transform = "translateY(" + (currentY) + "px)";
        }
        //参数重置
        startY = 0;
        endY = 0;
        moveY = 0;
    }, false)

    //touchend(手指离开屏幕时)
    childDom.addEventListener('touchend', function () {
        // 滑动结束后记录translateY的值
        if ((moveY + currentY) <= 0 && (moveY + currentY) >= -(childH - parentH)) {
            currentY = moveY + currentY;
        }
        //下划过头接弹回
        else if ((moveY + currentY) > 0) {
            currentY = 0;
            addTransition();
            childDom.style.webkitTransform = "translateY(" + (currentY) + "px)";
            childDom.style.mozTransform = "translateY(" + (currentY) + "px)";
            childDom.style.oTransform = "translateY(" + (currentY) + "px)";
            childDom.style.msTransform = "translateY(" + (currentY) + "px)";
            childDom.style.transform = "translateY(" + (currentY) + "px)";
        }
        //上划过头就弹回
        else if ((moveY + currentY) < -(childH - parentH)) {
            currentY = -(childH - parentH);
            addTransition();
            childDom.style.webkitTransform = "translateY(" + (currentY) + "px)";
            childDom.style.mozTransform = "translateY(" + (currentY) + "px)";
            childDom.style.oTransform = "translateY(" + (currentY) + "px)";
            childDom.style.msTransform = "translateY(" + (currentY) + "px)";
            childDom.style.transform = "translateY(" + (currentY) + "px)";
        }

        endTime = new Date().getTime();//结束时间

        //点击效果
        if (moveY == 0 && (endTime - startTime) < 200) {
            //模仿加载效果
            //若点击已是active状态的列表按钮，则没有加载动画
            if(!($(event.target).parent().hasClass('active'))){
                rightDom.style.webkitTransition= "all 0.8s ease 0s";
                rightDom.style.transition = "all 0.8s ease 0s";
                rightDom.style.opacity = 0;
                setTimeout(function(){
                    rightDom.style.opacity = 1;
                },300);
            }
            var target = event.target.parentNode;

            var index = parseInt($(target).index());
            var catRightPannel =  $('.category .catRight .catRight_con').eq(index);
            catRightPannel.addClass('active').siblings().removeClass('active');
            initRight();
            //点击才加载图片，不点击不加载，提升性能，优化体验
            catRightPannel.find('img').each(function () {
                $(this).attr('src',$(this).data('src'))
            })

            //模仿加载效果
            //若点击已是active状态的列表按钮，则没有加载动画
            if(!($(event.target).parent().hasClass('active'))){
                rightDom.style.webkitTransition= "all 0.8s ease 0s";
                rightDom.style.transition = "all 0.8s ease 0s";
                rightDom.style.opacity = 0;
                setTimeout(function(){
                    rightDom.style.opacity = 1;
                },300);
            }

            //最后才将点击的列别按钮设为“active”状态，因为前面模拟加载效果需要获取未改变active前的按钮是否“active”
            $(target).addClass('active').siblings().removeClass('active');

            // 计算需要滑动的距离
            // var top = target.index; //undefined  为什么？？
            var top = $(target).index() * liH;
            if (top < (childH - parentH)) {
                addTransition();
                childDom.style.webkitTransform = "translateY(" + (-top) + "px)";
                childDom.style.mozTransform = "translateY(" + (-top) + "px)";
                childDom.style.msTransform = "translateY(" + (-top) + "px)";
                childDom.style.oTransform = "translateY(" + (-top) + "px)";
                childDom.style.transform = "translateY(" + (-top) + "px)";
                //设置当前的translateY的值
                currentY = -top;
            } else {
                addTransition();
                childDom.style.webkitTransform = "translateY(" + (-(childH - parentH)) + "px)";
                childDom.style.mozTransform = "translateY(" + (-(childH - parentH)) + "px)";
                childDom.style.msTransform = "translateY(" + (-(childH - parentH)) + "px)";
                childDom.style.oTransform = "translateY(" + (-(childH - parentH)) + "px)";
                childDom.style.transform = "translateY(" + (-(childH - parentH)) + "px)";
                //设置当前的translateY的值
                currentY = -(childH - parentH);
            }
        }

        //参数重置
        startY = 0;
        endY = 0;
        moveY = 0;
    }, false)
}


//右边分类交互
function initRight() {
    //获取父盒子
    var parentDom = document.getElementsByClassName('catRight')[0];
    //获取活动子盒子
    var childDom = parentDom.getElementsByClassName('active')[0];
    //父盒子高度
    var parentH = parentDom.offsetHeight;
    //子盒子高度
    var childH = childDom.offsetHeight;

    var startY = 0; //开始时Y坐标
    var endY = 0; //结合苏时Y坐标
    var moveY = 0; //手指滑动的距离
    var currentY = 0; //当前的translateY值


    var maxMoveY = 150;//限制最大的滑动距离
    var minMoveY = -(childH - parentH + 150);//限制最小的滑动距离

    //添加过渡动画
    function addTransition() {
        childDom.style.webkitTransition = 'all .3 ease 0';
        childDom.style.mozTransition = 'all .3 ease 0';
        childDom.style.oTransition = 'all .3 ease 0';
        childDom.style.transition = 'all .3 ease 0';
    }

    //删除过渡动画
    function removeTransition() {
        childDom.style.webkitTransition = 'all 0 ease 0';
        childDom.style.mozTransition = 'all 0 ease 0';
        childDom.style.oTransition = 'all 0 ease 0';
        childDom.style.transition = 'all 0 ease 0';
    }

    //touchstart
    childDom.addEventListener('touchstart', function (event) {
        //获取开始时的Y坐标
        startY = event.touches[0].clientY;

    }, false);

    //touchmove
    childDom.addEventListener('touchmove', function (event) {
        event.preventDefault();
        //获取结束时的Y坐标
        endY = event.touches[0].clientY;
        //手指滑动的距离
        moveY = endY - startY;
        if ((moveY + currentY) <= maxMoveY && (moveY + currentY) >= minMoveY) {
            removeTransition();
            childDom.style.webkitTransform = "translateY(" + (moveY + currentY) + "px)";
            childDom.style.mozTransform = "translateY(" + (moveY + currentY) + "px)";
            childDom.style.msTransform = "translateY(" + (moveY + currentY) + "px)";
            childDom.style.oTransform = "translateY(" + (moveY + currentY) + "px)";
            childDom.style.transform = "translateY(" + (moveY + currentY) + "px)";
        }
    }, false)

    //touchcannel
    childDom.addEventListener('touchcannel', function () {
        // 记录当前translateY值
        if ((moveY + currentY) <= 0 && (moveY + currentY) >= -(childH - parentH)) {
            currentY = moveY + currentY;
        }
        // 下划过头弹回
        else if ((moveY + currentY) > 0) {
            currentY = 0;
            addTransition();
            childDom.style.webkitTransform = "translateY(" + currentY + "px)"
            childDom.style.mozTransform = "translateY(" + currentY + "px)"
            childDom.style.msTransform = "translateY(" + currentY + "px)"
            childDom.style.oTransform = "translateY(" + currentY + "px)"
            childDom.style.transform = "translateY(" + currentY + "px)"
        }
        // 上划过头弹回
        else if ((moveY + currentY) < -(childH - parentH)) {
            currentY = -(childH - parentH);
            addTransition();
            childDom.style.webkitTransform = "translateY(" + currentY + "px)";
            childDom.style.mozTransform = "translateY(" + currentY + "px)";
            childDom.style.msTransform = "translateY(" + currentY + "px)";
            childDom.style.oTransform = "translateY(" + currentY + "px)";
            childDom.style.transform = "translateY(" + currentY + "px)";
        }

        //重置数据
        startY = 0;
        endY = 0;
        moveY = 0;
    }, false)

    //touchend
    childDom.addEventListener('touchend', function () {
        // 记录当前translateY值
        if ((moveY + currentY) <= 0 && (moveY + currentY) >= -(childH - parentH)) {
            currentY = moveY + currentY;
        }
        // 下划过头弹回
        else if ((moveY + currentY) > 0) {
            currentY = 0;
            addTransition();
            childDom.style.webkitTransform = "translateY(" + currentY + "px)"
            childDom.style.mozTransform = "translateY(" + currentY + "px)"
            childDom.style.msTransform = "translateY(" + currentY + "px)"
            childDom.style.oTransform = "translateY(" + currentY + "px)"
            childDom.style.transform = "translateY(" + currentY + "px)"
        }
        // 上划过头弹回
        else if ((moveY + currentY) < -(childH - parentH)) {
            if(childH < parentH){
                currentY = 0;
            }else{
                currentY = -(childH - parentH);
            }
            addTransition();
            childDom.style.webkitTransform = "translateY(" + currentY + "px)";
            childDom.style.mozTransform = "translateY(" + currentY + "px)";
            childDom.style.msTransform = "translateY(" + currentY + "px)";
            childDom.style.oTransform = "translateY(" + currentY + "px)";
            childDom.style.transform = "translateY(" + currentY + "px)";
        }

        //重置数据
        startY = 0;
        endY = 0;
        moveY = 0;
    }, false)
}
