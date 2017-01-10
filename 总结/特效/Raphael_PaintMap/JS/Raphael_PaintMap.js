function Raphael_PaintMap(div, json) {
    //为数组增加contains方法
    Array.prototype.contains = function (item) {
        return RegExp("\\b" + item + "\\b").test(this);
    };
    //画布
    var paper = Raphael(div, 600, 600);
    var lstAll = new Array();
    //json
    //var strJson = "[{name:'乔布斯',grade:'0',children:[{name:'奥巴马',grade:'1',children:[{name:'米歇尔',grade:'2',children:[{name:'玛丽亚',grade:'3',children:[{name:'沙皮狗',grade:'4'}]}]},{name:'普京',grade:'2',children:[{name:'玛丽亚',grade:'3'},{name:'娜塔莎',grade:'3'}]}]},{name:'比尔盖茨',grade:'1'}]}]";
    var strJson = json;
    var Json = eval(strJson);
    var circle = paper.circle(150, 35, 30);
    // 给绘制的圆圈填充颜色
    circle.attr("fill", "#66CCCC");
    // 设置画笔（stroke）的颜色为红色
    circle.attr("stroke", "red");
    var cX = circle.attr("cx");
    var cY = circle.attr("cy");
    var cR = circle.attr("r");
    paper.text(cX, cY, Json[0].name).attr("font-size", 15);
    PaintNode(cX, cY, cR, 0, Json[0].children[0],circle.id, paper, lstAll);
}
//node类型
function Node() {
    this.put = function (_key, _level, value, _fatherKey) {
        this.data = value;
        this.key = _key;
        this.level = _level;
        this.fatherKey = _fatherKey;
    };
}
//画图
function PaintNode(x, y, r, angle, nodeJson, fatherId, paper, lstAll) {
    //声明存放节点的一组paper对象
    var arrNode = new Array();
    //声明节点对象
    var objNode = new Node();
    //直线长度
    var lineLength = 70;
    //半径
    var paintR = 30;
    //旋转角度
    var cAngleAdd = 60;
    //填充颜色
    var fillColor = '';
    //字体大小
    var fontSize = '';
    switch (nodeJson.grade) {
        case '1':
            paintR = 30;
            cAngleAdd = 60;
            fontSize = '14';
            fillColor = '#ff6a00';
            break;
        case '2':
            paintR = 30;
            cAngleAdd = 30;
            fontSize = '14';
            fillColor = '#00ff90';
            break;
        case '3':
            paintR = 30;
            cAngleAdd = 30;
            fontSize = '14';
            fillColor = '#ffd800';
            break;
        default:
            paintR = 30;
            cAngleAdd = 30;
            fontSize = '14';
            fillColor = '#ff00dc';
            break;
    }
    //直线
    var pLine = paper.path("M " + x + " " + (parseInt(y) + parseInt(r)) + "L " + x + " " + (parseInt(y) + parseInt(r) + parseInt(lineLength))).attr({ transform: "r" + angle + "," + x + "," + y }).attr({ fill: '#fff000', 'stroke-width': 2, opacity: 1 });
    //箭头
    var pArrowhead = paper.path("M " + (parseInt(x) + 10) + " " + (parseInt(y) + parseInt(r) + parseInt(lineLength) - 10) + "L " + x + " " + (parseInt(y) + parseInt(r) + parseInt(lineLength) - 2) + "L" + (parseInt(x) - 10) + " " + (parseInt(y) + parseInt(r) + parseInt(lineLength) - 10)).attr({ transform: "r" + angle + "," + x + "," + y }).attr({ 'stroke-width': 2, opacity: 1 });
    //圆
    var pCircle = paper.circle(x, parseInt(y) + parseInt(r) + parseInt(lineLength) + paintR, paintR).attr({ transform: "r" + angle + "," + x + "," + y });
    // 给绘制的圆圈填充红色 (black)
    pCircle.attr("fill", fillColor);
    // 设置画笔（stroke）的颜色为红色
    pCircle.attr("stroke", "red");
    //文字
    var pText = paper.text(x, parseInt(y) + parseInt(r) + parseInt(lineLength) + paintR, nodeJson.name).attr({ transform: "r" + angle + "," + x + "," + y }).attr("font-size", fontSize);;
    //保存节点的一组paper对象
    arrNode[0] = pLine;
    arrNode[1] = pArrowhead;
    arrNode[2] = pCircle;
    arrNode[3] = pText;
    //初始化节点对象
    objNode.put(pCircle.id, nodeJson.grade, arrNode, fatherId);
    //节点对象追加到节点list
    lstAll[lstAll.length] = objNode;
    //mouseover，out事件
    pCircle.mouseover(function () {
        this.node.style.cursor = 'pointer';
        this.animate({ "fill-opacity": .6 }, 500);
    }).mouseout(function () {
        this.animate({ "fill-opacity": 1 }, 500);
    });
    //click事件
    pCircle.click(function () {
        if (nodeJson.children != null && nodeJson.children.length > 0) {
            var cX = this.attr("cx");
            var cY = this.attr("cy");
            var cR = this.attr("r");
            var cRealX = (cY - y) * (-parseFloat(Math.sin(angle * Math.PI / 180)).toFixed(2)) + x;
            var cRealY = (cY - y) * (parseFloat(Math.cos(angle * Math.PI / 180)).toFixed(2)) + y;
            var cChildNum = nodeJson.children.length;
            var cAngle = 0;
            if (cChildNum % 2 == 0) {
                cAngle = 0 - (cAngleAdd / 2) - ((cChildNum / 2) - 1) * cAngleAdd;
            }
            else {
                cAngle = 0 - ((cChildNum - 1) / 2) * cAngleAdd;
            }
            //判断是否已经加载过
            var circleCnt = paper.getElementsByPoint((cR + 1) * (-parseFloat(Math.sin(cAngle * Math.PI / 180)).toFixed(2)) + cRealX, (cR + 1) * (parseFloat(Math.cos(cAngle * Math.PI / 180)).toFixed(2)) + cRealY);
            if (circleCnt.length == 0) {
                //隐藏同一级的节点以及不属于自己的下级节点
                for (var n = 0; n < lstAll.length; n++) {
                    if (lstAll[n].level == nodeJson.grade && lstAll[n].key != this.id) {
                        var arrTemp = lstAll[n].data;
                        for (var m = 0; m < arrTemp.length; m++) {
                            arrTemp[m].animate({ opacity: 0 }, 1000);
                        }
                    }
                    else if (lstAll[n].level > nodeJson.grade) {
                        var arrTemp = lstAll[n].data;
                        for (var m = 0; m < arrTemp.length; m++) {
                            arrTemp[m].animate({ opacity: 0 }, 1000);
                        }
                    }
                }
                for (var i = 0; i < nodeJson.children.length; i++) {
                    PaintNode(cRealX, cRealY, cR, cAngle, nodeJson.children[i],this.id, paper, lstAll);
                    cAngle += cAngleAdd;
                }
            }
            else {
                //已加载的点击显示事件
                //隐藏同一级的节点以及不属于自己的下级节点
                for (var n = 0; n < lstAll.length; n++) {
                    //隐藏同级
                    if (lstAll[n].level == nodeJson.grade && lstAll[n].key != this.id) {
                        var arrTemp = lstAll[n].data;
                        for (var m = 0; m < arrTemp.length; m++) {
                            arrTemp[m].animate({ opacity: 0 }, 1000);
                        }
                    }
                    else if (lstAll[n].level > nodeJson.grade) {
                        var arrTemp = lstAll[n].data;
                        //显示下级
                        if (lstAll[n].fatherKey == this.id) {
                            for (var m = 0; m < arrTemp.length; m++) {
                                arrTemp[m].animate({ opacity: 1 }, 1000);
                            }
                        }
                        //隐藏其他下级
                        else {
                            for (var m = 0; m < arrTemp.length; m++) {
                                arrTemp[m].animate({ opacity: 0 }, 1000);
                            }
                        }
                    }
                }
            }
        }
    });
}
