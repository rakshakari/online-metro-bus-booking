
const API_URL = "http://localhost:5000/api/search";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const busResults = document.getElementById("busResults");
const message = document.getElementById("message");

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        message.textContent = "Please enter a search term.";
        return;
    }

    message.textContent = "Searching...";
    busResults.replaceChildren();

    try {
        const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(query)}`
        );

        const buses = await response.json();

        if (!response.ok) {
            throw new Error(buses.message || "Search failed.");
        }

        if (buses.length === 0) {
            message.textContent = "No matching buses found.";
            return;
        }

        buses.forEach((bus) => {
            const row = document.createElement("tr");

            [
                bus.busNumber,
                bus.busName,
                bus.busType,
                bus.totalSeats,
                bus.status
            ].forEach((value) => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });

            busResults.appendChild(row);
        });

        message.textContent = `${buses.length} bus(es) found.`;
    } catch (error) {
        console.error(error);
        message.textContent =
            "Unable to search buses. Check that the backend is running.";
    }
});
