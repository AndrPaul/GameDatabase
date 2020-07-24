const gameNameInput = document.querySelector("#nameInput");
const gameGenreInput = document.querySelector("#genreInput");
const releaseDateInput = document.querySelector("#releaseInput");
const addGameBtn = document.querySelector("#submitBtn");

const gameData = document.querySelector(".gameData");
var dateEntered;
eventsLis();

function eventsLis() {
  addGameBtn.addEventListener("click", addGameUi);
  gameData.addEventListener("click", removeGame);
  document.addEventListener("DOMContentLoaded", loadGames);
  releaseDateInput.addEventListener("change", convertDate);
}
function convertDate() {
  var inputDate = releaseDateInput.value;
  dateEntered = new Date(inputDate);
}

function addGameUi(event) {
  var today = new Date();
  var releaseDate = new Date(releaseDateInput.value);
  var daysLeft = releaseDate.getTime() - today.getTime();
  if (daysLeft > 0) {
    daysLeft = Math.floor(daysLeft / (1000 * 60 * 60 * 24));
  } else {
    daysLeft = "Released";
  }

  let newGame = {
    name: gameNameInput.value,
    genre: gameGenreInput.value,
    releaseDate: releaseDateInput.value,
    daysLeft: daysLeft
  };

  addGame(
    gameNameInput.value,
    gameGenreInput.value,
    releaseDateInput.value,
    daysLeft
  );
  addGameToStorage(newGame);

  event.preventDefault();
}

function addGame(gameName, gameGenre, releaseDate, daysLeft) {
  var ul = createEle("ul");
  var name = createEle("li");
  name.innerHTML = gameName;
  var genre = createEle("li");
  genre.innerHTML = gameGenre;
  var reDate = createEle("li");
  reDate.innerHTML = releaseDate;
  var dLeft = createEle("li");
  dLeft.innerHTML = daysLeft;
  var deleteLi = createEle("li");
  var deleteBtn = createEle("button");
  deleteBtn.className = "delete";
  deleteBtn.innerHTML = "Delete";

  deleteLi.append(deleteBtn);

  ul.append(name);
  ul.append(genre);
  ul.append(reDate);
  ul.append(dLeft);
  ul.append(deleteLi);

  gameData.append(ul);
}

function createEle(tagName) {
  return document.createElement(tagName);
}

function getGameFromStorage() {
  let games;
  if (localStorage.getItem("games") === null) {
    games = [];
  } else {
    games = JSON.parse(localStorage.getItem("games"));
  }
  return games;
}

function addGameToStorage(NewGame) {
  let games = getGameFromStorage();

  games.push(NewGame);
  localStorage.setItem("games", JSON.stringify(games));
}

function removeGame(event) {
  if (event.target.className == "delete") {
    var findParentElement = event.target.parentElement.parentElement;
    findParentElement.remove();
    deleteGameFromStorage(event.target.parentElement.parentElement.children[0].textContent);
    
    
  }
  event.preventDefault();
}

function deleteGameFromStorage(deleteGame, index) {
  let games = getGameFromStorage(); 
  games.forEach(function(game){
      if(game.name === deleteGame){
        games.splice(index,1);
      }
  });
  localStorage.setItem('games',JSON.stringify(games));
}

function loadGames() {
  let games = getGameFromStorage();
  games.forEach(function(game) {
    addGame(game.name, game.genre, game.releaseDate, game.daysLeft);
  });
}
