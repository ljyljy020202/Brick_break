var canvas;
var context;
var x;	//캔버스 중심의 x좌표
var y;	//캔버스 중심의 y좌표

var r = 330; // 발판의 궤도 반지름
var padColor; // 발판 색
var padSpeed = 0.03; //발판의 속도
var angle = 75; // 발판의 각도
var l =30; //발판의 길이
var mid = (angle + l/2) * Math.PI/180;
var direction = 0;
var br = 230; //백돌의 반지름

var ball_speed = 3.2;  // 공의 속도
var randomAngleSet
var ball_angle
var ballColor = 'red';
var ballR = 6; //공의 반지름
var dx
var dy
var ballX;
var ballY;

//오디오
const bgraudio = new Audio();
bgraudio.src ="mp3/backgroundsound.mp3";//브금
const btnclcaudio = new Audio();
btnclcaudio.src ="mp3/btnclicksound.mp3";//버튼클릭소리
const bossdmgaudio = new Audio();
bossdmgaudio.src="mp3/pigdmgsound.mp3";//보스뎀지소리
const brickbrkaudio =new Audio();
brickbrkaudio.src ="mp3/brickbreaksound.mp3";//벽돌깨지는소리
const padbncaudio = new Audio();
padbncaudio.src ="mp3/padbouncesound.mp3";//발판튕길때소리

//벽돌 관련 변수
//고급 레벨 기준 층 4개, 각 층에 벽돌 12개로 구성(30도씩) - ((임의로 해둔거라 바꿔도 됩니다))
//고급 - levelNum:4 brickHeight: 25 margin: 12.5
//중급 - levelNum:3 brickHeight: 33 margin: 16.5
//초급 - levelNum:2 brickHeight: 50 margin: 25
var levelNum;	//층 개수
const rowCount = 12;	//한 층의 벽돌 개수
var brickHeight;	//벽돌 두께
var margin;	//벽돌 사이 간격
const bossR = 80;	//보스 반지름 크기
const brickAngle = 0.5/3*Math.PI;	//30도 - 벽돌 하나가 차지하는 각

var pos;	//한 층이 차지하는 영역 나타내는 변수(벽돌+간격)

var plusAngle=0;	//벽돌 회전을 위한 변수

var bossLife=0; //보스 체력

//이차원 배열로 벽돌 선언
var bricks = [];
/*for (var i = 0; i < levelNum; i++) {
 	 bricks[i] = [];
 	 for (var j = 0; j < rowCount; j++) {
   		 bricks[i][j] = { startAngle: 0, status: 1 };
   		 //멤버로 각 벽돌의 시작 각도, 벽돌 깨짐 여부를 가짐(1이면 안깨진 벽돌, 0이면 깨진 벽돌, 2이면 두 번 깨야하는 벽돌)
   		 if(i==0)	//가장 안쪽 벽돌 상태를 1 증가시켜서 2로 만듦
   		 	bricks[i][j].status++;
  	}	
}*/

//이미지 변수 모음 @@@
var bgImage = new Image();	//레벨별 캔버스 배경 이미지

var character1= new Image();
character1.src="img/character1.png";
var character2= new Image();
character2.src="img/character2.png";
var character3= new Image();
character3.src="img/character3.png";
var character;
var pig1= new Image();
pig1.src="img/pig1.png";
var pig2= new Image();
pig2.src="img/pig2.png";
var pig3= new Image();
pig3.src="img/pig3.png";
var pig4= new Image();
pig4.src="img/pig4.png";
var redpig= new Image();
redpig.src = "img/redpig.png";
var boss = pig1;
var lifeimg = new Image();
var goldlifeimg = new Image();
var woodbrickImg = new Image();
var icebrickImg = new Image();
var icebrickImg2 = new Image();
var stonebrickImg = new Image();
var stonebrickImg2 = new Image();
var woodpadImg = new Image();
var icepadImg = new Image();
var stonepadImg = new Image();


//스토리 다시재생 영상
var replayVideo;


var animationId;
var ballAnimation;
function StartGame(){
	btnclcaudio.load();
	btnclcaudio.play();
    $("#Start-screen").css("display","none");
    $("#Start-game").css("display","flex");
	bgraudio.play();
    bgraudio.loop = true;
}

