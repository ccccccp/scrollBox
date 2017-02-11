/**
 * Created by dell on 2017/2/9.
 */
define(function(){
    function getRandomColor() {//获取随机颜色
        var color = [0, 0, 0];
        for (var i = 0; i < 3; i++) {
            var one = parseInt(Math.random() * 255);
            color[i] = one;
        }
        return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
    }

    function delEvent(obj, event, fn, isCatch) {//删除事件
        var isCatch = false || isCatch
        if (obj.removeEventListener) {
            obj.removeEventListener(event, fn, isCatch);
            return true;
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + event, fn);
            return true;
        } else {
            return false;
        }
    }

    function addEvent(obj, event, fn, isCatch) {//增加事件
        var isCatch = false || isCatch;
        if (obj.attachEvent) {
            obj.attachEvent("on" + event, fn);
            return true;
        } else if (obj.addEventListener) {
            obj.addEventListener(event, fn, isCatch);
            return true;
        } else {
            return false;
        }
    }



    function getDom(id){return document.getElementById(id)}
    function getStyle(ele, styleName) {//获取样式
        if (ele.currentStyle) {//IE
            return ele.currentStyle[styleName];
        }
        else if (window.getComputedStyle) {
            return window.getComputedStyle(ele, null)[styleName];
        }
    }


    function getByClass(parent,cls){//通过CLASS名获取DOM
        var results=[];
        var es=parent.getElementsByTagName("*");
        for(var i=0;i<es.length;i++){
            if(es[i].className==cls){
                results.push(es[i]);
            }
        }
        return results;
    }
    function stopPro(eventObj) {//阻止事件流冒泡传递
        if (eventObj.stopPropagation) {
            eventObj.stopPropagation();
            return true;
        } else if (eventObj.cancelBubble) {
            eventObj.cancelBubble = true;
            return true;
        } else {
            return false;
        }
    }

    return {
        getRandomColor:getRandomColor,
        addEvent:addEvent,
        getStyle:getStyle,
        delEvent:delEvent,
        getDom:getDom,
        stopPro:stopPro,
        getByClass:getByClass
    }
});





























































