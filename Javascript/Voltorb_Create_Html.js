export default function build() {
    $(document).ready(function () {
        $('#voltorb_game').html('<div id="grid"></div>');
        $('#grid').html('<table id="numGrid"></table>');
        let blockNumber = 0;
        for (let makeRow = 1; makeRow < 7; makeRow++) {
            $('#numGrid').append('<tr id="row' + makeRow + '"></tr>');
            if (makeRow < 6) {
                for (let makeBlock = 0; makeBlock < 6; makeBlock++) {
                    if (makeBlock < 5) {
                        $('#row' + makeRow).append('<td class="playfield" id="block' + blockNumber + '"></td>');
                        $('#block' + blockNumber).append('<div class="voltorb"></div><div class="one"></div><div class="two"></div><div class="three"></div>');
                        blockNumber++;
                    } else {
                        $('#row' + makeRow).append('<th id="head' + makeRow + '">Coins: 0 <img src="Images/Voltorb.png" /> 0 </th>');
                    }
                }
            } else {
                for (let makeBlock = 0; makeBlock < 5; makeBlock++) {
                    $('#row' + makeRow).append('<th id="head' + (makeRow + makeBlock) + '">Coins: 0 <img src="Images/Voltorb.png" /> 0 </th>');
                }
            }
        }
        $('#voltorb_game').append('<div id="scoreTab"></div>');
        $('#scoreTab').append('<button class="startBtn" id="startbtn">Start</button>');
        $('#scoreTab').append('<div class="coinCounter" id="TotalCoins">Your Coins: 0</div>');
        $('#scoreTab').append('<div class="coinCounter" id="RoundCoins">Earned Coins: 0</div>');
        $('#scoreTab').append('<div class="coinCounter" id="memo">Open Memo</div>');
        $('#scoreTab').append('<div class="coinCounter" id="memopick" style="display: none;"></div>');
        $('#memopick').append(' <div class="memopick_inner"><img src="Images/Voltorb.png" /></div><div class="memopick_inner">1</div><div class="memopick_inner">2</div><div class="memopick_inner">3</div>');
        $('#voltorb_game').append('<div id="win"><img src="Images/Win.png" /></div><div id="lose"><img src="Images/Lose.jpg" /></div>');
    });
}
