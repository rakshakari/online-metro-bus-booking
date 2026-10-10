$(document).ready(function () {

    loadSchedules();

    function loadSchedules() {

        $.ajax({
            url: "http://localhost:5000/api/schedules",
            method: "GET",

            success: function (schedules) {

                $("#scheduleList").empty();

                if (schedules.length === 0) {
                    $("#scheduleList").html(
                        '<div class="col-12 text-center">' +
                        '<p>No schedules available.</p>' +
                        '</div>'
                    );
                    return;
                }

                schedules.forEach(function (schedule) {

                    $("#scheduleList").append(`
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">

                                    <h5 class="card-title">
                                        Schedule ${schedule.scheduleId}
                                    </h5>

                                    <p class="card-text">
                                        <strong>Route:</strong> ${schedule.routeNumber}
                                    </p>

                                    <p class="card-text">
                                        <strong>Bus:</strong> ${schedule.busNumber}
                                    </p>

                                    <p class="card-text">
                                        <strong>Departure:</strong> ${schedule.departureTime}
                                    </p>

                                    <p class="card-text">
                                        <strong>Arrival:</strong> ${schedule.arrivalTime}
                                    </p>

                                    <p class="card-text">
                                        <strong>Days:</strong>
                                        ${schedule.operatingDays.join(", ")}
                                    </p>

                                    <p class="card-text">
                                        <strong>Status:</strong> ${schedule.status}
                                    </p>

                                </div>
                            </div>
                        </div>
                    `);
                });
            },

            error: function () {

                $("#scheduleList").html(
                    '<div class="col-12 text-center">' +
                    '<p>Failed to load schedules.</p>' +
                    '</div>'
                );
            }
        });
    }

});