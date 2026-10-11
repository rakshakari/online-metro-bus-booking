
const API_URL = "http://localhost:5000/api/buses";

const busForm = document.getElementById("busForm");
const busTableBody = document.getElementById("busTableBody");
const message = document.getElementById("message");
const refreshButton = document.getElementById("refreshBuses");
const busSearch = document.getElementById("busSearch");

function showMessage(text, isError = false) {
    message.textContent = text;
    message.style.color = isError ? "red" : "green";
}

// Load and display buses
async function loadBuses() {
    busTableBody.replaceChildren();

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load buses.");
        }

        const buses = await response.json();
        const searchText = busSearch.value.trim().toLowerCase();

        if (buses.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 6;
            cell.textContent = "No buses found. Add a bus using the form.";

            row.appendChild(cell);
            busTableBody.appendChild(row);
            return;
        }


        const filteredBuses = buses.filter((bus) =>
            (bus.busNumber || "").toLowerCase().includes(searchText) ||
            (bus.busName || "").toLowerCase().includes(searchText) ||
            (bus.busType || "").toLowerCase().includes(searchText)
        );

        filteredBuses.forEach((bus) => {
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

            // Actions column
            const actionsCell = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.type = "button";
            editButton.addEventListener("click", () => editBus(bus));

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.type = "button";
            deleteButton.style.marginLeft = "8px";
            deleteButton.style.backgroundColor = "#dc2626";
            deleteButton.addEventListener("click", () => deleteBus(bus));

            actionsCell.append(editButton, deleteButton);
            row.appendChild(actionsCell);
            busTableBody.appendChild(row);
        });
    } catch (error) {
        showMessage(
            "Unable to load buses. Check that the backend is running.",
            true
        );
    }
}

// Add a new bus
busForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bus = {
        busNumber: document.getElementById("busNumber").value.trim(),
        busName: document.getElementById("busName").value.trim(),
        busType: document.getElementById("busType").value,
        totalSeats: Number(document.getElementById("totalSeats").value)
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bus)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.message || "Failed to add bus.");
        }

        showMessage("Bus added successfully!");
        busForm.reset();
        await loadBuses();
    } catch (error) {
        showMessage(error.message, true);
    }
});

// Edit an existing bus
async function editBus(bus) {
    const busNumber = prompt("Enter bus number:", bus.busNumber);
    if (busNumber === null) return;

    const busName = prompt("Enter bus name:", bus.busName);
    if (busName === null) return;

    const busType = prompt(
        "Enter bus type (Normal, Semi-Luxury, Luxury, AC):",
        bus.busType
    );
    if (busType === null) return;

    const totalSeats = prompt("Enter total seats:", bus.totalSeats);
    if (totalSeats === null) return;

    if (
        !busNumber.trim() ||
        !busName.trim() ||
        !busType.trim() ||
        !Number.isInteger(Number(totalSeats)) ||
        Number(totalSeats) < 1
    ) {
        showMessage("Please enter valid bus details.", true);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${bus._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                busNumber: busNumber.trim(),
                busName: busName.trim(),
                busType: busType.trim(),
                totalSeats: Number(totalSeats)
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.message || "Failed to update bus.");
        }

        showMessage("Bus updated successfully!");
        await loadBuses();
    } catch (error) {
        showMessage(error.message, true);
    }
}

// Delete a bus
async function deleteBus(bus) {
    const confirmed = confirm(
        `Are you sure you want to delete bus ${bus.busNumber}?`
    );

    if (!confirmed) return;

    try {
        const response = await fetch(`${API_URL}/${bus._id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.message || "Failed to delete bus.");
        }

        showMessage("Bus deleted successfully!");
        await loadBuses();
    } catch (error) {
        showMessage(error.message, true);
    }
}
refreshButton.addEventListener("click", loadBuses);

busSearch.addEventListener("input", loadBuses);

// Load buses when the page opens
loadBuses();