function Storyplay(){
	btnclcaudio.load();
	btnclcaudio.play();
	$("#Start-screen").css("display","none");
    $("#Story-play").css("display","flex");
    if($('#sound_o').css("display")=="none")
    	replayVideo.muted = true;
    else
    	replayVideo.muted = false;

   replayVideo.play();
}

function Setting(){
	btnclcaudio.load();
	btnclcaudio.play();
    $("#Start-screen").css("display","none");
    $("#Setting-screen").css("display","flex");
}

function Backtomain(){
	btnclcaudio.load();
	btnclcaudio.play();
    $("#Start-game").css("display","none");
    $("#Start-screen").css("display","flex");
	bgraudio.pause();
}
function Backtomain2(){
	btnclcaudio.load();
	btnclcaudio.play();
    $("#Setting-screen").css("display","none");
    $("#Start-screen").css("display","flex");
}
function Backtomain3(){
	btnclcaudio.load();
	btnclcaudio.play();
    $("#Story-play").css("display","none");
    $("#Start-screen").css("display","flex");
    replayVideo.pause();
    replayVideo.currentTime = 0;
}
function Easy(){
	btnclcaudio.load();
	btnclcaudio.play();
	boss = pig1;
	levelNum = 2;
	brickHeight=50;
	margin=25;
	pos = brickHeight+margin;

	bgImage.src = "img/background"+levelNum+".png";
    $("#Start-game").css("display","none");
    $("#levelClear").css("display","none");
    $("#Game-Screen").css("display","block");
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    padColor = 'black';
    setting();
    init();
    ballX = (canvas.width / 2) + r * Math.cos(mid);
    ballY = (canvas.height / 2) + r * Math.sin(mid)-20;
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    draw();
}

function Normal(){
	btnclcaudio.load();
	btnclcaudio.play();
	boss = pig1;
	levelNum = 3;
	brickHeight=33;
	margin=16.5;
	pos = brickHeight+margin;

	bgImage.src = "img/background"+levelNum+".png";
    $("#Start-game").css("display","none");
    $("#levelClear").css("display","none");
    $("#Game-Screen").css("display","block");
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    padColor = 'black';
    setting();
    init();
    ballX = (canvas.width / 2) + r * Math.cos(mid);
    ballY = (canvas.height / 2) + r * Math.sin(mid)-20;
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    draw();
}

function Hard(){
	btnclcaudio.load();
	btnclcaudio.play();
	boss = pig1;
	levelNum = 4;
	brickHeight=25;
	margin=12.5;
	pos = brickHeight+margin;

	bgImage.src = "img/background"+levelNum+".png";
    $("#Start-game").css("display","none");
    $("#levelClear").css("display","none");
    $("#Game-Screen").css("display","block");
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    padColor = 'black';
    setting();
    init();
    ballX = (canvas.width / 2) + r * Math.cos(mid);
    ballY = (canvas.height / 2) + r * Math.sin(mid)-20;
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    draw();
}

function select_bird(){
	btnclcaudio.load();
	btnclcaudio.play();
	$("#Setting-character").show();
    $("#character-name").show();

    $("#Setting-Ball").hide();
	$("#Setting-pad").hide();
    $("#Setting-sound").hide();
}

var test_x=20;
var test_dx=ball_speed;
function setting_ball(){
	btnclcaudio.load();
	btnclcaudio.play();
	cancelAnimationFrame(ballAnimation);
	
    $("#Setting-character").hide();
    $("#character-name").hide();
	
    $("#Setting-Ball").show();
	$("#Setting-pad").hide();
    $("#Setting-sound").hide();

	draw_test();

	$("#speed_plus").on("click", plus_speed);
	$("#speed_minus").on("click", minus_speed);
	$("#size_plus").on("click", plus_size);
	$("#size_minus").on("click", minus_size);
}
function draw_test(){
	var cav = document.getElementById('test_canvas');
	var ctx = cav.getContext('2d');
	ctx.clearRect(0,0,500,150);
	$("#speed_status").text("SPEED : "+ball_speed.toFixed(1));
	$("#size_status").text("SIZE : "+ballR.toFixed(1));

	if(test_x>=480)
		test_dx = ball_speed*-1;
	else if(test_x<=20)
		test_dx = ball_speed;
	test_x += test_dx;

	ctx.beginPath();
	ctx.arc(test_x, 75, ballR, 0, Math.PI*2);
	ctx.fillStyle = "red";
	ctx.fill();

	ballAnimation = requestAnimationFrame(draw_test);
}

