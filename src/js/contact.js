﻿
// 加载百度地图需要的js
function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?key=&v=1.1&services=true&callback=initMap";
    document.body.appendChild(script);
}

// 创建和初始化地图函数：
function initMap() {
    createMap();// 创建地图
    setMapEvent();// 设置地图事件
    addMapControl();// 向地图添加控件
    addMarker();// 向地图中添加marker
}

// 创建地图函数：
function createMap() {
    var map = new BMap.Map("J_map"); //在百度地图容器中创建一个地图
    var point = new BMap.Point(120.764801, 30.733973); //定义一个中心点坐标
    map.centerAndZoom(point, 18);// 设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;// 将map变量存储在全局
}

// 地图事件设置函数：
function setMapEvent() {
    map.enableDragging();// 启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();// 启用地图滚轮放大缩小
    map.enableDoubleClickZoom();// 启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();// 启用键盘上下左右键移动地图
}

// 地图控件添加函数：
function addMapControl() {
    // 向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL });
    map.addControl(ctrl_nav);
    // 向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 0 });
    map.addControl(ctrl_ove);
    // 向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    map.addControl(ctrl_sca);
}

// 标注点数组
var markerArr = [{
    title: "仰新网络",
    content: "嘉兴市南湖区秦逸路56号华隆广场2幢7楼",
    point: "120.764887|30.73447",
    isOpen: 1,
    icon: { w: 23, h: 25, l: 46, t: 21, x: 9, lb: 12 }
}];

// 创建marker
function addMarker() {
    for (var i = 0; i < markerArr.length; i++) {
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0, p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point, { icon: iconImg });
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title, { "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20) });
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
            borderColor: "#808080",
            color: "#333",
            cursor: "pointer",
            padding: "10px 20px",
            fontSize: "14px",
            borderRadius: "6px"
        });

        (function () {
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click", function () {
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open", function () {
                _marker.getLabel().hide();
            })
            _iw.addEventListener("close", function () {
                _marker.getLabel().show();
            })
            label.addEventListener("click", function () {
                _marker.openInfoWindow(_iw);
            })
            if (!!json.isOpen) {
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
}

// 创建InfoWindow
function createInfoWindow(i) {
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" +
        json.title + "'>" +
        json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
    return iw;
}

// 创建一个Icon
function createIcon(json) {
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png",
        new BMap.Size(json.w, json.h), { imageOffset: new BMap.Size(-json.l, -json.t), infoWindowOffset: new BMap.Size(json.lb + 5, 1), offset: new BMap.Size(json.x, json.h) })
    return icon;
}

window.onload = loadJScript;