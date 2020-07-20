let chartData = [];
let chartRecoveredData = [];
let chartDeathData = [];

const buildChartData = (data) => {
  let lastDataPoint;
  let lastDataPointRecovered;
  let lastDataPointDeaths;

  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data.cases[date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data.cases[date];
  }

  for (let date in data.recovered) {
    if (lastDataPointRecovered) {
      let newDataPoint = {
        x: date,
        y: data.recovered[date] - lastDataPointRecovered,
      };

      chartRecoveredData.push(newDataPoint);
    }
    lastDataPointRecovered = data.recovered[date];
  }
  for (let date in data.deaths) {
    if (lastDataPointDeaths) {
      let newDataPoint = {
        x: date,
        y: data.deaths[date] - lastDataPointDeaths,
      };

      chartDeathData.push(newDataPoint);
    }
    lastDataPointDeaths = data.deaths[date];
  }
  return chartData, chartDeathData, chartRecoveredData;
};
const buildChart = (data) => {
  buildChartData(data);
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
          backgroundColor: "#CC10344B",
          borderColor: "#CC1034",
          data: chartData,
        },
        {
          label: "Recovered",
          backgroundColor: "#7dd71d4b",
          borderColor: "#7dd71d",
          data: chartRecoveredData,
        },
        {
          label: "Deaths",
          backgroundColor: "#fb44434b",
          borderColor: "#fb4443",
          data: chartDeathData,
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