function plus_speed() {
	if(ball_speed<5)
		ball_speed +=0.2;
	if(test_dx<0)
		test_dx = -1*ball_speed;
	else
		test_dx=ball_speed;
}
function minus_speed() {
	if(ball_speed>1)
		ball_speed -=0.2;
	if(test_dx<0)
		test_dx = -1*ball_speed;
	else
		test_dx=ball_speed;
}
function plus_size() {
	if(ballR<11.8)
		ballR +=0.2;
}
function minus_size() {
	if(ballR>2)
		ballR -=0.2;
}

function reset_ball(){
	ball_speed=3.2;
	ballR = 6;
	if(test_dx<0)
		test_dx = -1*ball_speed;
	else
		test_dx=ball_speed;
}


function setting_pad(){
	btnclcaudio.load();
	btnclcaudio.play();
    $("#Setting-character").hide();
    $("#character-name").hide();

    $("#Setting-Ball").hide();
	$("#Setting-pad").show();
    $("#Setting-sound").hide();
}
function setting_sound(){
	btnclcaudio.load();
	btnclcaudio.play();
    $("#Setting-character").hide();
    $("#character-name").hide();

    $("#Setting-Ball").hide();
	$("#Setting-pad").hide();
    $("#Setting-sound").show();

}

function red(){
	$('#red').css("-webkit-filter","grayscale(0%)");
	$('#red').css("filter","grayscale(0%)");
	$('#bomb').css("-webkit-filter","grayscale(100%)");
	$('#bomb').css("filter","grayscale(100%)");
	$('#matilda').css("-webkit-filter","grayscale(100%)");
	$('#matilda').css("filter","grayscale(100%)");
	$('#character-name').attr("src","img/red.png");

	character = character1; //@@@
}
function bomb(){
	$('#bomb').css("-webkit-filter","grayscale(0%)");
	$('#bomb').css("filter","grayscale(0%)");
	$('#red').css("-webkit-filter","grayscale(100%)");
	$('#red').css("filter","grayscale(100%)");
	$('#matilda').css("-webkit-filter","grayscale(100%)");
	$('#matilda').css("filter","grayscale(100%)");
	$('#character-name').attr("src","img/bomb.png");

	character = character2; //@@@
}
function matilda(){
	$('#matilda').css("-webkit-filter","grayscale(0%)");
	$('#matilda').css("filter","grayscale(0%)");
	$('#bomb').css("-webkit-filter","grayscale(100%)");
	$('#bomb').css("filter","grayscale(100%)");
	$('#red').css("-webkit-filter","grayscale(100%)");
	$('#red').css("filter","grayscale(100%)");
	$('#character-name').attr("src","img/matilda.png");

	character = character3; //@@@
}

