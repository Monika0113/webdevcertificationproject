$(document).ready(function () {
  var teamData = localStorage.getItem("teamData")
    ? JSON.parse(localStorage.getItem("teamData"))
    : [];
  var playersData = teamData.players;
  console.log(playersData);
  var teamsData = JSON.parse(localStorage.getItem("totalTeamData"));

  function createPlayerCard(
    id,
    playerImageUrl,
    name,
    team,
    price,
    playingStatus,
    role
  ) {
    var mainDivTeam = $("#playersList");

    var playerCardDiv = $("<div>");
    playerCardDiv.attr("class", "cardPlayer");
    playerCardDiv.attr("id", id);

    var playerImageDiv = $("<div>");
    playerImageDiv.attr("class", "playerImageDiv");

    var playerImage = $("<img>");
    playerImage.attr("class", "playerImage");
    playerImage.attr("src", playerImageUrl);

    var playerDetailsDiv = $("<div>");
    playerDetailsDiv.attr("class", "playerDetail");

    var playerNamePara = $("<p>");
    playerNamePara.attr("class", "playerName");
    playerNamePara.html("Name: ");
    var spanName = $("<span>");
    spanName.html(name);

    var playerTeamPara = $("<p>");
    playerTeamPara.attr("class", "playerTeam");
    playerTeamPara.html("Team: ");
    var spanTeam = $("<span>");
    spanTeam.html(team);

    var playerPricePara = $("<p>");
    playerPricePara.attr("class", "playerPrice");
    playerPricePara.html("Price: ");
    var spanPrice = $("<span>");
    spanPrice.html(price);

    var playerPlayingStatusPara = $("<p>");
    playerPlayingStatusPara.attr("class", "playerPlayingStatus");
    playerPlayingStatusPara.html("Playing Status: ");
    var spanPS = $("<span>");
    spanPS.html(playingStatus);

    var playerRolePara = $("<p>");
    playerRolePara.attr("class", "playerRole");
    playerRolePara.html("Role: ");
    var spanRole = $("<span>");
    spanRole.html(role);

    playerNamePara.append(spanName);
    playerTeamPara.append(spanTeam);
    playerPricePara.append(spanPrice);
    playerPlayingStatusPara.append(spanPS);
    playerRolePara.append(spanRole);

    playerImageDiv.append(playerImage);
    playerDetailsDiv.append(
      playerNamePara,
      playerTeamPara,
      playerPricePara,
      playerPlayingStatusPara,
      playerRolePara
    );
    playerCardDiv.append(playerImageDiv, playerDetailsDiv);
    playerCardDiv.click(function () {
      $(location).attr("href", "./player.html");
      localStorage.setItem(
        "currentPlayer",
        JSON.stringify(playersData[this.id])
      );
    });
    mainDivTeam.append(playerCardDiv);
  }

  if (teamData.length != []) {
    $("#teamName").html(teamData.teamName);
    $("#topBatsman span").html(teamData.topBatsman);
    $("#topBowler span").html(teamData.topBowler);
    $("#playerCount span").html(teamData.players.length);
    $("#championshipWonCount span").html(teamData.noOfWins);
    $("#teamImage img").attr("src", teamData.teamLogoUrl);
  }

  if (playersData.length > 0) {
    for (var j = 0; j < playersData.length; j++) {
      createPlayerCard(
        playersData[j].id,
        playersData[j].imgUrl,
        playersData[j].playerName,
        playersData[j].from,
        playersData[j].price,
        playersData[j].isPlaying ? "Playing" : "On-Bench",
        playersData[j].description
      );
    }
  }

  $("#searchIco").click(function () {
    var searchKey = $("#search-box")[0].value;
    for (var j = 0; j < teamsData.length; j++) {
      if (teamsData[j].key == searchKey.toUpperCase()) {
        $("#search-box")[0].value = "";
        location.reload();
        localStorage.setItem("teamData", JSON.stringify(teamsData[j]));
        break;
      } else if (j == teamsData.length - 1) {
        alert("Team Not Found!");
      }
    }
  });
  $("#cp").click(function () {
    var playerId = prompt("Enter player Id?");
    var playerImageUrl = prompt("Enter player image Url?");
    var playerName = prompt("Enter player name?");
    var playerTeam = prompt("Enter team name?");
    var playerPrice = prompt("Enter price?");
    var playerPlayingStatus = prompt("Enter playing status?");
    var playerRole = prompt("Enter players role?");
    var tempPlayerObj = {
      id: playerId,
      playerName: playerName,
      from: playerTeam,
      price: playerPrice,
      isPlaying: true,
      description: playerRole,
      imgUrl: playerImageUrl,
    };
    teamData.players.push(tempPlayerObj);
    var totalData = JSON.parse(localStorage.getItem("totalTeamData"));
    for (var i = 0; i < totalData.length; i++) {
      if (totalData[i].id == teamData.id) {
        totalData[i].players = teamData.players;
        break;
      }
    }
    localStorage.setItem("totalTeamData", JSON.stringify(totalData));
    localStorage.setItem("teamData", JSON.stringify(teamData));
    createPlayerCard(
      playerId,
      playerImageUrl,
      playerName,
      playerTeam,
      playerPrice,
      playerPlayingStatus,
      playerRole
    );
    $("#playerCount span").html(teamData.players.length);
  });
});
