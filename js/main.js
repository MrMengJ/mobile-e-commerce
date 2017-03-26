$(document).ready(function(){
    search();
    secondKill();
})
    var banner=$(".banner"),  //获取最外层框架的名称
        ul=banner.find("ul"),
        showNumber=banner.find(".showNav li"),//获取按钮
        oneWidth=banner.find("ul li").eq(0).width(); //获取每个图片的宽度
    var timer=null; //定时器返回值，主要用于关闭定时器
    var iNow=0;  //iNow为正在展示的图片索引值，当用户打开网页时首先显示第一张图，即索引值为0
   showNumber.on("click",function(){   //为每个按钮绑定一个点击事件
        $(this).addClass("active").siblings().removeClass("active"); //按钮点击时为这个按钮添加高亮状态，并且将其他按钮高亮状态去掉
        var index=$(this).index(); //获取哪个按钮被点击，也就是找到被点击按钮的索引值
        iNow=index;

        ul.animate({

            "left":-oneWidth*iNow, //注意此处用到left属性，所以ul的样式里面需要设置position: relative; 让ul左移N个图片大小的宽度，N根据被点击的按钮索引值iNOWx确定
        })
    });

    timer=setInterval(function(){  //打开定时器
        iNow++;       //让图片的索引值次序加1，这样就可以实现顺序轮播图片
        if(iNow>showNumber.length-1){ //当到达最后一张图的时候，让iNow赋值为第一张图的索引值，轮播效果跳转到第一张图重新开始
            iNow=0;
        }
        showNumber.eq(iNow).trigger("click"); //模拟触发数字按钮的click
    },2500); //2000为轮播的时间


// 搜索框固定，变色
var search = function(){
    /*搜索框对象*/
    var search = document.getElementsByClassName('header_box')[0];
    /*banner对象*/
    var banner = document.getElementsByClassName('banner')[0];
    /*高度*/
    var height = banner.offsetHeight;

    window.onscroll = function(){
        var top = document.body.scrollTop;
        /*当滚动高度大于banner的高度时候颜色不变*/
        if(top > height){
            search.style.background  = "rgba(201,21,35,0.85)";
        }else{
            var op = top/height * 0.85;
            search.style.background  = "rgba(201,21,35,"+op+")";
        }
    };
};

/*秒杀倒计时*/
var secondKill = function(){
    /*父盒子*/
    var parentTime = document.getElementsByClassName('sk_time')[0];
    /*span时间*/
    var timeList = parentTime.getElementsByClassName('num');
    var times = 6   * 60 * 60;
    timer = setInterval(function(){
        times  -- ;
        var h = Math.floor(times/(60*60));
        var m = Math.floor(times/60%60);
        var s = times%60;
        timeList[0].innerHTML = h>10?Math.floor(h/10):0;
        timeList[1].innerHTML = h%10;
        timeList[2].innerHTML = m>10?Math.floor(m/10):0;
        timeList[3].innerHTML = m%10;
        timeList[4].innerHTML = s>10?Math.floor(s/10):0;
        timeList[5].innerHTML = s%10;
        if(times <= 0){
            clearInterval(timer);
        }
    },1000);

}