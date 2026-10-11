```javascript
$(document).ready(function () {

    // Backend API URL
    const API_URL = "http://localhost:5000/api/bookings";

    // Display success, error, or warning messages
    function showMessage(message, type) {
        $("#bookingMessage")
            .removeClass(
                "d-none alert-success alert-danger alert-warning alert-info"
            )
            .addClass("alert-" + type)
            .text(message);
    }

    // Hide message when the form is reset
    $("#bookingForm").on("reset", function () {
        $("#bookingMessage")
            .addClass("d-none")
            .text("");
    });

    // Load all saved bookings
    function loadBookings() {
        $("#bookingsMessage").text("Loading bookings...");

        $.ajax({
            url: API_URL,
            method: "GET",
            dataType: "json",

            success: function (bookings) {
                const tbody = $("#bookingsTableBody");
                tbody.empty();

                if (!Array.isArray(bookings) || bookings.length === 0) {
                    $("<tr>")
                        .append(
                            $("<td>")
                                .attr("colspan", 8)
                                .addClass("text-center")
                                .text("No bookings found.")
                        )
                        .appendTo(tbody);

                    $("#bookingsMessage").text("No saved bookings yet.");
                    return;
                }

                bookings.forEach(function (booking) {
                    const travelDate = booking.travelDate
                        ? String(booking.travelDate).substring(0, 10)
                        : "";

                    const values = [
                        booking.bookingId || booking._id || "",
                        booking.passengerName || "",
                        booking.busNumber || "",
                        travelDate,
                        booking.seatNumber || "",
                        booking.destination || "",
                        Number(booking.fare || 0).toFixed(2),
                        booking.bookingStatus || "Confirmed"
                    ];

                    const row = $("<tr>");

                    values.forEach(function (value) {
                        $("<td>")
                            .text(value)
                            .appendTo(row);
                    });

                    tbody.append(row);
                });

                $("#bookingsMessage").text(
                    "Total bookings: " + bookings.length
                );
            },

            error: function (xhr) {
                $("#bookingsTableBody").empty();

                $("<tr>")
                    .append(
                        $("<td>")
                            .attr("colspan", 8)
                            .addClass("text-center text-danger")
                            .text("Unable to load bookings.")
                    )
                    .appendTo("#bookingsTableBody");

                $("#bookingsMessage").text(
                    xhr.status === 0
                        ? "Cannot connect to the backend. Check that the server is running and CORS is configured."
                        : "Unable to load bookings. HTTP status: " + xhr.status
                );

                console.error(
                    "Load bookings error:",
                    xhr.status,
                    xhr.responseText
                );
            }
        });
    }

    // Create a new booking
    $("#bookingForm").on("submit", function (event) {
        event.preventDefault();

        // Read the fare as text before converting it to a number
        const fareText = $("#fare").val().trim();
        const fare = Number(fareText);

        const booking = {
            passengerId: $("#passengerId").val().trim(),
            passengerName: $("#passengerName").val().trim(),
            phone: $("#phone").val().trim(),
            email: $("#email").val().trim(),
            busNumber: $("#busNumber").val().trim(),
            scheduleId: $("#scheduleId").val().trim(),
            travelDate: $("#travelDate").val(),
            seatNumber: $("#seatNumber").val().trim(),
            boardingPoint: $("#boardingPoint").val().trim(),
            destination: $("#destination").val().trim(),
            fare: fare
        };

        // Validate required text fields
        const requiredFields = [
            "passengerId",
            "passengerName",
            "phone",
            "email",
            "busNumber",
            "scheduleId",
            "travelDate",
            "seatNumber",
            "boardingPoint",
            "destination"
        ];

        for (const field of requiredFields) {
            if (!booking[field]) {
                showMessage(
                    "Please complete all required fields.",
                    "warning"
                );
                return;
            }
        }

        // Validate fare
        if (
            fareText === "" ||
            !Number.isFinite(fare) ||
            fare < 0
        ) {
            showMessage(
                "Please enter a valid fare of zero or more.",
                "warning"
            );
            return;
        }

        const submitButton = $("#submitBooking");

        submitButton
            .prop("disabled", true)
            .text("Saving...");

        $.ajax({
            url: API_URL,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(booking),

            success: function (response) {
                showMessage(
                    response.message || "Booking created successfully!",
                    "success"
                );

                $("#bookingForm")[0].reset();
                loadBookings();
            },

            error: function (xhr) {
                let message = "Booking failed. Please try again.";

                if (xhr.responseJSON && xhr.responseJSON.message) {
                    message = xhr.responseJSON.message;
                } else if (xhr.status === 0) {
                    message =
                        "Cannot connect to the backend. Check the server and CORS configuration.";
                } else {
                    message += " HTTP status: " + xhr.status;
                }

                showMessage(message, "danger");

                console.error(
                    "Create booking error:",
                    xhr.status,
                    xhr.responseText
                );
            },

            complete: function () {
                submitButton
                    .prop("disabled", false)
                    .text("Confirm Booking");
            }
        });
    });

    // Refresh the bookings table
    $("#refreshBookings").on("click", function () {
        loadBookings();
    });

    // Load saved bookings when the page opens
    loadBookings();

});
```