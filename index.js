// http://www.omdbapi.com/?i=tt3896198&apikey=9d77be17

let movies = [];

async function getMovies(filter) {
  try {
    const response = await fetch(
      "http://www.omdbapi.com/?i=tt3896198&apikey=9d77be17&s=fast",
    );

    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const moviesData = await response.json(); // Get the JSON data
    const movieListEl = document.querySelector(".movie-list");

    // Check if moviesData has Search property
    if (moviesData.Search) {
      movieListEl.innerHTML = moviesData.Search.map((movie) =>
        movieHTML(movie),
      ).join("");
    } else {
      movieListEl.innerHTML = "<p>No movies found.</p>";
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

getMovies();

console.log(filter);

function filterMovies(event) {
  if (event.target.value === "YEAR") renderMovies(event.target.value);
}

// Sorting logic based on the selected option
if (selectedOption === "YEAR") {
 sortedMovies = movies.sort((a, b) => a.Year - b.Year); // Sort by year
} else if (selectedOption === "TITLE") {
 sortedMovies = movies.sort((a, b) => a.Title.localeCompare(b.Title)); // Sort by title
}

const movieListE1 = document.querySelector(".movie-list");
movieListE1.innerHTML = movies.map(movie=> movieHTML(movie)).join("");

// Call a function to render the sorted movies
renderMovies(sortedMovies);

function renderMovies(filter) {
  const movieListEl = document.querySelector(".movie-list");
  movieListEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
}

function movieHTML(movie) {
  return `
          <div class="movies__container">
          <div class="movies__list">
          <div class="movies">
            <h3>${movie.Title}</h3>  <!-- using movie.Title -->
            <h4>${movie.Year}</h4>   <!-- using movie.Year -->
            <figure class="movie__img--wrapper">
            <img src="${movie.Poster}" alt="${movie.Title} Poster"> <!-- using movie.Poster -->
            </figure>
          </div>
          </div>
            </div>`;
}
