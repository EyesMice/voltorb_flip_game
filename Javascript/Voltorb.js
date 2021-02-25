$(document).ready(function () {
    let gamestart = false;
    let memomode = false;
    let coinTotal = 0;
    let coinGain = 0;
    let memory;
    let winCount = 0;
    let winCondition = 0;
    let field = [0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0];

    //function to start the game an make clicking on elements possible
    $('#startbtn').on('click', function () {
        coinGain = 1;
        generateArray();
        changeBackgroundColor();
        setupHintSystem();
        gamestart = true;
    });

    function generateArray() {
        for (let i = 0; i < field.length; i++) {
            field[i] = Math.floor((Math.random() * 4));
            // count al squares with a vallue higher than 1
            if (field[i] > 1) {
                winCondition++;
            }
        }
    };

    function changeBackgroundColor() {
        for (r = 0; r < 5; r++) {
            for (c = 0; c < 10; c++) {
                $('#block' + r + c).css({
                    backgroundColor: '#188060',
                    "pointer-events": "auto"
                }).text('');
            }
        }
    };

    function setupHintSystem() {
        for (let head = 1; head < 11; head++) {
            let coinNum = 0;
            let voltNum = 0;
            if (head >= 6) {
                //Setup hint number for headers at the bottom of field
                let colstart = (head - 6);
                for (let pos = colstart; pos < colstart + 24; pos = pos + 5) {
                    coinNum = coinNum + field[pos];
                    if (field[pos] === 0) {
                        voltNum++;
                    }
                }
            } else {
                //Setup hint number for headers at the right of field
                let rowstart = (head - 1) * 5;
                for (let pos = rowstart; pos < rowstart + 5; pos++) {
                    coinNum = coinNum + field[pos];
                    if (field[pos] === 0) {
                        voltNum++;
                    }
                }
            }
            //fill in text of current header
            $('#head' + head).text('Voltorbs: ' + voltNum + ' Coins: ' + coinNum);
        }
    };

    //extend fuction for toogleText function
    $.fn.extend({
        toggleText: function (a, b) {
            return this.text(this.text() == b ? a : b);
        }
    });

    //open/close memo system
    $('#memo').on('click', function () {
        if (gamestart) {
            //open memo system
            $('#memopick').toggle();
            $(this).toggleText('Open Memo', 'Close Memo'); //the toggleText function wich is being created above
            if ($('#memopick').is(':visible')) {
                memomode = true;
                //close memo system and erase memo number
            } else if ($('#memopick').is(':hidden')) {
                memomode = false;
                memory = '';
            }
        }
    });

    //choose memo number
    $('.memopick_inner').on('click', function () {
        if (memomode)
            memory = $(this).text();
    });


    $('.playfield').on('click', function () {
        //makes notes on card
        if (memomode && gamestart) {
            if ($(this).text().indexOf(memory) > -1) {
                let temp = $(this).text();
                temp = temp.replace(memory, '');
                $(this).text(temp);
            } else {
                $(this).append(memory);
            }
            //reveal number in card
        } else if (gamestart) {
            let name = parseInt($(this).attr('id').substr(5));
            let content = field[name];
            switch (content) {
                case 0:
                    gamestart = false;
                    coinTotal = 0;
                    coinGain = 0;
                    alert("BOOM!");
                    break;
                case 2:
                    increaseScore(2);
                    break;
                case 3:
                    increaseScore(3);
                    break;
            }
            $(this).css("pointer-events", "none");
            // change background color to lighter color
            $(this).css({
                backgroundColor: '#28a068'
            }).text(field[name])
            checkWin();
        }
    });

    function increaseScore(multiplier) {
        coinGain = coinGain * multiplier;
        winCount++;
    };

    function checkWin() {
        if (winCount === winCondition) {
            gamestart = false;
            coinTotal = coinTotal + coinGain;
            coinGain = 0;
            //update total coin field
            $('#TotalCoins').text('Total Coins: ' + coinTotal);
            alert("You win!");
        }
        //update collected coin field
        $('#RoundCoins').text('Coins collected: ' + coinGain);
    };
});
