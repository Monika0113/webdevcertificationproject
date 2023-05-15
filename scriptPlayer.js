$(document).ready(function () {
  var playerData = localStorage.getItem("currentPlayer")
    ? JSON.parse(localStorage.getItem("currentPlayer"))
    : [];
  var teamsData = JSON.parse(localStorage.getItem("totalTeamData"));
  $("#searchIco").click(function () {
    var searchKey = $("#search-box")[0].value;
    for (var j = 0; j < teamsData.length; j++) {
      if (teamsData[j].key == searchKey.toUpperCase()) {
        $("#search-box")[0].value = "";
        $(location).attr("href", "./team.html#playersList");
        localStorage.setItem("teamData", JSON.stringify(teamsData[j]));
        break;
      } else if (j == teamsData.length - 1) {
        alert("Team Not Found!");
      }
    }
  });
  $("#playerName").html(playerData.playerName);
  $("#playerTeam").html(playerData.from);
  $("#playerPrice").html(playerData.price);
  $("#playerPlayingStatus").html(playerData.isPlaying ? "Playing" : "On-Bench");
  $("#playerRole").html(playerData.description);
  $("#playerPic img").attr("src", playerData.imgUrl);
});
