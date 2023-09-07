export const FetchChartsData = (year, setStatisticsChartsData) => {
  fetch(`http://localhost:8080/monthly-project`)
    .then((response) => response.json())
    .then((responseData) => {
      const newTasksChart = {
        type: "bar",
        height: 220,
        series: [
          {
            name: "Tasks",
            data: Array(12).fill(0),
          },
        ],
        options: {
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "June",
              "July",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        },
      };

      responseData.forEach((item) => {
        const monthIndex = item.month - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          newTasksChart.series[0].data[monthIndex] = item.projects_created;
        }
      });

      fetch(`http://localhost:8080/monthly-sales`)
        .then((response) => response.json())
        .then((responseData) => {
          const monthlySalesChart = {
            type: "line",
            height: 220,
            series: [
              {
                name: "Sales",
                data: Array(12).fill(0),
              },
            ],
            options: {
              xaxis: {
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
            },
          };

          responseData.forEach((item) => {
            const monthIndex = item.month - 1;
            if (monthIndex >= 0 && monthIndex < 12) {
              monthlySalesChart.series[0].data[monthIndex] = item.sales_revenue;
            }
          });

          fetch(`http://localhost:8080/monthly-clients`)
            .then((response) => response.json())
            .then((responseData) => {
              const monthlyNewClientsChart = {
                type: "bar",
                height: 220,
                series: [
                  {
                    name: "Views",
                    data: Array(12).fill(0),
                  },
                ],
                options: {
                  xaxis: {
                    categories: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "June",
                      "July",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                  },
                },
              };

              responseData.forEach((item) => {
                const monthIndex = item.month - 1;
                if (monthIndex >= 0 && monthIndex < 12) {
                  monthlyNewClientsChart.series[0].data[monthIndex] =
                    item.new_client;
                }
              });

              const statisticsChartsData = [
                {
                  color: "white",
                  title: "New Project By Month",
                  description:
                    "Discover the monthly evolution of new projects.",
                  footer: "Activities in this " + year,
                  chart: newTasksChart,
                },
                {
                  color: "white",
                  title: "Sales closed by Month",
                  description: "Gain insights into your sales performance.",
                  footer: "Activities in this " + year,
                  chart: monthlySalesChart,
                },
                {
                  color: "white",
                  title: "Number of new clients",
                  description: "Track the monthly influx of new clients.",
                  footer: "Activities in this " + year,
                  chart: monthlyNewClientsChart,
                },
              ];
              setStatisticsChartsData(statisticsChartsData);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};
