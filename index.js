// http://www.omdbapi.com/?i=tt3896198&apikey=9d77be17

let movies = [];
let searchTerm = "";


function setSearchTerm(event) {
  searchTerm = event.target.value;
}

async function getMovies() {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=9d77be17&s=${
        searchTerm || "christmas"
      }`,
    );

    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const moviesData = await response.json(); // Get the JSON data
    movies = moviesData.Search;

    console.log(moviesData);
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

function filterMovies(event) {
  const filterValue = event.target.value;
  if (filterValue === "YEAR") {
    sortedMovies = movies.sort(
      (a, b) => parseFloat(a.Year.slice(0, 4)) - parseFloat(b.Year.slice(0, 4)),
    ); // Sort by year
  } else if (filterValue === "TITLE") {
    sortedMovies = movies.sort((a, b) => a.Title.localeCompare(b.Title)); // Sort by title
  }

  // Call a function to render the sorted movies
  renderMovies(sortedMovies);
}

function renderMovies(sortedMovies) {
  const movieListEl = document.querySelector(".movie-list");
  movieListEl.innerHTML = sortedMovies
    .map((movie) => movieHTML(movie))
    .join("");
}

function movieHTML(movie) {
  return `
          <div class="movie__container">
          <div class="movie__list">
          <div class="movie">
            <h3>${movie.Title}</h3>  <!-- using movie.Title -->
            <h4>${movie.Year}</h4>   <!-- using movie.Year -->
            <figure class="movie__img--wrapper">
            <img src="${movie.Poster}" alt="${movie.Title} Poster"> <!-- using movie.Poster -->
            </figure>
          </div>
          </div>
            </div>`;
}
