$(document).ready(function () {

    loadPassengers();

    function loadPassengers() {

        $.ajax({
            url: "http://localhost:5000/api/passengers",
            method: "GET",

            success: function (passengers) {

                $("#passengerList").empty();

                if (passengers.length === 0) {
                    $("#passengerList").html(
                        '<div class="col-12 text-center">' +
                        '<p>No passengers available.</p>' +
                        '</div>'
                    );
                    return;
                }

                passengers.forEach(function (passenger) {

                    $("#passengerList").append(`
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">

                                    <h5 class="card-title">
                                        Passenger ${passenger.passengerId}
                                    </h5>

                                    <p class="card-text">
                                        <strong>Name:</strong> ${passenger.fullName}
                                    </p>

                                    <p class="card-text">
                                        <strong>Email:</strong> ${passenger.email}
                                    </p>

                                    <p class="card-text">
                                        <strong>Phone:</strong> ${passenger.phone}
                                    </p>

                                    <p class="card-text">
                                        <strong>Age:</strong> ${passenger.age}
                                    </p>

                                    <p class="card-text">
                                        <strong>Gender:</strong> ${passenger.gender}
                                    </p>

                                    <p class="card-text">
                                        <strong>Status:</strong> ${passenger.status}
                                    </p>

                                </div>
                            </div>
                        </div>
                    `);
                });
            },

            error: function () {

                $("#passengerList").html(
                    '<div class="col-12 text-center">' +
                    '<p>Failed to load passengers.</p>' +
                    '</div>'
                );
            }
        });
    }

});