// http://www.omdbapi.com/?i=tt3896198&apikey=9d77be17

async function getMovies() {
  try {
    const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=9d77be17&s=fast");
    
    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    
    const moviesData = await response.json(); // Get the JSON data
    const movieListEl = document.querySelector(".movie-list");

    // Check if moviesData has Search property
    if (moviesData.Search) {
      movieListEl.innerHTML = moviesData.Search
        .map(
          (movie) => movieHTML(movie)
        )
        .join("");
    } else {
      movieListEl.innerHTML = "<p>No movies found.</p>";
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

getMovies();


function filterMovies(event) {
    const selectedOption = event.target.value;
    let sortedMovies;

    // Sorting logic based on the selected option
    if (selectedOption === "YEAR") {
        sortedMovies = movies.sort((a, b) => a.year - b.year); // Sort by year
    } else if (selectedOption === "TITLE") {
        sortedMovies = movies.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title
    }

    // Call a function to render the sorted movies
    renderMovies(sortedMovies);
}

function renderMovies(movies) {
    const movieListEl = document.querySelector(".movies");
    movieListEl.innerHTML = ""; // Clear the existing movies

    movies.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.className = "movies__container";
        movieEl.innerHTML = `
            <h3>${movie.title}</h3>
            <h4>${movie.year}</h4>
        `;
        movieListEl.appendChild(movieEl);
    });
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
            </div>`;}


           
