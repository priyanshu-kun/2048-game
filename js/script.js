document.addEventListener("DOMContentLoaded", () => {
    const GRID_DISPLAY = document.querySelector(".grid")
    const SCORE_DISPLAY = document.querySelector("#score")
    const RESULT_DISPLAY = document.querySelector("#results")
    const WIDTH = 4
    let squares = []
    let numbers = [2,4,8,16,32,64,128,256,512,1024,2048]
    let score = 0

    results.innerHTML = ""

    const checkForWin = () => {
        for (let i = 0; i < squares.length; i++) {
            if (parseInt(squares[i].innerHTML, 10) === 2048) {
                RESULT_DISPLAY.style.marginTop = "10px"
                RESULT_DISPLAY.innerHTML = "You Win 🤗!"
                document.removeEventListener('keyup', control)
            }
        }
    }

    const checkForGameOver = () => {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (!parseInt(squares[i].innerHTML, 10)) {
                zeros++
            }
        }
        if (!zeros) {
            RESULT_DISPLAY.style.marginTop = "10px"
            RESULT_DISPLAY.innerHTML = "You Lose 😌!"
            document.removeEventListener('keyup', control)
        }
    }


   

    // generate a number randomly
    const generateRandomNumber = () => {
        let randomNumber = Math.floor(Math.random() * squares.length)
        // check if a randomly generated square has innerHTML is 0 then set it with number 2
        if (!parseInt(squares[randomNumber].innerHTML, 10)) {
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        }
        else generateRandomNumber()
    }

    const createBoard = () => {
        for (let i = 0; i < WIDTH * WIDTH; i++) {
            let square = document.createElement('div')
            square.innerHTML = 0
            GRID_DISPLAY.appendChild(square)
            squares.push(square)
        }
        generateRandomNumber()
        generateRandomNumber()
    }

    createBoard()



    const colorCodeEveryKey = () => {
        // alert("BOOM")
        for(let i = 0; i < squares.length; i++) {
            squares[i].style.background = ""
            switch (parseInt(squares[i].innerHTML,10)) {
                case 2:
                    squares[i].style.background = "#EEE4DA"
                    break;
                case 4:
                    squares[i].style.background = "#EEE1C9"
                    break;
                case 8:
                    squares[i].style.background = "#F3B27A"
                    break;
                case 16:
                    squares[i].style.background = "#F79665"
                    break;
                case 32:
                    squares[i].style.background = "#F77D5E"
                    break;
                case 64:
                    squares[i].style.background = "#F65F3A"
                    break;
                case 128:
                    squares[i].style.background = "#ECD072"
                    break;
                case 256:
                    squares[i].style.background = "#ecd072"
                    break;
                case 512:
                    squares[i].style.background = "#ff6836"
                    break;
                case 1024:
                    squares[i].style.background = "#ff3c00"
                    break;
                case 2048:
                    squares[i].style.background = "#2fff00"
                    break;
                default:
                    break;
            }
        }
    }


    colorCodeEveryKey()


    // move numbers towards to right
    const moveRight = () => {
        for (let i = 0; i < WIDTH * WIDTH; i++) {
            if (!(i % 4)) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne, 10), parseInt(totalTwo, 10), parseInt(totalThree, 10), parseInt(totalFour, 10)]
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = new Array(missing).fill(0)
                let newRows = zeros.concat(filteredRow)
                squares[i].innerHTML = newRows[0]
                squares[i + 1].innerHTML = newRows[1]
                squares[i + 2].innerHTML = newRows[2]
                squares[i + 3].innerHTML = newRows[3]
            }
        }
    }



    // move numbers towards to the left
    const moveLeft = () => {
        for (let i = 0; i < WIDTH * WIDTH; i++) {
            if (!(i % 4)) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne, 10), parseInt(totalTwo, 10), parseInt(totalThree, 10), parseInt(totalFour, 10)]
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = new Array(missing).fill(0)
                let newRows = filteredRow.concat(zeros)
                squares[i].innerHTML = newRows[0]
                squares[i + 1].innerHTML = newRows[1]
                squares[i + 2].innerHTML = newRows[2]
                squares[i + 3].innerHTML = newRows[3]
            }
        }
    }


    // move numbers towards the down
    const moveDown = () => {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + WIDTH].innerHTML
            let totalThree = squares[i + (WIDTH + 2)].innerHTML
            let totalFour = squares[i + (WIDTH + 3)].innerHTML
            let column = [parseInt(totalOne, 10), parseInt(totalTwo, 10), parseInt(totalThree, 10), parseInt(totalFour, 10)]
            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = new Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + WIDTH].innerHTML = newColumn[1]
            squares[i + (WIDTH + 2)].innerHTML = newColumn[2]
            squares[i + (WIDTH + 3)].innerHTML = newColumn[3]
        }
    }


    // move numbers towards the up
    const moveUp = () => {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + WIDTH].innerHTML
            let totalThree = squares[i + (WIDTH + 2)].innerHTML
            let totalFour = squares[i + (WIDTH + 3)].innerHTML
            let column = [parseInt(totalOne, 10), parseInt(totalTwo, 10), parseInt(totalThree, 10), parseInt(totalFour, 10)]
            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = new Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + WIDTH].innerHTML = newColumn[1]
            squares[i + (WIDTH + 2)].innerHTML = newColumn[2]
            squares[i + (WIDTH + 3)].innerHTML = newColumn[3]
        }
    }


    const combineNumbersRow = () => {
        for (let i = 0; i < WIDTH * WIDTH - 1; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combineTotal = parseInt(squares[i].innerHTML, 10) + parseInt(squares[i + 1].innerHTML, 10)
                squares[i].innerHTML = combineTotal
                squares[i + 1].innerHTML = 0
                score+=combineTotal
                SCORE_DISPLAY.innerHTML = score
            }

        }
        checkForWin()
    }


    const combineNumbersColumn = () => {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + WIDTH].innerHTML) {
                let combineTotal = parseInt(squares[i].innerHTML, 10) + parseInt(squares[i + WIDTH].innerHTML, 10)
                squares[i].innerHTML = combineTotal
                squares[i + WIDTH].innerHTML = 0
                score+=combineTotal
                SCORE_DISPLAY.innerHTML = score
            }
        }
        checkForWin()
    }


    const keyRight = () => {
        moveRight()
        combineNumbersRow()
        moveRight()
        generateRandomNumber()
        colorCodeEveryKey()
    }
    const keyLeft = () => {
        moveLeft()
        combineNumbersRow()
        moveLeft()
        generateRandomNumber()
        colorCodeEveryKey()

    }

    const keyDown = () => {
        moveDown()
        combineNumbersColumn()
        moveDown()
        generateRandomNumber()
        colorCodeEveryKey()

    }

    const keyUp = () => {
        moveUp()
        combineNumbersColumn()
        moveUp()
        generateRandomNumber()
        colorCodeEveryKey()

    }



    // assign keycodes
    const control = (e) => {
        switch (e.keyCode) {
            case 39:
                keyRight()
                break;
            case 37:
                keyLeft()
                break;
            case 38:
                keyUp()
                break;
            case 40:
                keyDown()
                break;
            default:
                break;
        }
    }

    document.addEventListener('keyup', control)


})