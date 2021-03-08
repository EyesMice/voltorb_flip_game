$(document).ready(function () {
    //setup the variables
    let gamestart = false;
    let memomode = false;
    let coinTotal = 0;
    let coinGain = 0;
    let pickedMemoryNumber;
    let winCount = 0;
    let winCondition = 0;
    let field = [0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0];

    //function to start the game and make clicking on elements possible
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
        $('td').each(function () {
            $(this).css({
                backgroundColor: '#188060',
                "pointer-events": "auto"
            }).html('<div class="voltorb"></div><div class="one"></div><div class="two"></div><div class="three"></div>');
        });
        $('#lose').css({
            display: 'none'
        });
        $('#win').css({
            display: 'none'
        });
    };

    function setupHintSystem() {
        for (let head = 1; head < 11; head++) {
            let coinsAndVoltorbs = {
                coins: 0,
                voltorbs: 0
            };
            if (head >= 6) {
                //Setup hint number for headers at the bottom of field
                let colstart = (head - 6);
                for (let pos = colstart; pos < colstart + 24; pos = pos + 5) {
                    countCoinsAndVoltorbs(coinsAndVoltorbs, pos);
                }
            } else {
                //Setup hint number for headers at the right of field
                let rowstart = (head - 1) * 5;
                for (let pos = rowstart; pos < rowstart + 5; pos++) {
                    countCoinsAndVoltorbs(coinsAndVoltorbs, pos);
                }
            }
            //fill in text of current header
            $('#head' + head).html(
                'Coins:' + coinsAndVoltorbs.coins +
                '<img src="Images/Voltorb.png"/> ' +
                coinsAndVoltorbs.voltorbs
            );
        }
    };

    function countCoinsAndVoltorbs(coinsAndVoltorbs, pos) {
        coinsAndVoltorbs.coins = coinsAndVoltorbs.coins + field[pos];
        if (field[pos] === 0) {
            coinsAndVoltorbs.voltorbs++;
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
                resetMemopickSelectColor();
                memomode = false;
                pickedMemoryNumber = '';
            }
        }
    });

    //choose memo number
    $('.memopick_inner').on('click', function () {
        if (memomode) {
            pickedMemoryNumber = $(this).text();
            resetMemopickSelectColor();
            if (pickedMemoryNumber.length == 0) {
                pickedMemoryNumber = '0';
                $(this).html('<img src="Images/Voltorb_Gold.png"/>');
            }
            $(this).css({
                color: '#f8c019'
            });
        }
    });


    function resetMemopickSelectColor() {
        $('.memopick_inner').each(function () {
            $(this).css({
                color: 'white'
            });
            if ($(this).find('img').length) {
                $(this).html('<img src="Images/Voltorb.png"/>');
            }
        });
    };

    $('.playfield').on('click', function () {
        let thisPlayfield = this;
        if (memomode && gamestart) {
            enterMemoLabel(thisPlayfield);
        } else if (gamestart) {
            revealNumber(thisPlayfield);
        }
    });

    function enterMemoLabel(thisPlayfield) {
        let memoLabelClasses = [".voltorb", ".one", ".two", ".three"];
        let memoryNumbers = ['<img src="Images/Voltorb_Gold.png"/>', '1', '2', '3']
        if ($(thisPlayfield).children(memoLabelClasses[pickedMemoryNumber]).text().indexOf(pickedMemoryNumber) > -1 ||
            $(thisPlayfield).children(memoLabelClasses[pickedMemoryNumber]).find('img').length) {
            $(thisPlayfield).children(memoLabelClasses[pickedMemoryNumber]).html('');
        } else {
            $(thisPlayfield).children(memoLabelClasses[pickedMemoryNumber]).html(memoryNumbers[pickedMemoryNumber]);
        }
    }

    function revealNumber(thisPlayfield) {
        let blockid = parseInt($(thisPlayfield).attr('id').substr(5));
        let revealedNumber = field[blockid];
        if (revealedNumber === 0) {
            gamestart = false;
            coinTotal = 0;
            coinGain = 0;
            $('#lose').css({
                display: 'block'
            });
        } else {
            increaseScore(revealedNumber);
            $(thisPlayfield).css("pointer-events", "none");
            // change background color
            $(thisPlayfield).css({
                backgroundColor: '#bd8c84',
                'line-height': '80px'
            }).text(field[blockid])
            checkWin();
        }
    }

    function increaseScore(multiplier) {
        coinGain = coinGain * multiplier;
        if (multiplier > 1){
            winCount++;
        }
    };

    function checkWin() {
        if (winCount === winCondition) {
            gamestart = false;
            coinTotal = coinTotal + coinGain;
            coinGain = 0;
            //Update Total Coins field
            $('#TotalCoins').text('Your Coins: ' + coinTotal);
            $('#win').css({
                display: 'block'
            });
        }
        //Update Earned Coins field
        $('#RoundCoins').text('Earned Coins: ' + coinGain);
    };
});
