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
            break
          }
        }

        check_winning()

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

function check_winning () {
  // TODO
}

tableCreate()