function tableCreate() {
  body = document.getElementById('controller');
  tbl = document.createElement('table');
  tbl.setAttribute('border', '0');
  tbdy = document.createElement('tbody');
  for (var i = 0; i < 6; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 6; j++) {
        td = document.createElement('td');
        btn = document.createElement('button');
        btn.className= "btn btn-basic board-btn";
        btn.id = i+" " +j;
        btn. onclick = function(event) {
        //call sth in webgl;
        alert("you clicked on "+ this.id);
        toggle_turn();
        }
        

        // if(i + j %2 == 0){
        //  age khastam shatranji she
        // }
        td.setAttribute("width","30px");
        td.appendChild(btn);
        tr.appendChild(td)
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}

function start(){
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
  // turn_name = p1;
  // turn_label = document.getElementById('turn');
  // turn_label.innerHTML = turn_name + "'s turn";
}

function toggle_turn(){
  turn_number ++;
  //if I want to choose fist time someone starts by random the place is here
  if (toggle_turn != -1 && turn_number %2 == 0 ){
    turn_name = p1;
  }
  else{
    turn_name = p2;
  }
    turn_label = document.getElementById('turn');
    turn_label.innerHTML = turn_name + "'s turn";
}

var p1;
var p2;
var turn_name="";
var turn_number = -1; 
tableCreate();


