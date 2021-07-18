var gameMatrix = [];

// An array of 4 x 4 x 5
for (let i = 0; i < 4; i++) { // on z
  gameMatrix[i] = [];

  for (let j = 0; j < 4; j++) { // on x
    gameMatrix[i][j] = [];

    for (let k = 0; k < 5; k++) { // on y
      gameMatrix[i][j][k] = 0;
    }
  }
}


var p1;
var p2;
var turn_name;
var turn_number = 1; // 1 or 2 


function tableCreate () {
  body = document.getElementById('controller');
  tbl = document.createElement('table');
  tbl.setAttribute('border', '0');
  tbdy = document.createElement('tbody');

  for (let i = 0; i < 4; i++) {
    var tr = document.createElement('tr');

    for (let j = 0; j < 4; j++) {
      td = document.createElement('td');
      btn = document.createElement('button');
      btn.className= "btn btn-basic board-btn";
      btn.id = `${i}-${j}`;

      btn. onclick = function (event) {
        // We check here if there is a piece in the place or not
        for (let k = 0; k < 5; k++) {
          if (!gameMatrix[i][j][k]) {
            gameMatrix[i][j][k] = turn_number
            check_winning(i,j,k)
            break
          }
        }

        // check_winning()
        toggle_turn();
      }

      td.setAttribute("width","30px");
      td.appendChild(btn);
      tr.appendChild(td)
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}

function start () {
  p1 = document.getElementById('player1').value;
  p2 = document.getElementById('player2').value;
  starter = document.getElementsByClassName('starter')[0];
  starter.className= "hide";
  div = document.getElementById('names');
  div.className = "show";

  name1 =  document.getElementById('name1');
  name2 = document.getElementById('name2');
  name1.innerHTML = name1.innerHTML+ " " + p1;
  name2.innerHTML = name2.innerHTML+ " " + p2;
  toggle_turn()
}

function toggle_turn () {
  if (turn_number === 1) {
    turn_name = p1;
    turn_number = 2
  } else {
    turn_name = p2;
    turn_number = 1
  }

  turn_label = document.getElementById('turn');
  turn_label.innerHTML = turn_name + "'s turn";
}

function check_x_dir(x,y,z){
  
  for (i = 0; i < 4; i++){
    if (turn_number != gameMatrix[i][y][z]){
      return false;
    }
  }
  console.log("horizontal match");
  return true;
}

function check_y_dir(x,y,z){
  
  for (j = 0; j < 4; j++){
    if (turn_number != gameMatrix[x][j][z]){
      return false;
    }
  }
  console.log("vertical match");
  return true;
}

function check_z_dir(x,y,z){
  
  for (k = 0; k < 4; k++){
    // console.log("checking: ", x, y, k);
    if (turn_number != gameMatrix[x][y][k]){
      // console.log("---- ooops! bad color");
      return false;
    }
    // console.log("good");
  }
  // console.log("Hirarchichal match");
  return true;
}

function check_diag_xy(x,y,z){
  d1 = true;
  d2 = true;
  //fist diagonal check
  for(i= 0 ; i < 4; i++){
    if( gameMatrix[i][i][z] != turn_number ){
      d1 = false;
      break
    }
  }
////second diagonal check
  j = 3;
  for(i= 0 ; i < 4; i++){
    if( gameMatrix[i][j-i][z] != turn_number ){
      d2 = false;
      break
    }
  }

  ans = d1 || d2
  if (ans == true)
    console.log("diagonal xy matched in h = ", z);

  return d1 || d2;
}

function check_diag_xz(x,y,z){
  d1 = true;
  d2 = true;
  //fist diagonal check
  for(i= 0 ; i < 4; i++){
    if( gameMatrix[i][y][i] != turn_number ){
      d1 = false;
      break
    }
  }
////second diagonal check
  j = 3;
  for(i= 0 ; i < 4; i++){
    if( gameMatrix[i][y][j-i] != turn_number ){
      d2 = false;
      break
    }
  }

  ans = d1 || d2
  if (ans == true)
    console.log("Diagonal xz matched in y = ", y);

  return d1 || d2;
}


function check_diag_yz(x,y,z){
  d1 = true;
  d2 = true;
  //fist diagonal check
  for(i= 0 ; i < 4; i++){
    if( gameMatrix[x][i][i] != turn_number ){
      d1 = false;
      break
    }
  }
////second diagonal check
  j = 3;
  for(i= 0 ; i < 4; i++){
    if( gameMatrix[x][i][j-i] != turn_number ){
      d2 = false;
      break
    }
  }

  ans = d1 || d2
  if (ans == true)
    console.log("Diagonal yz matched in x = ", x);

  return d1 || d2;
}

function check_cube_diag(x,y,z){
  return false;
}

function check_winning (x,y,z) {
  // console.log("||||||||||||||||||||||||||||||||||||");
  c1 = check_x_dir(x, y, z);
  c2 = check_y_dir(x, y, z);
  c3 = check_z_dir(x, y, z);
  c4 = check_diag_xy(x, y, z);
  c5 = check_diag_xz(x, y, z);
  c6 = check_diag_yz(x, y, z);
  c7 = check_cube_diag(x,y,z);
  
  // check_diag_dir();//tasviresh ru safhe kaf
  
  if(c1 || c2 || c3 || c4 || c5 || c6 || c7){
    alert("Game finished");
  }


}

tableCreate()