var MAGNUMCHART;
jQuery(document).ready(function ($) {
    MAGNUMCHART = (function (root, undefined) {

        GENERIC.TOASTSHOW("Loading Charts..");
        function ColorCode() {
            var makingColorCode = '0123456789ABCDEF';
            var finalCode = '#';
            for (var counter = 0; counter < 6; counter++) {
                finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 16)];
            }
            return finalCode;
        }

        var showPieChart = function () {
            var url = GENERIC.APIDOMAIN() + "/api/v1/MagnumCustom/ChartAgreementType";
            var arr = [];

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    var arrFull = data;
                    if (arrFull.statusCode == 200) {
                        arr = arrFull.data;
                        var xValues = [];
                        var yValues = [];
                        var barColors = [];
                        for (var i = 0; i < arr.length; i++) {
                            var obj = arr[i];
                            var type = "";
                            var amount = "";
                            for (var key in obj) {
                                if (key == "agreement_Type") {
                                    xValues.push(obj[key]);
                                    barColors.push(ColorCode());
                                }
                                if (key == "loan_Amount") {
                                    yValues.push(obj[key]);
                                }

                            }
                        }
                        new Chart("myChart", {
                            type: "pie",
                            data: {
                                labels: xValues,
                                datasets: [{
                                    backgroundColor: barColors,
                                    data: yValues
                                }]
                            },
                            options: {
                                title: {
                                    display: true,
                                    text: "Agreement Type Breakdown"
                                }
                            }
                        });
                    }
                    else {
                        GENERIC.ERRORSHOW("Error:" + arrFull.errors[0]);
                    }
                })
                .catch(error => {
                    GENERIC.ERRORSHOW("Error: Could not connect to " + GENERIC.APIDOMAIN());
                });




            return false;
        }

        function showScatteredChart() {
            var url = GENERIC.APIDOMAIN() + "/api/v1/MagnumCustom/ChartBarViewSumCountTerminationYear";
            var arr = [];
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    var arrFull = data;
                    if (arrFull.statusCode == 200) {
                        arr = arrFull.data;
                        var xAll = [];
                        var xValues = [];
                        var yValues = [];
                        var rValues = [];
                        var barColors = [];
                        var x;
                        var y;
                        var r;
                        for (var i = 0; i < arr.length; i++) {
                            var obj = arr[i];
                            var type = "";
                            var amount = "";
                            for (var key in obj) {

                                if (key == "termination_Date") {
                                    barColors.push(ColorCode());
                                    x = new Date(obj[key]).getFullYear();
                                    if (x > 2061) {
                                        x = 2061;
                                    }
                                    xValues.push(x);
                                }
                                if (key == "loan_Amount") {
                                    yValues.push(obj[key]);
                                    r = obj[key] / 10000000000;
                                    if (r > 20) {
                                        r = 20;
                                    }
                                }
                                if (key == "loan_Count") {
                                    rValues.push(obj[key]);
                                    y = obj[key];
                                }

                            }
                            xAll.push({ r, x, y })
                        }
                        new Chart("myScatteredChart", {
                            type: "bubble",
                            data: {
                                labels: "Year",
                                datasets: [{
                                    backgroundColor: barColors,
                                    data: xAll
                                }]
                            },
                            options: {
                                title: {
                                    display: true,
                                    text: "Termination Breakdown"
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem, data) {
                                            return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                                        }
                                    }
                                }
                            }
                        });
                    }
                    else {
                        GENERIC.ERRORSHOW("Error:" + arrFull.errors[0]);
                    }
                })
                .catch(error => {
                    GENERIC.ERRORSHOW("Error: Could not connect to " + GENERIC.APIDOMAIN());
                });
                 
            return false;
        }

        function showBarChart() {

            var url = GENERIC.APIDOMAIN() + "/api/v1/MagnumCustom/ChartBarTerminationYear";
            var arr = [];

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    var arrFull = data;
                    if (arrFull.statusCode == 200) {
                        arr = arrFull.data;
                        var xValues = [];
                        var yValues = [];
                        var barColors = [];
                        for (var i = 0; i < arr.length; i++) {
                            var obj = arr[i];
                            var type = "";
                            var amount = "";
                            for (var key in obj) {
                                if (key == "termination_Date") {
                                    xValues.push(new Date(obj[key]).getFullYear());
                                    barColors.push(ColorCode());
                                }
                                if (key == "loan_Amount") {
                                    yValues.push(obj[key]);
                                }

                            }
                        }
                        new Chart("myBarChart", {
                            type: "bar",
                            data: {
                                labels: xValues,
                                datasets: [{
                                    backgroundColor: barColors,
                                    data: yValues
                                }]
                            },
                            options: {
                                legend: { display: false },
                                title: {
                                    display: true,
                                    text: "Termination Date Breakdown"
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem, data) {
                                            return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                                        }
                                    }
                                }
                            }
                        });
                    }
                    else {
                        GENERIC.ERRORSHOW("Error:" + arrFull.errors[0]);
                    }
                })
                .catch(error => {
                    GENERIC.ERRORSHOW("Error: Could not connect to " + GENERIC.APIDOMAIN());
                });

                 

            return false;
        }
        return {
            SHOWPIECHART: showPieChart,
            SHOWBARCHART: showBarChart,
            SHOWSCATTEREDCHART: showScatteredChart
        };
    }(MAGNUMCHART || {}, jQuery));

});



