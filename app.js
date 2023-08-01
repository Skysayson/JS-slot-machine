//1. Deposit Money
//2. Determine number of lines to bet on
//3. Collect bet amount
//4. Spin the slot machine
//5. Check if user won
//6. If user won, give winning else keep bets
//7. Play again? or no Money

//EVERYTHING IN JS IS A STRING BY DEFAULT

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {  //Deposit Money

    while(true) {

        const depositAmount = prompt("Enter deposit amount: ");
        const numberDepo = parseFloat(depositAmount);

        if(isNaN(numberDepo) || numberDepo <= 0) { // isNaN: is Not a Number
            console.log("Invalid deposit amount");
        } else {
            return numberDepo;
        }
    }

};

const getNumberOfLines = () => { // Determine lines to bet on

    while(true) {

        const lines = prompt("Enter # of lines: "); //prompt is to accept user input
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) { // isNaN: is Not a Number
            console.log("Invalid number");
        } else {
            return numberOfLines;
        }
    }
}

const betAmount = (balance, lines) => { //Amount they can bet based on their deposit amount


    while(true) {
        const bet = prompt("Enter your total bet per line: ");
        const bettedAmt = parseFloat(bet);

        if(isNaN(bettedAmt) || bettedAmt <= 0 || bettedAmt > balance / lines) {
            console.log("Your deposit is not enough");
        } else {
            console.log("Bet placed successfully");
            return bettedAmt;
        }

    }

}

const spin = () => {
    const symbols = []; //const array values can be changed
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)) { //LOOPS through all of the entries of the object SYMBOLS_COUNT
        for(let x = 0; x < count; x++) {
            symbols.push(symbol); // ADDs the symbols of the object entries into the symbols array
        }
    }

    const reels = [];
    for(let x = 0; x < COLS; x++) {
        reels.push([]); //For every colum, we push an array in the main reels array
            const reelSymbols = [...symbols]; // copies symbols into new array
        for(let y = 0; y < ROWS; y++) {                                         //Math.Floor rounds down to whole number cause if we go up we might go over the length
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);//Math.random generates a random number
            const selectedSymbol = reelSymbols[randomIndex];
            reels[x].push(selectedSymbol); // Pushing into reel the selected symbol
            reelSymbols.splice(randomIndex, 1); //Removes 1 element
        }
    }

    return reels;

};

    const transpose = (reels) => {
        const rows = [];

        for(let x = 0; x < ROWS; x++) {
            rows.push([]);
            for(let y = 0; y < COLS; y++) {
                rows[x].push(reels[y][x]);
            }
        } 
        return rows
    }

    const printRows = (rows) => {
        for(const row of rows) {
            let rowString = "";
            for(const [x, symbol] of rows.entries()) {
                rowString += symbol
                if(x != rows.length-1) {
                    rowString += " | "
                }
            }
            console.log(rowString)
        }
    }

    const getWinnings = (rows, putDown, getLines) => {
        let winnings = 0;

        for(let row = 0; row < getLines; row++) {
            const symbols = rows[row];
            let allSame = true;
            
            for(const symbol of symbols) {
                if(symbol != symbols[0]) {
                    allSame = false;
                    break;
            }
        }

        if(allSame) {
            winnings += putDown * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
}

    const game = () => {
        let depoamt = deposit();

        while(true) {
            console.log("You have a balance of $" + depoamt);
            const getLines = getNumberOfLines();
            const putDown = betAmount(depoamt, getLines);
            depoamt -= putDown * getLines;
            const reels = spin();
            const rows = transpose(reels);
            printRows(rows);
            const winnings = getWinnings(rows, putDown, getLines);
            depoamt += winnings
            console.log("You won, $" + winnings.toString());

            if(depoamt <= 0) {
                console.log("You ran out of money");
                break;
            }

            const playAgain = prompt("Do you want to play again? (y/n): ");
            if(playAgain != "y") break;
        }
    };

    game();