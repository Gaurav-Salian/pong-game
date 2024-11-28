//board

let board;
let boardwidth= 700;
let boardheight= 500;
let context;

//players
let playerwidth=10;
let playerheight =50;

let playervelocityy =0

let player1 ={
	x: 10,
	y: boardheight/2,
	width: playerwidth,
	height: playerheight,
	velocityy: playervelocityy
}

let player2 ={
	x: boardwidth - playerwidth - 10,
	y: boardheight/2,
	width: playerwidth,
	height: playerheight,
	velocityy: playervelocityy
}


let ballwidth=10;
let ballheight =10;
let speedMultiplier = 1.05;  // Adjust this value to control the speed increase
let ball ={
	x: boardwidth/2,
	y: boardheight/2,
	width: ballwidth,
	height: ballheight,
	velocityx :1,
	velocityy: 2
}

let player1score = 0;
let player2score =0;

window.onload = function(){
	board = document.getElementById("board");
	board.height=boardheight;
	board.width=boardwidth;
	context = board.getContext("2d");

	//initial player
	context.fillStyle ="skyblue";
	context.fillRect(player1.x, player1.y, player1.width, player1.height);

	requestAnimationFrame(update);
	document.addEventListener("keyup", moveplayer);


}


function update() {
	requestAnimationFrame(update);
	context.clearRect(0,0, boardwidth, boardheight);

	//player1
	context.fillStyle ="skyblue";
	// player1.y += player1.velocityy;
	let nextplayer1y = player1.y + player1.velocityy;
	if(!outofbound(nextplayer1y)){
		player1.y = nextplayer1y;
	}
	context.fillRect(player1.x, player1.y, player1.width, player1.height);

	//player2
	// player2.y += player2.velocityy;
	let nextplayer2y = player2.y + player2.velocityy;
	if(!outofbound(nextplayer2y)){
		player2.y =nextplayer2y;
	}
	context.fillRect(player2.x, player2.y, player2.width, player2.height);


	//ball
	context.fillStyle ="white";
	ball.x += ball.velocityx;
	ball.y += ball.velocityy;
	context.fillRect(ball.x,ball.y,ball.width,ball.height)

	if (ball.y<=0 || ball.y + ball.height >= boardheight){
		ball.velocityy *= -1;
	}




	//bounce back
	if(detectcollution(ball,player1)){
		if (ball.x <= player1.x + player1.width){
			// ball.velocityx *= -1
			ball.velocityx *= -1 * speedMultiplier;  // Increase speed on bounce
            ball.velocityy *= speedMultiplier;  // Ensure vertical speed increases too
		}
	}
	else if(detectcollution(ball,player2)){
		if (ball.x + ball.width>= player2.x ){
			// ball.velocityx *= -1
			ball.velocityx *= -1 * speedMultiplier;  // Increase speed on bounce
            ball.velocityy *= speedMultiplier;  // Ensure vertical speed increases too
		}
	}

	//gameover
	if (ball.x < 0){
		player2score++;
		resetgame(1);
	}
	else if (ball.x+ ballwidth >boardwidth){
		player1score++;
		resetgame(-1);

	}

	//score
	context.font = "45px sans-serif";
	context.fillText(player1score, boardwidth/5, 45);
	context.fillText(player2score, boardwidth*4/5 -45, 45);

}

function outofbound(yposition){
	return(yposition < 0 || yposition+playerheight > boardheight)
}

function moveplayer(e){

	//player1
	if (e.code =="KeyW"){
		player1.velocityy = -3;
	}
	else if (e.code =="KeyS"){
		player1.velocityy = 3;
	}

	//player2
	if (e.code =="ArrowUp"){
		player2.velocityy = -3;
	}
	else if (e.code =="ArrowDown"){
		player2.velocityy = 3;
	}

}

function detectcollution(a,b){
	return a.x<b.x +b.width && a.x + a.width > b.x &&
			a.y < b.y+ b.height && a.y + a.height > b.y;
}


function resetgame(direction){
	ball ={
	x: boardwidth/2,
	y: boardheight/2,
	width: ballwidth,
	height: ballheight,
	velocityx :direction,
	velocityy: 2
	}

}