let chartData = [];
let chartRecoveredData = [];
let chartDeathData = [];
const buildChartData = (data) => {
  for (let date in data.cases) {
    let newDataPoint = {
      x: date,
      y: data.cases[date],
    };
    chartData.push(newDataPoint);
  }

  for (let date in data.deaths) {
    let newDataPoint = {
      x: date,
      y: data.deaths[date],
    };
    chartDeathData.push(newDataPoint);
  }
  for (let date in data.recovered) {
    let newDataPoint = {
      x: date,
      y: data.recovered[date],
    };
    chartRecoveredData.push(newDataPoint);
  }
  console.log(data);
};

const buildChart = () => {
  var timeFormat = "MM/DD/YY";
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      datasets: [
        {
          label: "Total Cases",
          backgroundColor: "#CC103477",
          borderColor: "#CC1034",
          data: chartData,
        },
        {
          label: "Recovered",
          backgroundColor: "#7fd92277",
          borderColor: "#7fd922",
          data: chartRecoveredData,
        },
        {
          label: "Deaths",
          backgroundColor: "#fa557577",
          borderColor: "#fa5575",
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
