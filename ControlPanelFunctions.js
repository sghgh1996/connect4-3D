function tableCreate() {
  body = document.getElementById('controller');
  var tbl = document.createElement('table');
  tbl.setAttribute('border', '0');
  var tbdy = document.createElement('tbody');
  for (var i = 0; i < 6; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 6; j++) {
        var td = document.createElement('td');
        var btn = document.createElement('button');
        btn.className= "btn btn-basic board-btn";
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


tableCreate();