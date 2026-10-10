$(document).ready(function () {

    loadRoutes();

    function loadRoutes() {

        $.ajax({
            url: "http://localhost:5000/api/routes",
            method: "GET",
            success: function (routes) {

                $("#routeList").empty();

                if (routes.length === 0) {
                    $("#routeList").html(
                        '<div class="col-12 text-center">' +
                        '<p>No routes available.</p>' +
                        '</div>'
                    );
                    return;
                }

                routes.forEach(function (route) {

                    $("#routeList").append(`
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">

                                    <h5 class="card-title">
                                        Route ${route.routeNumber}
                                    </h5>

                                    <p class="card-text">
                                        <strong>From:</strong> ${route.startLocation}
                                    </p>

                                    <p class="card-text">
                                        <strong>To:</strong> ${route.endLocation}
                                    </p>

                                    <p class="card-text">
                                        <strong>Distance:</strong> ${route.distance} km
                                    </p>

                                    <p class="card-text">
                                        <strong>Status:</strong> ${route.status}
                                    </p>

                                </div>
                            </div>
                        </div>
                    `);
                });
            },

            error: function () {
                $("#routeList").html(
                    '<div class="col-12 text-center">' +
                    '<p>Failed to load routes.</p>' +
                    '</div>'
                );
            }
        });
    }

});