const API_KEY = "https://www.omdbapi.com/?apikey=91a23fef"; // Replace with your own OMDb key if needed

async function searchMovies() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsContainer = document.getElementById("movieResults");
  resultsContainer.innerHTML = "";

  if (!query) {
    alert("Please enter a movie name.");
    return;
  }

  try {
    const res = await fetch(`${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.Response === "True") {
      data.Search.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}" alt="${movie.Title}" />
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        `;
        resultsContainer.appendChild(card);
      });
    } else {
      resultsContainer.innerHTML = `<p>No movies found. Try another search.</p>`;
    }
  } catch (error) {
    resultsContainer.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    console.error(error);
  }
}
