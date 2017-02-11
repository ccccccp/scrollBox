/**
 * Created by dell on 2017/2/9.
 */
define(['public'],function(public){

        var myscroll;
        function init(scroll,wrap,inner){
            console.log(public.getByClass);
            console.log(public.addEvent);
            myscroll=new Scroll(scroll,wrap,inner);
            public.addEvent(window,"mousedown",scrollDown);
            public.addEvent(window,"mousemove",scrollMove);
            public.addEvent(myscroll.wrap,"mouseleave",scrollUp);
            public.addEvent(window,"mouseup",scrollUp);
            public.addEvent(myscroll.wrap,"mousewheel",mouseWheel);
            public.addEvent(myscroll.wrap,"DOMMouseScroll",mouseWheel);
            myscroll.inner.style.userSelect="none";
        }
        //滚轴滚动事件
        function mouseWheel(e){
            var ev=e|| window.event;
            var step;
            if(ev.detail){//FF
                step=parseInt(ev.detail);
            }else if(ev.wheelDelta){//W3C
                step=parseInt(ev.wheelDelta/-40);
            }
            var nowMargin=parseInt(myscroll.inner.style.marginTop);
            if(isNaN(nowMargin)){
                nowMargin=0;
            }
            nowMargin-=(step*3);
            //计算负MARGIN
            var margin=Math.max(myscroll.minInnerMargin,Math.min(0,nowMargin));
            //计算滚轴距离
            var top=-margin/(Math.abs(myscroll.minMargin)/myscroll.maxTop);

            myscroll.inner.style.marginTop=margin+'px';
            myscroll.scroll.style.top=top+"px";
        }
        //添加鼠标按下事件
        function scrollDown(e){
            var ev=e||window.event;
            if(ev.target==myscroll.scroll){
                myscroll.isDown=true;
                myscroll.startY=ev.layerY;
                myscroll.offsetTop=myscroll.scroll.offsetTop;
                myscroll.startClientY=ev.clientY;
                public.stopPro(ev);

            }
        }
        //鼠标移动事件
        function scrollMove(e){
            if(!myscroll.isDown){
                return false;
            }
            var ev=e||window.event;
            var top=ev.clientY-myscroll.startClientY+myscroll.offsetTop;
//            console.log(top);
            top=Math.min(Math.max(top,0),myscroll.maxTop);
            myscroll.scroll.style.top=top+"px";
            var margin=-top*(Math.abs(myscroll.minMargin)/myscroll.maxTop);
            myscroll.inner.style.marginTop=margin+"px";
        }
        //鼠标移出抬起
        function scrollUp(){
            myscroll.isDown=false;
        }
        //初始化数据
        function Scroll(scroll,wrap,inner){
            this.scroll=public.getDom(scroll);
            this.wrap=public.getDom(wrap);
            this.inner=public.getDom(inner);
            if(this.inner.offsetHeight>this.wrap.offsetHeight){
                this.scroll.style.display="block";
                this.scroll.style.height=parseInt(this.wrap.clientHeight*(this.wrap.offsetHeight/this.inner.offsetHeight))+"px";
            }

            this.minMargin=-(this.inner.offsetHeight-parseInt(public.getStyle(this.wrap,'height')));
            this.maxTop=this.wrap.clientHeight-this.scroll.offsetHeight-parseInt(public.getStyle(this.scroll,"marginBottom"));
            this.minInnerMargin=-(this.inner.offsetHeight-this.wrap.clientHeight);
            this.isDown=false;
            this.startClientY=0;
            this.offsetTop=0;//按下时滚动条距离父容器顶部距离
            this.startY=0;//按下时距离事件源顶部距离
        }
    return {init:init};
});


