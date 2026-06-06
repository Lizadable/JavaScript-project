// http://www.omdbapi.com/?i=tt3896198&apikey=9d77be17

let movies = [];
let searchTerm = "";
const spinnerEl = document.querySelector("#movie-spinner");

function setSearchTerm(event) {
  searchTerm = event.target.value;
}

function showSpinner() {
  spinnerEl?.classList.remove("hidden");
}

function hideSpinner() {
  spinnerEl?.classList.add("hidden");
}

async function getMovies() {
  showSpinner();

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=9d77be17&s=${
        searchTerm || "christmas"
      }`,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const moviesData = await response.json();
    movies = moviesData.Search || [];

    const movieListEl = document.querySelector(".movie-list");

    if (!movieListEl) {
      return;
    }

    if (movies.length) {
      movieListEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
    } else {
      movieListEl.innerHTML = "<p>No movies found.</p>";
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  } finally {
    hideSpinner();
  }
}

getMovies();

function filterMovies(event) {
  const filterValue = event.target.value;

  if (!movies || !movies.length) {
    return;
  }

  let sortedMovies = [...movies];
  showSpinner();

  setTimeout(() => {
    if (filterValue === "YEAR") {
      sortedMovies.sort(
        (a, b) =>
          parseFloat(a.Year.slice(0, 4)) - parseFloat(b.Year.slice(0, 4)),
      );
    } else if (filterValue === "TITLE") {
      sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    }

    renderMovies(sortedMovies);
    hideSpinner();
  }, 100);
}

function renderMovies(sortedMovies) {
  const movieListEl = document.querySelector(".movie-list");

  if (!movieListEl) {
    return;
  }

  if (!sortedMovies || !sortedMovies.length) {
    movieListEl.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movieListEl.innerHTML = sortedMovies
    .map((movie) => movieHTML(movie))
    .join("");
}

function movieHTML(movie) {
  return `
          <div class="movies__container">
            <div class="movie__list">
              <div class="movie">
                <h3>${movie.Title}</h3>
                <h4>${movie.Year}</h4>
                <figure class="movie__img--wrapper">
                  <img src="${movie.Poster}" alt="${movie.Title} Poster">
                </figure>
              </div>
            </div>
          </div>`;
}
