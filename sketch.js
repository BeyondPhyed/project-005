//필요한 변수들 설정 및 선언
let rad = 30;  //입자 반지름
let pos = [0,0];  //위치
let vel = [30,-10];  //속도
let acc = [0,0.8];  //가속도
let accZero = [acc[0],acc[1]];  //가속도 초기값 저장
let e = 0.5;  //반발 계수
let mu = 0.05;  //마찰 정도
let gamma = 0.01; //0.01;  //저항 정도

//초기 셋팅 부분
function setup() {
	createCanvas(windowWidth, windowHeight);  //화면 크기
	ellipseMode(RADIUS);  //반지름을 기준으로 타원그리기
	pos[0] = windowWidth/4;  //x의 초기값
  	pos[1] = windowHeight/5;  //y의 초기값	
	background(100);  //배경 색
}

//반복적 작동 부분
function draw() {
	// background(100);  //배경 색	
	//move() 모드 선택 : 0보다 크면 반사(1에서 반사만), 2에서는 마찰, 3에서는 마찰+저항 작용
	move(3);  
}




//=========================================================================================
function move(status = 0) {
	if (status > 0) {
		reflection();  //반사	
	}
	
	if (status == 2) {
		resistance();  //마찰
	} else if (status == 3) {
		resistance(1);  //마찰+저항
	}
	
	vel[0] += acc[0]; 
	pos[0] += vel[0];
	vel[1] += acc[1]; 
	pos[1] += vel[1];
	ellipse(pos[0], pos[1], rad, rad);
}

function reflection() {
	if (pos[1] >= windowHeight-rad) {
		pos[1] = windowHeight-rad;  //위치 보정
		vel[1] *= -e;
	}
	if (pos[1] <= rad) {
		pos[1] = rad;  //위치 보정
		vel[1] *= -e;
	}
	if (pos[0] >= windowWidth-rad) {
		pos[0] = windowWidth-rad;  //위치 보정
		vel[0] *= -e;
	}
	if (pos[0] <= rad) {
		pos[0] = rad;  //위치 보정
		vel[0] *= -e;
	}	
}

function resistance(status2 = 0) {
	//마찰
	if (abs(pos[1] - (windowHeight-rad)) <= 0.5 && abs(vel[0]) > 0.001) {
		acc[0] = -vel[0]/abs(vel[0])*mu + accZero[0];
	}
	
	//저항 + 마찰
	if (status2 == 1) {
		if (abs(vel[0]) > 0.001) {
			acc[0] = -gamma*vel[0] + accZero[0] + (-vel[0]/abs(vel[0])*mu);
		}
		if (abs(vel[1]) > 0.001) {
			acc[1] = -gamma*vel[1] + accZero[1];
		}
	}
}
