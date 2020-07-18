const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  // console.log(data);
  // for (const caseType in data) {
  //   console.log(`${caseType}`);
  // }
  // console.log(data.cases);
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data.cases[date] - lastDataPoint,
      };
      // console.log(data[casesType]);

      chartData.push(newDataPoint);
    }
    lastDataPoint = data.cases[date];
  }
  // if ((caseType = "cases")) {
  //   for (let date in data.cases) {
  //     if (lastDataPoint) {
  //       let newDataPoint = {
  //         x: date,
  //         y: data[caseType][date] - lastDataPoint,
  //       };
  //       console.log(data[caseType][date]);

  //       chartData.push(newDataPoint);
  //     }
  //     lastDataPoint = data.cases[date];
  //   }
  // } else if ((caseType = "recovered")) {
  //   for (let date in data.recovered) {
  //     if (lastDataPoint) {
  //       let newDataPoint = {
  //         x: date,
  //         y: data.recovered[date] - lastDataPoint,
  //       };
  //       chartData.push(newDataPoint);
  //     }
  //     lastDataPoint = data.recovered[date];
  //   }
  // } else if ((caseType = "deaths")) {
  //   for (let date in data.deaths) {
  //     if (lastDataPoint) {
  //       let newDataPoint = {
  //         x: date,
  //         y: data.deaths[date] - lastDataPoint,
  //       };
  //       chartData.push(newDataPoint);
  //     }
  //     lastDataPoint = data.deaths[date];
  //   }
  // }

  // console.log(recoveredType);
  return chartData;
};
const buildChart = (chartData) => {
  var timeFormat = "MM/DD/YY";
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart
    type: "line",

    // The data for dataset
    data: {
      datasets: [
        {
          label: "Total Cases",
          backgroundColor: "rgba(204, 16, 52, 0.5)",
          borderColor: "#CC1034",
          data: chartData,
        },
      ],
    },

    // Configuration options go here
    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              format: timeFormat,
              tooltipFormat: "ll",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return numeral(value).format("0a").toUpperCase();
              },
            },
          },
        ],
      },
    },
  });
};

const buildPieChart = (data) => {
  var ctx = document.getElementById("myPieChart").getContext("2d");
  var myPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [
        {
          data: [data.active, data.recovered, data.deaths],
          backgroundColor: ["#9d80fe", "#7dd71d", "#fb4443"],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Active", "Recovered", "Deaths"],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};
