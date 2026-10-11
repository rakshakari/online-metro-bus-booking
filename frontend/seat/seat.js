$(document).ready(function () {

    loadSeats();

    function loadSeats() {

        $.ajax({
            url: "http://localhost:5000/api/seats",
            method: "GET",

            success: function (seats) {

                $("#seatList").empty();

                if (seats.length === 0) {
                    $("#seatList").html(
                        '<div class="col-12 text-center">' +
                        '<p>No seats available.</p>' +
                        '</div>'
                    );
                    return;
                }

                seats.forEach(function (seat) {

                    $("#seatList").append(`
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">

                                    <h5 class="card-title">
                                        Seat ${seat.seatNumber}
                                    </h5>

                                    <p class="card-text">
                                        <strong>Bus:</strong> ${seat.busNumber}
                                    </p>

                                    <p class="card-text">
                                        <strong>Type:</strong> ${seat.seatType}
                                    </p>

                                    <p class="card-text">
                                        <strong>Status:</strong> ${seat.status}
                                    </p>

                                </div>
                            </div>
                        </div>
                    `);
                });
            },

            error: function () {

                $("#seatList").html(
                    '<div class="col-12 text-center">' +
                    '<p>Failed to load seats.</p>' +
                    '</div>'
                );
            }
        });
    }

});