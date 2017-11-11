//锁定浏览器缩放比例
var resizebody = new function(){
	var defaultZoom  = 1.5; //pc 1.6 , phone 1.35 //没办法其他函数需要用到只能只是为全局变量
	var bodyWidth    = 0;
    window.addEventListener("load",function(){resizebody();});
    window.addEventListener("resize",function(){resizebody();});
    return function(size){
		defaultZoom = (size)?size:defaultZoom;
        var outerWidth = window.screen.deviceXDPI  || window.outerWidth ;
        var innerWidth = window.screen.logicalXDPI || window.innerWidth ;
        //ie zoom的width有问题需要重置一下
        if(window.screen.deviceXDPI){
            document.body.style.zoom = 1;
            document.body.style.width = "100%";
            bodyWidth = parseInt(document.body.clientWidth);
            document.body.style.zoom = (1/(outerWidth/innerWidth))*defaultZoom;
            document.body.style.width = bodyWidth*(outerWidth/innerWidth)/defaultZoom+"px";
        }else
            document.body.style.zoom = (1/(outerWidth/innerWidth))*defaultZoom;
    };
}
resizebody();

//对ie还是有很大的问题


//如果写成OOP的方式,看一下有什么优点


var nowStatus           = -1;		// 0 for pc , 1 for pad ,2 for phone
var respondSwitch = new function(){
	var watershed_pad   = 990;
	var watershed_phone = 630;
	var nowStatusCount  = 3;
    window.addEventListener("load",function(){respondSwitch()});
    window.addEventListener("resize",function(){respondSwitch()});
	var respondFuncList = [];
	//通过respondSwitch("respondFuncList").push()
	var _bodyWidth = function(){
		var outerWidth = window.outerWidth ;
		var bodywidth  = outerWidth;
		if(window.screen.deviceXDPI){
			var outerWidth = window.screen.deviceXDPI  || window.outerWidth ;
        	var innerWidth = window.screen.logicalXDPI || window.innerWidth ;
            document.body.style.zoom = 1;
            document.body.style.width = "100%";
            bodywidth = parseInt(document.body.clientWidth);
			bodywidth = bodywidth*((outerWidth+0.8)/innerWidth);
			resizebody();
		}
		return bodywidth;
	}
	return function(argm){
		if(argm == "respondFuncList" ) return respondFuncList; 
		var bodywidth = _bodyWidth();
		if( watershed_phone > bodywidth  && nowStatus != 2){
			nowStatus = 2;
		}else if( watershed_pad > bodywidth && bodywidth > watershed_phone && nowStatus != 1){
			nowStatus = 1;
		}
		else if( bodywidth > watershed_pad && nowStatus != 0){
			nowStatus = 0;
		}
		for(var i = 0 ; i < respondFuncList.length ; i++ )
			respondFuncList[i]();
	}
}