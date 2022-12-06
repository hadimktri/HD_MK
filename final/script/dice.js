let $totals1 = 0;
let $totals2 = 0;
let $poptimeout;
let $i = 1;
//---------------------------------------------------------------------class defined
class Player {
    constructor($name, $score, $totalScore) {
        this.$name = $name;
        this.$score = $score;
        this.$totalScore = $totalScore;
        this.$dices = [];
    }
}
//---------------------------------------------------------------------random number generating
Player.prototype.Numb = function () {
    for (let x = 0; x < 2; x++) {
        let d = Math.floor(Math.random() * 6) + 1;
        this.$dices.push(d);
    } return this.$dices
}
//---------------------------------------------------------------------score possibilities checking
Player.prototype.diceConditions = function (d1, d2) {
    if (d1 === d2 && d1 != 1) {
        return (d1 + d2) * 2;
    } else if (d1 === 1 || d2 === 1) {
        return 0;
    } else {
        return d1 + d2;
    }

}
//---------------------------------------------------------------------events
$(document).on("ready", $poptimeout);
$poptimeout = setTimeout(() => $("#pop-up").css("display", "block"), 1000);
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
    }
});
//---------------------------------------------------------------------main dice role function
function rollTheDice() {
    setTimeout(function () {
        const player1 = new Player();
        let $dice11 = player1.Numb();
        $(".img1-1").attr("src", `../images/dice${$dice11[0]}.png`);
        $(".img1-2").attr("src", `../images/dice${$dice11[1]}.png`);
        let $score1 = player1.diceConditions($dice11[0], $dice11[1])
        player1.score = $score1
        $(".Player1").html(`Score: ${$score1}`);
        $totals1 += $score1;
        $("#totals1").html(`Total: ${$totals1}`);
        const player2 = new Player();
        let $dice22 = player2.Numb();
        $(".img2-1").attr("src", `../images/dice${$dice22[0]}.png`);
        $(".img2-2").attr("src", `../images/dice${$dice22[1]}.png`);
        let $score2 = player2.diceConditions($dice22[0], $dice22[1])
        $(".Player2").html(`Score: ${$score2}`);
        $totals2 += $score2;
        $("#totals2").html(`Total: ${$totals2}`);
        if ($totals1 !== $totals2) {
            if ($totals1 < $totals2) {
                $("#winner").html("Computer WINS!");
            } else {
                $("#winner").html(`${$("#player-name").val().toUpperCase()} WINS!`);
            }
        } else {
            $("#winner").html(`Total scores are the same!`);
        }
    }, 500);
}

