$(document).ready(function () {
    //控制category高度
    $('.category').height($('body').height() - $('header').height());
    // console.log($('.catleft').height()) //undefined  why??
    initLeft();
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
// $('.icon_menu').click(function () {
//     $('.header_bar').toggle();
// })

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
        childDom.style.webkitTransition = 'all .3 ease 0';
        childDom.style.transition = 'all .3 ease 0';
    }

    //删除过渡动画
    function removeTransition() {
        childDom.style.webkitTransition = 'translate 0 ease 0';
        childDom.style.transition = 'translate 0 ease 0';
    }

    //touchstart(当手指接触屏幕的那一刻)
    $(childDom).on('touchstart', function (event) {
        // 获取开始时的Y坐标
        startY = event.touches[0].clientY;//相对于父元素
        // startY = event.originalEvent.touches[0].clientY;//originalEvent是jquery在构造一个jq版event对象后引用的原始对象
        //实测以上两种方法效果一样
        startTime = new Date().getTime();//获取开始时的时间
    })

    //touchmove(滑动屏幕)
    $(childDom).on('touchmove', function (event) {
        event.preventDefault();
        // console.log("hello")
        //获取结束时的Y坐标
        endY = event.touches[0].clientY;
        // console.log(endY)
        moveY = endY - startY;
        // 允许滑动的区间
        if ((moveY - currentY) <= maxMoveY && (moveY - currentY) >= minMoveY) {
            childDom.style.transform = "translateY(" + (moveY - currentY) + "px)";
            childDom.style.webkitTransform = "translateY(" + (moveY - currentY) + "px)";
        }
    })

    //touchcancel(touch事件意外中断)
    $(childDom).on('touchcancel', function () {
        // 滑动结束后记录translateY的值
        if ((moveY - currentY) <= 0 && (moveY - currentY) >= (childH - parentH)) {
            currentY = moveY - currentY;
        }
        //
        else if ((moveY - currentY) > 0) {
            currentY = 0;
            addTransition();
            childDom.style.transform = "translateY(" + (currentY) + "px)";
            childDom.style.webkitTransform = "translateY(" + (currentY) + "px)";
        }
        //
        else if ((moveY - currentY) < (childH - parentH)) {
            currentY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY(" + (currentY) + "px)";
            childDom.style.webkitTransform = "translateY(" + (currentY) + "px)";
        }
        //参数重置
        startY = 0;
        endY = 0;
        moveY = 0;
    })

    //touchend(手指离开屏幕时)
    $(childDom).on('touchend', function () {
        // 滑动结束后记录translateY的值
        if ((moveY - currentY) <= 0 && (moveY - currentY) >= -(childH - parentH)) {
            currentY = moveY - currentY;
        }
        //
        else if ((moveY - currentY) > 0) {
            currentY = 0;
            addTransition();
            childDom.style.transform = "translateY(" + (currentY) + "px)";
            childDom.style.webkitTransform = "translateY(" + (currentY) + "px)";
        }
        //
        else if ((moveY - currentY) < (childH-parentH)) {
            currentY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY(" + (currentY) + "px)";
            childDom.style.webkitTransform = "translateY(" + (currentY) + "px)";
        }

        endTime = new Date().getTime();//结束时间
        //点击效果
        if(moveY ==0 && (endTime - startTime) < 200){
            var target = event.target.parentNode;
            $(target).addClass('active').siblings().removeClass('active');
            var index = parseInt($(target).index());
            $('.category .catRight .catRight_con').eq(index).addClass('active').siblings().removeClass('active');
            // 计算需要滑动的距离
            // var top target.index; //undefined  为什么？？
            var top = $(target).index()*liH;
            if (top < (childH - parentH)){
                addTransition();
                childDom.style.transform = "translateY("+(-top)+"px)";
                childDom.style.webkitTransform = "translateY("+(-top)+"px)";
                //设置当前的translateY的值
                currentY = -top;
            }else{
                addTransition();
                childDom.style.transform = "translateY("+(-(childH - parentH))+"px)";
                childDom.style.webkitTransform = "translateY("+(-(childH - parentH))+"px)";
                //设置当前的translateY的值
                currentY = -(childH - parentH);
            }
        }

        //参数重置
        startY = 0;
        endY = 0;
        moveY = 0;
    })
}
