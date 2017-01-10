function Block(){
	//转块的类型就是预览图的类型
	this.type = pre.type;
	//自己的全部矩阵拿到，这些矩阵都是4*4
	this.allMatrix = pre.allMatrix;
	//自己的方向总数
	this.directionAmount = this.allMatrix.length;
	//随机一个方向
	this.direction = pre.direction;
	//自己的矩阵
	this.matrix = this.allMatrix[this.direction];
	//自己的位置（这个位置指的是4*4矩阵的左上角那个块块在大地图矩阵的坐标）
	this.row = 0;  //0~19
	this.col = 4;  //0~11

	//判断是否GAMEOVER
	this.checkGameOver();
}
//判定是否游戏结束，就是一诞生的时候，就卡主了，就说明失败了
Block.prototype.checkGameOver = function(){
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(this.matrix[i][j] != 0 && map.matrix[this.row + i][this.col + 2 + j] != 0){
				alert("GAME OVER!");
				clearInterval(timer);
				return;
			}
		}
	}
}
//渲染
Block.prototype.render = function(){	
	//遍历自己的小矩阵
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(this.matrix[i][j] != 0){
				tds[this.row + i][this.col + j].className = "block" + this.matrix[i][j];
			}
		}
	}
}
//下落
Block.prototype.goDown = function(){
	//先看看下面的行，会不会造成冲突。先探测。
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(this.matrix[i][j] != 0 && map.matrix[this.row + 1 + i][this.col + 2 + j] != 0){
				return false;
			}
		}
	}
	this.row++;
	return true;
}
//去死，自己卡住了， 自己变为尸体
Block.prototype.goDie = function(){
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(this.matrix[i][j] != 0){
				map.matrix[this.row + i][this.col + 2 + j] = this.matrix[i][j];
			}
		}
	}
}
//左移
Block.prototype.goLeft = function(){
	//先看看左边的列，会不会造成冲突。先探测。
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(this.matrix[i][j] != 0 && map.matrix[this.row + i][this.col + 2 - 1 + j] != 0){
				return;
			}
		}
	}
	this.col--;
}
//右移
Block.prototype.goRight = function(){
	//先看看左边的列，会不会造成冲突。先探测。
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(this.matrix[i][j] != 0 && map.matrix[this.row + i][this.col + 2 + 1 + j] != 0){
				return;
			}
		}
	}
	this.col++;
}
//变形
Block.prototype.changeDirection = function(){
	//备份原来的
	var olddirection = this.direction;
	//先试探
	this.direction++;
	if(this.direction > this.directionAmount - 1){
		this.direction = 0;
	}
	//自己的矩阵要变
	this.matrix = this.allMatrix[this.direction];

	//先看看左边的列，会不会造成冲突。先探测。
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(this.matrix[i][j] != 0 && map.matrix[this.row + i][this.col + 2 + j] != 0){
				//不能变形，因为一旦变形会被卡住
				//变形失败，把自己的形状换回来之前备份的形状
				this.direction = olddirection;
				this.matrix = this.allMatrix[this.direction];
				return false;
			}
		}
	}
}