const solution = [
[" "," "," "," "," "," "," "," "," "," "," "," ","C1"," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," ","O"," "," ","A2"," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," ","M"," "," ","C"," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," ","P"," "," ","C"," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," ","R"," "," ","O"," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," ","O"," "," ","U"," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," ","M"," "," ","N"," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," ","T3"," "," ","O4","R5","G","A","N","I","Z","A","T","I","O","N"," ","H6"," "," "," "," "," "],
[" "," "," "," ","R"," "," "," ","E"," "," "," ","S"," "," ","A"," "," "," "," ","O"," "," "," "," "," "],
[" "," "," "," ","U"," "," "," ","L"," "," "," ","E"," "," ","B"," "," "," "," ","N"," "," "," "," "," "],
[" "," ","L7","I","S","T","E","N","I","N","G"," "," "," "," ","L"," "," ","L8"," ","E"," "," "," "," "," "],
[" "," "," "," ","T"," "," "," ","A"," "," "," "," "," ","L9","E","A","D","E","R","S","H","I","P"," "," "],
[" "," "," "," "," "," "," "," ","B"," "," "," "," "," "," "," "," "," ","A"," ","T"," "," "," "," "," "],
[" "," "," "," "," "," ","I10","N","I","T","I","A","T","I","V","E"," "," ","D"," ","Y"," "," "," "," "," "],
[" "," "," "," "," "," "," "," ","L"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," ","F11","L","E","X","I12","B","I","L","I","T13","Y"," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," ","N"," ","T"," "," ","E"," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," ","T"," ","Y"," "," ","A"," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," ","E"," "," "," "," ","M"," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," ","G"," "," "," "," ","W"," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," ","R"," "," "," "," ","O"," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," ","I"," "," "," "," ","R"," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
["R14","E","S","P","E","C","T"," "," "," "," ","K"," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," ","Y"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]
];

const grid = document.getElementById("grid");
let build = ""
let direction = "down";
for(let r=0; r<24; r++){
  build += "<tr>";
  for(let c=0; c<24; c++){
    let data = solution[r][c];
    let placeholder = `placeholder='${data.length > 1?data.substring(1):''}'`;
    //Create the boxes for the puzzle
    build += `<td><input id="${r}_${c}" class="cell ${( data == ' ')?'empty':''}" ${data == ' '?'disabled':placeholder} maxlength="1"></td>`
    //Create and plugs the answer in for testing purposes
    //build += `<td><input id="${r}_${c}" class="cell ${( data === ' ')?'empty':''}" ${data != ' '?'value="' + data.substring(0,1) + '"':'disabled'} ${placeholder} maxlength="1"></td>`

  }
  build += "</tr>";
}
grid.innerHTML = build;
let directionPointer = document.getElementById("directionPointer");
directionPointer.addEventListener("click",function(){
    if(this.innerHTML == "▶"){
        this.innerHTML = "▼";
        direction = "down";
    }else{
        this.innerHTML = "▶"
        direction = "right";
    }
})
document.querySelectorAll(".clues p").forEach(clue => {
    clue.addEventListener("click",function(){
        let cell = document.getElementById(this.dataset.cell);
        direction = this.dataset.direction;
        directionPointer.innerHTML = (direction == "right" ? "▶":"▼")
        cell.focus();
        cell.style.backgroundColor = "yellow";
    })
});

document.querySelectorAll(".cell").forEach(cell => {
    //Get the cell id in order to place focus with clues
    // cell.addEventListener("click",function(){
    //     console.log(this.id);
    // })
    cell.addEventListener("keydown", function (e) {
        this.style.backgroundColor = "white";
        let [r, c] = this.id.split("_").map(Number);
        e.preventDefault();
        if (e.key == "Backspace") {
            this.value = "";

            let prevCol = c;
            let prevRow = r;

            if(direction == "right"){
                prevCol = c - 1;
            }else{
                prevRow = r - 1;  
            }
            let prevCell = document.getElementById(`${prevRow}_${prevCol}`);

            if (prevCell && !prevCell.disabled) {
                prevCell.focus();
                return;
            }
        }else{
            let letter = e.key.toUpperCase(); 
            if (!("A"<=letter && letter <="Z")) return;

            this.value = letter;
            
            let nextCol = c;
            let nextRow = r;
            if(direction == "right"){
                nextCol = c + 1;
            }else{
                nextRow = r + 1;  
            }
            let nextCell = document.getElementById(`${nextRow}_${nextCol}`);
            if (nextCell && !nextCell.disabled) {
                nextCell.focus();
                return;
            }
        }
    });

});

function checkPuzzle(){
    let correct = true;
    for(let r=0; r<24; r++){
        for(let c=0; c<24; c++){
            let data = solution[r][c].substring(0,1);
            let cell = document.getElementById(`${r}_${c}`);
          
            if(data != " " && data != cell.value.toUpperCase()){
                cell.value = "";
                
                correct = false;
            }else{
                cell.style.backgroundColor = "green"
                cell.style.color = "white";
            }
        }
    }
    console.log(correct);
}