function sound_o (){
	$('#sound_o').hide(); //@@@
	$('#sound_x').show(); //@@@

	bgraudio.volume = 0;
	btnclcaudio.volume =0;
	bossdmgaudio.volume=0;
	brickbrkaudio.volume =0;
	padbncaudio.volume =0;
}
function sound_x (){
	$('#sound_o').show(); //@@@
	$('#sound_x').hide(); //@@@

	bgraudio.volume = 1;
	btnclcaudio.volume =1;
	bossdmgaudio.volume=1;
	brickbrkaudio.volume =1;
	padbncaudio.volume =1;
}
$(document).ready(function() {
/*	canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    padColor = 'black';
	setting();
	init()
    ballX = (canvas.width / 2) + r * Math.cos(mid);
    ballY = (canvas.height / 2) + r * Math.sin(mid)-20;
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    draw();*/

    $("#replay").on("click", replayGame);
    $("#nextLevel").on("click",nextLevel);
    $(".Menu").on("click",function(){
    	btnclcaudio.load();
    	btnclcaudio.play();
    	cancelAnimationFrame(animationId);
    	$("#Start-screen").css("display","flex");
    	$("#Game-Screen").css("display","none");
    });

    //css
    red();
	$("#red").on("click",red); //@@@
	$("#bomb").on("click",bomb); //@@@
	$("#matilda").on("click",matilda); //@@@

	$("#sound_o").on("click",sound_o);
	$("#sound_x").on("click",sound_x);

	//story
	var video = $('#storyvideo');
	var container = $('#Story-container');
  
	container.on('mouseenter', function() {
	  video.prop('controls', true);
	});
  
	container.on('mouseleave', function() {
	  video.prop('controls', false);
	});

	$("#skip-button").click(function() {
	  var video = document.getElementById("storyvideo");
	  video.currentTime = video.duration;
	  $('#Story-container').fadeOut(500, function() {
		$('#skip-button').fadeOut(0)
		$('#Start-screen').fadeIn(500);

	  });
	});
  	video = document.getElementById("storyvideo");
	video.addEventListener('ended', function() {
	  $('#Story-container').fadeOut(500, function() {
		$('#Start-screen').fadeIn(500);
	  });
	});

	replayVideo = document.getElementById("story");
});
function replayGame(){
	boss = pig1;
	btnclcaudio.load();
	btnclcaudio.play();
	init();
	bgraudio.play();
}
function nextLevel(){
	boss = pig1;
	btnclcaudio.load();
	btnclcaudio.play();
	levelNum++;
   	if(levelNum==3){
   		brickHeight = 33;
   		margin = 16.5;
   		pos = brickHeight+margin;
   	}
    if(levelNum==4){
    	brickHeight = 25;
    	margin = 12.5;
    	pos = brickHeight+margin;
    }
    
    bgImage.src = "img/background"+levelNum+".png";
    init();
}

function init(){
	if(levelNum==2){
		for (var i = 0; i < levelNum; i++) {
	 		bricks[i] = [];
	 		for (var j = 0; j < rowCount; j++) {
	   			bricks[i][j] = { startAngle: 0, status: 1 };
			  	//멤버로 각 벽돌의 시작 각도, 벽돌 깨짐 여부를 가짐(1이면 안깨진 벽돌, 0이면 깨진 벽돌, 2이면 두 번 깨야하는 벽돌)
  			}
		}
	}
	else{
		for (var i = 0; i < levelNum; i++) {
	 		bricks[i] = [];
	 		for (var j = 0; j < rowCount; j++) {
	   			bricks[i][j] = { startAngle: 0, status: 1 };
			  	//멤버로 각 벽돌의 시작 각도, 벽돌 깨짐 여부를 가짐(1이면 안깨진 벽돌, 0이면 깨진 벽돌, 2이면 두 번 깨야하는 벽돌)
			  	if(i==0)	//가장 안쪽 벽돌 상태를 1 증가시켜서 2로 만듦
	  				bricks[i][j].status++;
  			}
		}
	}
	randomAngleSet = Math.random() < 0.5 ? [50, 75] : [105, 130]; //공 초기 진행 방향 결정
	ball_angle = (Math.random() * (randomAngleSet[1] - randomAngleSet[0]) + randomAngleSet[0]) * (Math.PI / 180)+Math.PI; //공의 랜덤 진행 각도
	dx = ball_speed*Math.cos(ball_angle)
	dy = ball_speed*Math.sin(ball_angle)
	ballX = (canvas.width / 2) + r * Math.cos(mid);
    ballY = (canvas.height / 2) + r * Math.sin(mid)-20;
    $("#myCanvas").css("filter","blur(0)");
    angle = 75;
    $("#gameOver").hide();
    $("#levelClear").hide();
    $("#gameClear").hide();
    if(levelNum == 2){
    	bossLife=4; //@@@
    }
    if(levelNum ==3){
    	bossLife =6; //@@@
    }
    if(levelNum==4){
    	bossLife = 8;
    }
}

function setting() {
	// 캔버스를 플레이어 화면 전체에 채우는 함수
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	x = canvas.width / 2;
    y = canvas.height / 2;
}

function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(bgImage,0, 0, canvas.width, canvas.height);
	drawBricks();
	drawPad();
	drawBall();
	drawBoss();

    animationId = requestAnimationFrame(draw);
}

