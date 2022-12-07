//---------------------------------------------------------------------class defined
class Player {
    constructor($dice1, $dice2, $score) {
        this.$dice1 = $dice1;
        this.$dice2 = $dice2;
        this.$score = $score
        this.$dices = [];
    }
}
//---------------------------------------------------------------------random number generating
Player.prototype.Numb = function () {
    for (let x = 0; x < 2; x++) {
        let d = Math.floor(Math.random() * 6) + 1;
        this.$dices.push(d);
    }
    this.$dice1 = this.$dices[0]
    this.$dice2 = this.$dices[1]
}
//---------------------------------------------------------------------score possibilities checking
Player.prototype.diceConditions = function (d1, d2) {
    if (d1 === d2 && d1 != 1) {
        this.$score = (d1 + d2) * 2;
    } else if (d1 === 1 || d2 === 1) {
        this.$score = 0;
    } else {
        this.$score = d1 + d2;
    }
}
//---------------------------------------------------------------------main dice role function
let $totalPlayer1 = 0;
let $totalPlayer2 = 0;
function rollTheDice() {
    setTimeout(function () {

        const player1 = new Player();
        player1.Numb();
        $(".img1-1").attr({ src: `../images/dice${player1.$dice1}.png`, alt: `dice${player1.$dice1}` });
        $(".img1-2").attr({ src: `../images/dice${player1.$dice2}.png`, alt: `dice${player1.$dice2}` });
        player1.diceConditions(player1.$dice1, player1.$dice2)
        $(".Player1").html(`Score: ${player1.$score}`);
        $totalPlayer1 += player1.$score;
        $("#totals1").html(`Total: ${$totalPlayer1}`);

        const player2 = new Player();
        player2.Numb();
        $(".img2-1").attr({ src: `../images/dice${player2.$dice1}.png`, alt: `dice${player2.$dice1}` });
        $(".img2-2").attr({ src: `../images/dice${player2.$dice2}.png`, alt: `dice${player2.$dice2}` });
        player2.diceConditions(player2.$dice1, player2.$dice2)
        $(".Player2").html(`Score: ${player2.$score}`);
        $totalPlayer2 += player2.$score;
        $("#totals2").html(`Total: ${$totalPlayer2}`);

        if ($totalPlayer1 !== $totalPlayer2) {
            if ($totalPlayer1 < $totalPlayer2) {
                $("#winner").html("Computer WINS!");
            } else {
                $("#winner").html(`${$("#player-name").val().toUpperCase()} WINS!`);
            }
        } else {
            $("#winner").html(`Total scores are the same!`);
        }
    }, 400);
}
//---------------------------------------------------------------------events
let $poptimeout;
let $i = 1;
$(document).on("ready", $poptimeout);
$poptimeout = setTimeout(() => $("#pop-up").css("display", "block"), 600);
$(document).on("click", () => $("#pop-up").fadeOut());
$(document).on("click", () => clearTimeout($poptimeout));
$("#reset").on("click", () => location.reload(true));
$('.content').hide();

$("#roll").on("click", function () {
    $("#roll").html("Roll The Dice");
    $("#roll").css("backgroundColor", "#3f5199")
    $(".content").fadeOut();
    $(".Player1Name").html($("#player-name").val().toUpperCase())
    $(".content").fadeOut();

    if ($i <= 3) {
        rollTheDice();
        $i++;
    } else if ($i === 4) {
        $("#roll").html("New Game");
        $("#roll").css("backgroundColor", "#953341")
        $('.content').slideToggle();
        $(".img").attr("src", "../images/dice1.png");
        $i = 1;
        $(".sc").html(`Score: 00`);
        $totalPlayer1 = 0;
        $totalPlayer2 = 0;
    }
});


