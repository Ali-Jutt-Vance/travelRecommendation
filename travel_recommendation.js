document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");

  let travelData = null;

  // Load data
  fetch("travel_recommendation.json")
    .then(response => response.json())
    .then(data => {
      travelData = data;
      console.log("✅ Data loaded successfully");
    })
    .catch(error => console.error("❌ Error loading data:", error));

  // Search handler
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsDiv.innerHTML = "";

    if (!travelData) {
      resultsDiv.innerHTML = "<p>Loading data... please wait.</p>";
      return;
    }

    if (!query) {
      resultsDiv.innerHTML = "<p>Please enter a destination or keyword.</p>";
      return;
    }

    let results = [];

    // Only accept 'country', 'temple', 'beach'
    if (query === "country") {
      travelData.countries?.forEach(country => {
        // Limit to first 2 cities per country
        country.cities?.slice(0, 2).forEach(city => {
          results.push(city);
        });
      });
    } else if (query === "temple") {
      results = travelData.temples?.slice(0, 2) || [];
    } else if (query === "beach") {
      results = travelData.beaches?.slice(0, 2) || [];
    } else {
      resultsDiv.innerHTML =
        "<p>Invalid keyword! Use 'country', 'temple', or 'beach'.</p>";
      return;
    }

    // Display results
    if (results.length === 0) {
      resultsDiv.innerHTML =
        "<p>No destinations found. Try another keyword!</p>";
    } else {
      resultsDiv.innerHTML = results
        .map(
          item => `
          <div class="result-card">
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-content">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            </div>
          </div>
        `
        )
        .join("");
    }

    resultsDiv.classList.add("show-results");
  });

  // Clear handler
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    resultsDiv.innerHTML = "";
    resultsDiv.classList.remove("show-results");
  });
});
