import React, { useEffect, useState } from "react";
import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { API_URL } from "@/settings"

const API_BASE_URL = API_URL;

export function FetchSalesRecords(
  formattedStartOfMonth,
  formattedEndOfMonth,
  formattedStartOfLastMonth,
  formattedEndOfLastMonth,
  formatNumber,
  setStatisticsCardsData,
) {
  // Fetch sales data
  fetch(
    `${API_BASE_URL}/sales-records?start=${formattedStartOfMonth}&end=${formattedEndOfMonth}`,
  )
    .then((response) => response.json())
    .then((responseData) => {
      fetch(
        `${API_BASE_URL}/sales-records?start=${formattedStartOfLastMonth}&end=${formattedEndOfLastMonth}`,
      )
        .then((response) => response.json())
        .then((precendata) => {
          const increase =
            precendata !== 0
              ? ((responseData - precendata) / precendata) * 100
              : 100;
          const salesdata = {
            color: "blue",
            icon: BanknotesIcon,
            title: "Monthly Sales Records",
            value: "$" + formatNumber(responseData),
            footer: {
              color: increase >= 0 ? "text-green-500" : "text-red-500",
              value: increase,
              label: "than last month",
            },
          };

          // Fetch est sales value
          fetch(
            `${API_BASE_URL}/est-sales-records?start=${formattedStartOfMonth}&end=${formattedEndOfMonth}`,
          )
            .then((response) => response.json())
            .then((responseData) => {
              fetch(
                `${API_BASE_URL}//est-sales-records?start=${formattedStartOfLastMonth}&end=${formattedEndOfLastMonth}`,
              )
                .then((response) => response.json())
                .then((precendata) => {
                  const increase =
                    precendata !== 0
                      ? ((responseData - precendata) / precendata) * 100
                      : 100;
                  const estsalesdata = {
                    color: "blue",
                    icon: BanknotesIcon,
                    title: "Expected Sale Value",
                    value: "$" + formatNumber(responseData),
                    footer: {
                      color: increase >= 0 ? "text-green-500" : "text-red-500",
                      value: increase.toFixed(0),
                      label: "than last month",
                    },
                  };

                  // Fetch project data
                  fetch(
                    `${API_BASE_URL}//project-records?start=${formattedStartOfMonth}&end=${formattedEndOfMonth}`,
                  )
                    .then((response) => response.json())
                    .then((responseData) => {
                      fetch(
                        `${API_BASE_URL}/project-records?start=${formattedStartOfLastMonth}&end=${formattedEndOfLastMonth}`,
                      )
                        .then((response) => response.json())
                        .then((precendata) => {
                          const increase =
                            precendata !== 0
                              ? Math.min(
                                  ((responseData - precendata) / precendata) *
                                    100,
                                  100,
                                )
                              : 100;
                          const projectdata = {
                            color: "pink",
                            icon: ChartBarIcon,
                            title: "Monthly New Project",
                            value: responseData,
                            footer: {
                              color:
                                increase >= 0
                                  ? "text-green-500"
                                  : "text-red-500",
                              value: increase.toFixed(0),
                              label: "than last month",
                            },
                          };
                          // Fetch customers data
                          fetch(
                            `${API_BASE_URL}/customers-records?start=${formattedStartOfMonth}&end=${formattedEndOfMonth}`,
                          )
                            .then((response) => response.json())
                            .then((responseData) => {
                              fetch(
                                `${API_BASE_URL}/customers-records?start=${formattedStartOfLastMonth}&end=${formattedEndOfLastMonth}`,
                              )
                                .then((response) => response.json())
                                .then((precendata) => {
                                  const increase =
                                    precendata !== 0
                                      ? Math.min(
                                          ((responseData - precendata) /
                                            precendata) *
                                            100,
                                          100,
                                        )
                                      : 100;
                                  const custdata = {
                                    color: "green",
                                    icon: UserPlusIcon,
                                    title: "New Clients",
                                    value: responseData,
                                    footer: {
                                      color:
                                        increase >= 0
                                          ? "text-green-500"
                                          : "text-red-500",
                                      value: increase.toFixed(0),
                                      label: "than last month",
                                    },
                                  };

                                  // Combine data into a single array
                                  const combinedData = [
                                    salesdata,
                                    estsalesdata,
                                    projectdata,
                                    custdata,
                                  ];

                                  // Pass the combined data to the setStatisticsCardsData function
                                  setStatisticsCardsData(combinedData);
                                })
                                .catch((error) => console.error(error));
                            })
                            .catch((error) => console.error(error));
                        })
                        .catch((error) => console.error(error));
                    })
                    .catch((error) => console.error(error));
                })
                .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}
