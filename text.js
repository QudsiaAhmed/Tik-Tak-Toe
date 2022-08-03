const win_condition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// while (round === true) {

// }

const Display = document.querySelector('.present-status');

// let round = true;
let Present_player = "X";
// let winningPlayer = "";
let string_array = ["", "", "", "", "", "", "", "", ""];


CurrentPlayerTurn();

function WinningMessage() {

    Display.innerHTML = `Player ${Present_player} has won!`
}

function DrawMessage() {
    Display.innerHTML = `Game draw!`;
}

function CurrentPlayerTurn() {
    console.log('Inside Player Turn', Present_player)
    Display.innerHTML = `It's ${Present_player} turn`
}

function Conditional_Logic() {
    console.log("------------------------------------inside logic function")
    logic_flag = false;

    for (let i = 0; i <= 7; i++) {

        const Inner_condition = win_condition[i];
        console.log("THIS IS I", i);
        console.log(Inner_condition);
        console.log("GAMESTATE", string_array)

        let TA = string_array[Inner_condition[0]];
        console.log('TA', TA);
        let TB = string_array[Inner_condition[1]];
        console.log('TB', TB);
        let TC = string_array[Inner_condition[2]];
        console.log('TC', TC);

        if ((TA === TB) && (TB === TC))  {

            console.log("Inside first if");

            if ( (TA !== '') && (TB !== '') && (TC !== '') ){

                console.log('Inside second if');

                logic_flag = true;

                break;
            }
        }

        else if (TA === '' || TB === '' || TC === '') {
            // round = false;
            continue;
        }

    }
    return logic_flag;
}

// Present player kon sa hai
function PlayerChange() {
    console.log("inside player change");
    Present_player = Present_player === "X" ? "O" : "X";
    CurrentPlayerTurn();
}

// Click honay pr cell index index get horha hai 
function Cell_clicking(clickedCell, clickedCellIndex) {
    string_array[clickedCellIndex] = Present_player;
    clickedCell.innerHTML = Present_player;
}

function Array_check() {

    check_flag = false;

    for (j = 0; j <= 8; j++) {
        var a = string_array[j];

        if (a !== '') {
            continue;
        }

        else if (a === ''){
        check_flag = true;
        }
    }

    return check_flag;
}

// number index get karha hai
function Click(click_event) {
    const clickedCell = click_event.target;
    const clickedCellIndex = (clickedCell.getAttribute('num-index'));

    // over write na ho
    if (string_array[clickedCellIndex] !== "") {
        return;
    }

    Cell_clicking(clickedCell, clickedCellIndex);

    
    check_flag=Array_check();

    if(check_flag===false){
        DrawMessage();
        //no click

        setTimeout (Restart,2000);

    } 
    
    else {
        
        logic_flag = Conditional_Logic();


        if (logic_flag === false) {
            console.log('Inside logic flag condition -> false');
            PlayerChange();
        }
        else if (logic_flag === true) {
            console.log('Inside logic flag condition -> true');
            WinningMessage();
            // no click
            setTimeout (Restart,2000);
            
        }
    }

    

}

function Restart() {
 
    Present_player = "X";
    string_array = ["", "", "", "", "", "", "", "", ""];
    Display.innerHTML = CurrentPlayerTurn();
    document.querySelectorAll('.number-cell').forEach(cell => cell.innerHTML = "");
    CurrentPlayerTurn();

}


document.querySelectorAll('.number-cell').forEach(cell => cell.addEventListener('click', Click));


document.querySelector('.restart').addEventListener('click', Restart);


