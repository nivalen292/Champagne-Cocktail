//Test

var players = getPlayerData();

var $containerDiv = $("<div>").addClass("div-container");
var $options = $("#options-container");
var $playerButton = $("#btnStatisticsPleyer");
var $charts = $("#charts-container");

var btn = document.getElementById("btnStatisticsPleyer");

btn.addEventListener("click", function createOptionsPlayerStatistics() {
    var el = document.getElementById("options-container");
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }

    var conteiner = document.createElement("div");
    conteiner.className = "div-container";
    //appends :
    var uniqNamesObject = {};
    players.forEach(p => {
        uniqNamesObject[p.PlayerFullName] = true;
    });

    var uniqNamesArray = Object.keys(uniqNamesObject).sort();

    var list = document.createElement("ul");


    var $choose = $("<button>")
        .addClass("customButton")
        .addClass("centered")
        .html("Choose a player")
        .css("margin", "10px 35px")
        .on("click", function (e) {
            $list.toggle();
            $label1.toggle();
        });
    var $label1 = $("<h4>");

    var $list;
    var $li;
    for (let i = 0, len = uniqNamesArray.length; i < len; i += 1) {
        var li = document.createElement("li");
        li.innerHTML = uniqNamesArray[i];

        $li = $(li).addClass("player");
        $li.on("mouseover", function (e) {
            var $target = $(e.target);
            $target.addClass("hovered-player");
        });
        $li.on("mouseout", function (e) {
            var $target = $(e.target);
            $target.removeClass("hovered-player");
        });
        $li.on("click", function (e) {
            var $target = $(e.target);
            $label1.html("Selected player: " + $target.html());
            $label1.show();
            $list.toggle();

            //testing new function
            calculatePlayerData($target.html());
        });

        list.appendChild($li.get(0));
    }

    $list = $(list)
        .hide()
        .addClass("player-list");


    conteiner.appendChild($choose.get(0));
    conteiner.appendChild($list.get(0));
    conteiner.appendChild($label1.get(0));
    conteiner.className += " test"; // background for the div
    el.appendChild(conteiner);
});

function calculatePlayerData(playerName) {
    var player = players.find(p => p.PlayerFullName === playerName);

    var threePointsAccuracy = (player.ThreePointFieldGoalsMade / player.ThreePointFieldGoalsAttempted) * 100;
    var twoPointsAccuracy = (player.FieldGoalsMade - player.FreeThrowsMade - player.ThreePointFieldGoalsMade) /
        (player.FieldGoalsAttempted - player.FreeThrowsAttempted - player.ThreePointFieldGoalsAttempted) * 100;
    var freeThrowsAccuracy = (player.FreeThrowsMade / player.FreeThrowsAttempted) * 100;
    var personalFouls = player.PersonalFouls;
    var rebounds = player.TotalRebounds;
    var assists = player.Assists;
    var blocks = player.Blocks;
    var steals = player.Steals;

    var resultArray = [];
    resultArray.push(checkData(freeThrowsAccuracy));
    resultArray.push(checkData(twoPointsAccuracy));
    resultArray.push(checkData(threePointsAccuracy));
    resultArray.push(checkData(personalFouls));
    resultArray.push(checkData(rebounds));
    resultArray.push(checkData(assists));
    resultArray.push(checkData(blocks));
    resultArray.push(checkData(steals));

    function checkData(data) {
        if (Number.isNaN(data)) {
            return "No such statistic";
        }
        return data;
    }

    // send to canvas or write canvas below func
    return resultArray; 
}

//TODO: encapsulate the logic in 1 function