function drawPad() {
	woodpadImg.src = "img/pad1.png";
	icepadImg.src = "img/pad2.png";
	stonepadImg.src = "img/pad3.png";
    angle += direction;
    if (angle < 0) {
        angle += 360;
    }
    if (angle >= 360) {
        angle -= 360;
    }

	var length= l * Math.PI / 180; // 발판의 길이 라디안으로 표현
	var start = angle * Math.PI / 180; // 발판의 시작 위치

	// 발판의 궤도 그리기
	for (var a = 0; a <= 360; a += 5) {
	    var radian = a * Math.PI / 180;
	    var px = x + r * Math.cos(radian);
	    var py = y + r * Math.sin(radian);

	    context.beginPath();
	    context.arc(px, py, 2, 0, 2 * Math.PI);
	    context.fillStyle = "black";
	    context.fill();
	}

	// 발판
	if(levelNum==2){
		var radian = angle * Math.PI / 180; // 현재 각도를 라디안으로 변환
		var padX = x + r * Math.cos(radian+ length/2); // 발판의 x 위치 계산
		var padY = y + r * Math.sin(radian+ length/2); // 발판의 y 위치 계산
		var rotation = radian - 2.836*Math.PI/2;
		context.save(); // 현재 캔버스 상태 저장
		context.translate(padX, padY); // 발판의 위치로 이동
		context.rotate(rotation); // 발판의 각도로 회전
		context.drawImage(woodpadImg, -woodpadImg.width / 2, -woodpadImg.height / 2, woodpadImg.width, woodpadImg.height); // 발판 이미지 그리기 (이미지의 중심을 기준으로)
		context.restore(); // 캔버스 상태 복원 (이동 및 회전 취소)
	}
	if(levelNum==3){
		var radian = angle * Math.PI / 180; // 현재 각도를 라디안으로 변환
		var padX = x + r * Math.cos(radian+ length/2); // 발판의 x 위치 계산
		var padY = y + r * Math.sin(radian+ length/2); // 발판의 y 위치 계산
		var rotation = radian - 2.836*Math.PI/2;
		context.save(); // 현재 캔버스 상태 저장
		context.translate(padX, padY); // 발판의 위치로 이동
		context.rotate(rotation); // 발판의 각도로 회전
		context.drawImage(icepadImg, -icepadImg.width / 2, -icepadImg.height / 2, icepadImg.width, icepadImg.height); // 발판 이미지 그리기 (이미지의 중심을 기준으로)
		context.restore(); // 캔버스 상태 복원 (이동 및 회전 취소)
	}
	if(levelNum==4){
		var radian = angle * Math.PI / 180; // 현재 각도를 라디안으로 변환
		var padX = x + r * Math.cos(radian+ length/2); // 발판의 x 위치 계산
		var padY = y + r * Math.sin(radian+ length/2); // 발판의 y 위치 계산
		var rotation = radian - 2.836*Math.PI/2;
		context.save(); // 현재 캔버스 상태 저장
		context.translate(padX, padY); // 발판의 위치로 이동
		context.rotate(rotation); // 발판의 각도로 회전
		context.drawImage(stonepadImg, -stonepadImg.width / 2, -stonepadImg.height / 2, stonepadImg.width, stonepadImg.height); // 발판 이미지 그리기 (이미지의 중심을 기준으로)
		context.restore(); // 캔버스 상태 복원 (이동 및 회전 취소)
	}
}

function onKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        direction = 2;
    } else if (event.key === 'ArrowRight') {
        direction = -2;
    }
}

function onKeyUp(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        direction = 0;
    }
}

function drawBoss(){
	drawBossLife();
	context.drawImage(boss,x-bossR,y-bossR,bossR*2,bossR*2); //@@@
}

function drawBossLife(){
	var lifeX = canvas.width-300;
	var lifeX2 = canvas.width -300;
	var lifeY = 30;
	goldlifeimg.src ="img/life2.png";
	lifeimg.src ="img/life.png";
	for(var i=0; i<bossLife; i++){
		if(i>3){
			context.drawImage(goldlifeimg,lifeX2,lifeY,20,20);
			lifeX2 += 40;
		}
		else{
			context.drawImage(lifeimg,lifeX,lifeY,20,20);
			lifeX += 40;
		}
	}
}

