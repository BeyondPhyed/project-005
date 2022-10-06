//=========================================================================================
// move, reflection, resistance

function move(status = 0) {
    //0보다 크면 반사
    if (status > 0) {
		reflection();  
	}
	
	if (status == 2) {
		resistance();  //마찰
	} else if (status == 3) {
		resistance(1);  //마찰+저항
	}
	
	vel[0] += acc[0]*dt; 
	pos[0] += vel[0]*dt;
	vel[1] += acc[1]*dt; 
	pos[1] += vel[1]*dt;
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