let $accumulatedTotal1 = 0;
let $accumulatedTotal2 = 0;
let $totals1 = 0;
let $totals2 = 0;
let $poptimeout;
let $i = 1;

class Player {
    constructor($name, $score, $totalScore) {
        this.$name = $name;
        this.$score = $score;
        this.$totalScore = $totalScore;
        this.$dices = [];
    }
}
Player.prototype.Numb = function () {
    for (let x = 0; x < 2; x++) {
        let d = Math.floor(Math.random() * 6) + 1;
        this.$dices.push(d);
    } return this.$dices
}
Player.prototype.diceConditions = function (d1, d2) {
    if (d1 === d2 && d2 != 1) {
        return (d1 + d2) * 2;
    } else if (d1 === 1 || d2 === 1) {
        return 0;
    } else if (d1 !== d2 && (d1 !== 1 || d2 !== 1)) {
        return d1 + d2;
    }
}

$(document).on("ready", $poptimeout);
$poptimeout = setTimeout(() => $("#pop-up").css("display", "block"), 1000);
$(document).on("click", () => $("#pop-up").fadeOut());
$(document).on("click", () => clearTimeout($poptimeout));
$("#reset").on("click", () => location.reload(true));
$('.content').hide();

$("#roll").on("click", function () {
    $("#roll").html("Roll The Dice");
    $(".content").fadeOut();
    $(".Player1Name").html($("#player-name").val().toUpperCase())
    $(".content").fadeOut();
    if ($i <= 3) {
        rollTheDice();
        $i++;
    } else if ($i === 4) {
        $("#roll").html("New Round");
        $('.content').slideToggle();
        $("#winner").addClass("rd");
        $totals2 = 0;
        $totals1 = 0;
        $i = 1;
    }
});

function rollTheDice() {
    setTimeout(function () {
        const player1 = new Player();
        const player2 = new Player();
        let $dice12 = player1.Numb();
        $(".img1-1").attr("src", `../images/dice${$dice12[0]}.png`);
        $(".img1-2").attr("src", `../images/dice${$dice12[1]}.png`);
        let $dice34 = player2.Numb();
        $(".img2-1").attr("src", `../images/dice${$dice34[0]}.png`);
        $(".img2-2").attr("src", `../images/dice${$dice34[1]}.png`);
        let $score1 = player1.diceConditions($dice12[0], $dice12[1])
        $(".Player1").html(`Score: ${$score1}`);
        $totals1 += $score1;
        $accumulatedTotal1 += $totals1
        $("#totals1").html(`Total: ${$totals1}`);
        $("#acTotals1").html(`Accumulated Total: ${$accumulatedTotal1}`);
        let $score2 = player2.diceConditions($dice34[0], $dice34[1])
        $(".Player2").html(`Score: ${$score2}`);
        $totals2 += $score2;
        $accumulatedTotal2 += $totals2
        $("#totals2").html(`Total: ${$totals2}`);
        $("#acTotals2").html(`Accumulated Total: ${$accumulatedTotal2}`);
        if ($totals1 > $totals2) {
            $("#winner").html("Computer WINS!");
        } else {
            $("#winner").html(`${$("#player-name").val().toUpperCase()} WINS!`);
        }
    }, 500);
}