function drawBall() {

	var ballX1 = ballX; //@@@
	var ballY1 = ballY; //@@@

    var dx_ball = ballX - x; // 중심에서 공까지의 x 거리
    var dy_ball = ballY - y; // 중심에서 공까지의 y 거리
    var distance = Math.sqrt(dx_ball * dx_ball + dy_ball * dy_ball); // 중심에서 공까지의 총 거리

    var padAngleRad = angle * Math.PI / 180; 
    var padStart = padAngleRad; // 발판의 시작 각도
    var padEnd = padAngleRad + l*Math.PI/180; // 발판의 끝 각도
    var ballAngle = Math.atan2(dy_ball, dx_ball); // 중심에서 본 공의 각도

    if (ballAngle < 0){
    	ballAngle = 2*Math.PI+ballAngle;
    }
    if(padEnd >=2*Math.PI && padEnd-2*Math.PI>=ballAngle){ //예외상황 처리
    	ballAngle += 2*Math.PI;
    }

    // 공이 벽돌에 닿았을 때
    for (var i = 0; i < levelNum; i++) {
 		for (var j = 0; j < rowCount; j++) {
 			var b = bricks[i][j];
 			var brickStart = b.startAngle;
 			var brickEnd = brickStart + brickAngle;

 			//brickEnd가 360보다 큰 경우 벽돌을 뚫고 지나가는 오류 수정함
 			var brickEnd2 = 0;
 			if(brickEnd >= 2*Math.PI){
 				brickEnd2 = brickEnd - 2*Math.PI;
 			}

 			if(bricks[i][j].status >0){	//깨지지 않은 벽돌에 대해서만 적용

 				if (distance >= bossR+i*pos+margin-ballR && distance <= bossR+(i+1)*pos+ballR && ((ballAngle >= brickStart && ballAngle <= brickEnd)||(ballAngle >= 0 && ballAngle <= brickEnd2))) { 

        			var normalX = dx_ball / distance; // 충돌 위치의 법선 벡터 (x)
        			var normalY = dy_ball / distance; // 충돌 위치의 법선 벡터 (y)

       				var dot = -dx * normalX - dy * normalY; // 벡터의 내적 계산

        			dx += 2.0 * dot * normalX; // 반사 벡터 계산 (x)
        			dy += 2.0 * dot * normalY; // 반사 벡터 계산 (y)

        			b.status--;
					brickbrkaudio.load();
					brickbrkaudio.play();
    			}
        	}
  		}
	}

	// 공이 보스에 닿았을 때
	if(distance <= bossR){
		var normalX = dx_ball / distance; // 충돌 위치의 법선 벡터 (x)
        var normalY = dy_ball / distance; // 충돌 위치의 법선 벡터 (y)

       	var dot = -dx * normalX - dy * normalY; // 벡터의 내적 계산

        dx += 2.0 * dot * normalX; // 반사 벡터 계산 (x)
        dy += 2.0 * dot * normalY; // 반사 벡터 계산 (y)

		//@@@
		if(levelNum==2 && bossLife==3){ 
			boss = pig2;
		}else if(levelNum==2 && bossLife==2){
			boss = pig3;
		}else if(levelNum==2 && bossLife==1){
			boss = pig4;
		}if(levelNum==3 && bossLife==4){ 
			boss = pig2;
		}else if(levelNum==3 && bossLife==2){
			boss = pig3;
		}else if(levelNum==3 && bossLife==1){
			boss = pig4;
		}if(levelNum==4 && bossLife==5){ 
			boss = pig2;
		}else if(levelNum==4 && bossLife==3){
			boss = pig3;
		}else if(levelNum==4 && bossLife==1){
			boss = pig4;
		}

        if(bossLife>0){
        	bossdmgaudio.load();
			bossdmgaudio.play();
			a = boss;
			boss= redpig;
        	bossLife--;
			setTimeout(function(){
				boss=a;
			}, 300)
        }
	}
	if(bossLife==0){
        dx =0;
		dy=0;
		plusAngle=0;
        if(levelNum != 4)
        	toNextLevel();
        if(levelNum ==4)
        	gameClear();
		boss = pig4; //@@@
    }

	// 공이 발판에 닿았을 때 
    if ((distance >= r - 2.5 - ballR && distance <= r + 2.5 + ballR) && ballAngle >= padStart && ballAngle <= padEnd) {
	    padbncaudio.load();
	    padbncaudio.play();
		var contactPosition = (ballAngle - padStart) / (padEnd - padStart); // 발판의 어느 위치에 충돌했는지 계산. 0은 시작, 1은 끝.

	    // 반사 각도 결정
	    var reflectionAngle;
	    if (contactPosition < 0.15) {
	        reflectionAngle = ballAngle + Math.PI / 3; // 60도 반사
	    } else if (contactPosition < 0.3) {
	        reflectionAngle = ballAngle + Math.PI / 4.5; // 40도 반사
	    } else if (contactPosition < 0.5) {
	        reflectionAngle = ballAngle + Math.PI / 15; // 12도 반사
	    } else if (contactPosition < 0.7) {
	        reflectionAngle = ballAngle - Math.PI / 15; // -12도 반사
	    } else if (contactPosition < 0.85) {
	        reflectionAngle = ballAngle - Math.PI / 4.5; // -40도 반사
	    }else {
	        reflectionAngle = ballAngle - Math.PI / 3; // -60도 반사
	    }
	    
	    dx = -ball_speed * Math.cos(reflectionAngle);
	    dy = -ball_speed * Math.sin(reflectionAngle);
	}

	//게임오버 
	if(ballX<=(x-400)||ballX>=(x+400)||ballY <= 0||ballY>=y+400){
		dx =0;
		dy=0;
		plusAngle=0;
		gameOver();
	}

	ballX += dx;
	ballY += dy;

	//새가 바라보는 방향만큼 각도 변환//@@@
	var birdAngle = Math.atan2(ballY-ballY1, ballX-ballX1); 
	context.save();
	context.translate(ballX,ballY);
	context.rotate(birdAngle);
	context.translate(-ballX,-ballY);
	context.drawImage(character,ballX-ballR,ballY-ballR,ballR*2,ballR*2);
	context.restore();
}

