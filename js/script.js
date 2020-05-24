// Get time series data

var responseData;
fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json())
    .then(
        // Get statistical data specific to Uganda
        responseData => {
            //responseData["Uganda"].forEach(({ date, confirmed, recovered, deaths }) => [date, confirmed, recovered, deaths, (confirmed - recovered - deaths)]);
            let noOfDays = responseData['Uganda'].length;
            let oneWeekData = responseData['Uganda'].slice(noOfDays - 7, noOfDays)

            let chartData = [
                [oneWeekData[0].date, oneWeekData[1].date, oneWeekData[2].date, oneWeekData[3].date, oneWeekData[4].date, oneWeekData[5].date, oneWeekData[6].date],
                [oneWeekData[0].confirmed, oneWeekData[1].confirmed, oneWeekData[2].confirmed, oneWeekData[3].confirmed, oneWeekData[4].confirmed, oneWeekData[5].confirmed, oneWeekData[6].confirmed],
                [oneWeekData[0].deaths, oneWeekData[1].deaths, oneWeekData[2].deaths, oneWeekData[3].deaths, oneWeekData[4].deaths, oneWeekData[5].deaths, oneWeekData[6].deaths],
                [oneWeekData[0].recovered, oneWeekData[1].recovered, oneWeekData[2].recovered, oneWeekData[3].recovered, oneWeekData[4].recovered, oneWeekData[5].recovered, oneWeekData[6].recovered]
            ];

            updateStatistics(chartData); // Update statistical data
            // console.log(noOfDays, oneWeek)

            console.log(chartData[0][0]);

            // Chart rendering
            var data = {
                labels: [ chartData[0][0], chartData[0][1], chartData[0][2], chartData[0][3], chartData[0][4], chartData[0][5], chartData[0][6]],
                series: [
                    {
                        data: [chartData[1][0], chartData[1][1], chartData[1][2], chartData[1][3], chartData[1][4], chartData[1][5], chartData[1][6]]
                    }
                ]
            };

            var options = {
                width: '640px',
                height: '320px',
                showArea: true,
                axisY: {
                    onlyInteger: true
                },
                axisX: {
                    onlyInteger: true,
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                }
            };

            var responsiveOptions = [];

            new Chartist.Line('#chart', data, options, responsiveOptions);
        },

    ).catch(
        responseData = 'Network error'
    );



// Function to update in the DOM
function updateStatistics(weeklyData) {
    // console.log(`Statistical update ${weeklyData}`);

    console.log(weeklyData);

    // Mapout DOM elements to manipulate
    let activeCases = document.querySelector('#active-cases');
    let theRecovered = document.querySelector('#recovered');
    let theDead = document.querySelector('#dead');

    // Update DOM elements with new statistical data
    activeCases.textContent = weeklyData[1][6];
    theRecovered.textContent = weeklyData[3][6];
    theDead.textContent = weeklyData[2][6];


}

