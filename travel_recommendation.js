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

    // ✅ Search Countries & Cities
    travelData.countries?.forEach(country => {
      if (country.name.toLowerCase().includes(query)) {
        results.push({
          name: country.name,
          description: `Explore the beautiful country of ${country.name}!`,
          imageUrl: country.cities?.[0]?.imageUrl || ""
        });
      }

      country.cities?.forEach(city => {
        if (city.name.toLowerCase().includes(query)) {
          results.push(city);
        }
      });
    });

    // ✅ Search Temples
    travelData.temples?.forEach(temple => {
      if (
        temple.name.toLowerCase().includes(query) ||
        temple.description.toLowerCase().includes(query)
      ) {
        results.push(temple);
      }
    });

    // ✅ Search Beaches
    travelData.beaches?.forEach(beach => {
      if (
        beach.name.toLowerCase().includes(query) ||
        beach.description.toLowerCase().includes(query)
      ) {
        results.push(beach);
      }
    });

    // ✅ Display results
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
