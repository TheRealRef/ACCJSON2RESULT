{
  var numToCar = new Map();

  window.onload = function(){
    numToCar.set(0, "Porsche 991 GT3 R");
    numToCar.set(1, "Mercedes-AMG GT3");
    numToCar.set(2, "Ferrari 488 GT3");
    numToCar.set(3, "Audi R8 LMS");
    numToCar.set(4, "Lamborghini Huracan GT3");
    numToCar.set(5, "McLaren 650S GT3");
    numToCar.set(6, "Nissan GT-R Nismo GT3");
    numToCar.set(7, "BMW M6 GT3");  
    numToCar.set(8, "Bentley Continental GT3");
    numToCar.set(9, "Porsche 991 II GT3 Cup");
    numToCar.set(10, "Nissan GT-R Nismo GT3");
    numToCar.set(11, "Bentley Continental GT3 (2015)");
    numToCar.set(12, "AMR V12 Vantage GT3");
    numToCar.set(13, "Reiter Engineering R-EX GT3");
    numToCar.set(14, "Emil Frey Jaguar G3");
    numToCar.set(15, "Lexus RC F GT3");
    numToCar.set(16, "Lamborghini Huracan GT3 Evo");
    numToCar.set(17, "Honda NSX GT3");
    numToCar.set(18, "Lamborghini Huracan SuperTrofeo");
    numToCar.set(19, "Audi R8 LMS Evo");
    numToCar.set(20, "Aston Martin Racing V8 Vantage");
    numToCar.set(21, "Honda NSX GT3 Evo");
    numToCar.set(22, "McLaren 720S GT3");
    numToCar.set(23, "Porsche 991 II GT3 R");
    numToCar.set(24, "Ferrari 488 GT3 Evo");
    numToCar.set(25, "Mercedes-AMG GT3");
    
    numToCar.set(50, "Alpine A110 GT4");
    numToCar.set(51, "Aston Martin Vantage GT4");
    numToCar.set(52, "Audi R8 LMS GT4");
    numToCar.set(53, "BMW M4 GT4");
    numToCar.set(54, "CAR?");
    numToCar.set(55, "Chevrolet Camaro GT4");
    numToCar.set(56, "Ginetta G55 GT4");
    numToCar.set(57, "KTM X-Bow GT4");
    numToCar.set(58, "Maserati MC GT4");
    numToCar.set(59, "McLaren 570S GT4");
    numToCar.set(60, "Mercedes AMG GT4");
    numToCar.set(61, "Porsche 718 Cayman GT4 Clubsport");
  }
  
  document.getElementById('import').onclick = function() {
  clearAllButOne("bod");
	var files = document.getElementById('selectFiles').files;
  console.log(files);
  if (files.length <= 0) {
    return false;
  }
  
  var fr = new FileReader();
  var elems;
  fr.onload = function(e) { 
    var result = JSON.parse(e.target.result);
    elems = result.sessionResult.leaderBoardLines;
    tabeling(elems);
  }
  
  fr.readAsText(files.item(0));

  function tabeling (elems) {
  var laps = 0;
  var refTime = 0;
  var prevTime = 0;
  var prevLaps = 0;
  var count = 0;

  var table = document.getElementById('tab');
  var newRow;
  var newCell;


  elems.forEach(element => {
    var diff, tex;
    count+=1;
    newRow = table.insertRow(-1);
    newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode(count));
    newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode(element.car.raceNumber));
    newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode(element.car.drivers[0].firstName +" "+ element.car.drivers[0].lastName));
    var team = element.car.teamName.length>0? element.car.teamName : "TEAM?";
    newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode(team));
    newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode(numToCar.get(element.car.carModel)));
    if(laps==0) {
      laps=element.timing.lapCount;
    }
    newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode(element.timing.lapCount));
    if(refTime==0) {
      refTime=element.timing.totalTime;
      newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode(new Date(element.timing.totalTime).toISOString().slice(11, -1)));
    }
    else {
      if(element.timing.lapCount == laps) {
        newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode("+"+new Date(element.timing.totalTime - refTime).toISOString().slice(14, -1)));
      } else {
        diff = laps - element.timing.lapCount;
        tex = diff > 1? "LAPS" : "LAP";
        newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode("+"+ diff +" "+ tex));
      }
    }
    if(prevLaps==0) {
      newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode("-"));
    } else {
      if(prevLaps==element.timing.lapCount) {
        newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode("+"+new Date(element.timing.totalTime - prevTime).toISOString().slice(14, -1)));
      } else {
        diff = prevLaps - element.timing.lapCount;
        tex = diff > 1? "LAPS" : "LAP";
        newCell = newRow.insertCell(-1); newCell.appendChild(document.createTextNode("+"+ diff +" "+ tex));
      }
    }
    prevLaps = element.timing.lapCount;
    prevTime = element.timing.totalTime;
  });

}
};

document.getElementById('reset').onclick = function() {
  if(confirm("Empty Table?")) {
    clearAllButOne("bod");
  }
}

function clearAllButOne(tag){
  const parent = document.getElementById(tag);
  while (parent.lastChild && parent.lastChild.id != "dont") {
    parent.lastChild.remove();
  }
}

}