function drawBricks(){
	woodbrickImg.src = 'img/brick1.png';
	icebrickImg.src = 'img/brick4.png';
	icebrickImg2.src = 'img/brick5.png';
	stonebrickImg.src = 'img/brick2.png';
	stonebrickImg2.src = 'img/brick3.png';

	if(levelNum==2){
		for (var i = 0; i < levelNum; i++) {
			var rotate=0;	//벽돌의 시작 각도
			if(i%2==0){	//가장 안쪽에서부터 홀수번째 층은 시계방향 짝수번째 층은 반시계방향으로 회전
				rotate += plusAngle;
			}
			else{
				rotate = rotate - plusAngle + 2*Math.PI;
			}
	 		for (var j = 0; j < rowCount; j++) {
	 			bricks[i][j].startAngle = rotate;

	 			if(bricks[i][j].status >0){	//깨지지 않은 벽돌만 그림
	 				var brickX = x + Math.cos(rotate+brickAngle/2) * (brickHeight+bossR+i*pos);
	 				var brickY = y + Math.sin(rotate+brickAngle/2) * (brickHeight+bossR+i*pos);
	 				var rotation = rotate + 105*Math.PI/180;
	 				var scale = (brickHeight+bossR+i*pos)*Math.sin(brickAngle/2)*2/woodbrickImg.width;
	 				context.save();
	 				context.translate(brickX,brickY);
	 				context.rotate(rotation);
	 				context.drawImage(woodbrickImg, -scale*woodbrickImg.width / 2, -scale*woodbrickImg.height / 2,scale*woodbrickImg.width,scale*woodbrickImg.height);
	 				context.restore();
	        	}
	        	rotate += brickAngle;
	        	if(rotate>=2*Math.PI){
	        		rotate -= 2*Math.PI;
	        	}
	  		}
		}
		plusAngle = plusAngle + Math.PI/180;
		if(plusAngle>=2*Math.PI)
			plusAngle -= 2*Math.PI;
	}
	if(levelNum==3){
		for (var i = 0; i < levelNum; i++) {
			var rotate=0;	//벽돌의 시작 각도
			if(i%2==0){	//가장 안쪽에서부터 홀수번째 층은 시계방향 짝수번째 층은 반시계방향으로 회전
				rotate += plusAngle;
			}
			else{
				rotate = rotate - plusAngle + 2*Math.PI;
			}
	 		for (var j = 0; j < rowCount; j++) {
	 			bricks[i][j].startAngle = rotate;

	 			if(bricks[i][j].status >0){	//깨지지 않은 벽돌만 그림
	 				var brickX = x + Math.cos(rotate+brickAngle/2) * (brickHeight+bossR+i*pos);
	 				var brickY = y + Math.sin(rotate+brickAngle/2) * (brickHeight+bossR+i*pos);
	 				var rotation = rotate + 105*Math.PI/180;
	 				var scale = (brickHeight+bossR+i*pos)*Math.sin(brickAngle/2)*2/woodbrickImg.width;
	 				context.save();
	 				context.translate(brickX,brickY);
	 				context.rotate(rotation);
	 				if(bricks[i][j].status == 2){
		 				context.drawImage(icebrickImg, -scale*icebrickImg.width / 2, -scale*icebrickImg.height / 2,scale*icebrickImg.width,scale*icebrickImg.height);
		 			}
		 			else{
		 				context.drawImage(icebrickImg2, -scale*icebrickImg2.width / 2, -scale*icebrickImg2.height / 2,scale*icebrickImg2.width,scale*icebrickImg2.height);
		 			}
		 			context.restore();
	        	}
	        	rotate += brickAngle;
	        	if(rotate>=2*Math.PI){
	        		rotate -= 2*Math.PI;
	        	}
	  		}
		}
		plusAngle = plusAngle + Math.PI/180;
		if(plusAngle>=2*Math.PI)
			plusAngle -= 2*Math.PI;
	}
	if(levelNum==4){
		for (var i = 0; i < levelNum; i++) {
			var rotate=0;	//벽돌의 시작 각도
			if(i%2==0){	//가장 안쪽에서부터 홀수번째 층은 시계방향 짝수번째 층은 반시계방향으로 회전
				rotate += plusAngle;
			}
			else{
				rotate = rotate - plusAngle + 2*Math.PI;
			}
	 		for (var j = 0; j < rowCount; j++) {
	 			bricks[i][j].startAngle = rotate;

	 			if(bricks[i][j].status >0){	//깨지지 않은 벽돌만 그림
	 				var brickX = x + Math.cos(rotate+brickAngle/2) * (brickHeight+bossR+i*pos);
	 				var brickY = y + Math.sin(rotate+brickAngle/2) * (brickHeight+bossR+i*pos);
	 				var rotation = rotate + 105*Math.PI/180;
	 				var scale = (brickHeight+bossR+i*pos)*Math.sin(brickAngle/2)*2/woodbrickImg.width;
	 				context.save();
	 				context.translate(brickX,brickY);
	 				context.rotate(rotation);
	 				if(bricks[i][j].status == 2){
		 				context.drawImage(stonebrickImg, -scale*stonebrickImg.width / 2, -scale*stonebrickImg.height / 2,scale*stonebrickImg.width,scale*stonebrickImg.height);
		 			}
		 			else{
		 				context.drawImage(stonebrickImg2, -scale*stonebrickImg2.width / 2, -scale*stonebrickImg2.height / 2,scale*stonebrickImg2.width,scale*stonebrickImg2.height);
		 			}
		 			context.restore();
	        	}
	        	rotate += brickAngle;
	        	if(rotate>=2*Math.PI){
	        		rotate -= 2*Math.PI;
	        	}
	  		}
		}
		plusAngle = plusAngle + Math.PI/180;
		if(plusAngle>=2*Math.PI)
			plusAngle -= 2*Math.PI;
	}
}

function gameOver(){
	$("#myCanvas").css("filter","blur(3px)");
	$("#gameOver").show();
	bgraudio.pause();
}

function toNextLevel(){
	$("#myCanvas").css("filter","blur(3px)");
	$("#levelClear").show();
}
function gameClear(){
	$("#myCanvas").css("filter","blur(3px)");
	$("#gameClear").show();
}
