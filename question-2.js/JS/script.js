const apiUrl = "https://api.rawg.io/api/games";
const apiKey = "73c3e99bf71c45239d0f5e3cb1f27086";

const gamesContainer = document.getElementById("games");
const loadingIndicator = document.getElementById("loading");

async function getGames() {
  try {
    loadingIndicator.style.display = "block";
    const response = await fetch(`${apiUrl}?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`);
    const data = await response.json();
    const games = data.results.slice(0, 8); // only show first 8 results
    gamesContainer.innerHTML = "";
    games.forEach(game => {
      const name = game.name;
      const rating = game.rating;
      const numTags = game.tags.length;
      const gameDiv = document.createElement("div");
      gameDiv.innerHTML = `<p><strong>${name}</strong></p><p>Rating: ${rating}</p><p>Number of Tags: ${numTags}</p>`;
      gamesContainer.appendChild(gameDiv);
    });
  } catch (error) {
    console.error(error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

getGames();