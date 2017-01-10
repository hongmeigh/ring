//预览方块类
function Prevision(){
	var arr = ["J","Z","S","L","T","I","O"];
	//随机选择一个类型，this.type此时是一个字母
	this.type = arr[_.random(0,6)];
	//自己的全部矩阵拿到，这些矩阵都是4*4
	this.allMatrix = BLOCKTYPE[this.type];
	//自己的方向总数
	this.directionAmount = this.allMatrix.length;
	//随机一个方向
	this.direction = _.random(0 , this.directionAmount - 1);
	//自己的矩阵
	this.matrix = this.allMatrix[this.direction];
}
Prevision.prototype.render = function(){
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(this.matrix[i][j] != 0){
				previsionTds[i][j].className = "block" + this.matrix[i][j];
			}else{
				previsionTds[i][j].className = "";
			}
		}
	}
}