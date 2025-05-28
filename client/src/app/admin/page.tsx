"use client";
import List from "@/components/common/list";
import Section from "@/components/common/section";
import DashCard from "@/components/common/dashCard";
import React, { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { BrowserDataChart } from "@/components/common/charts/browserDataChart";
import { OsDataChart } from "@/components/common/charts/osDataCharts";
import { LocationChart } from "@/components/common/charts/locationChart";

interface AnalyticsResponse {
  totalUniqueVisits: number;
  topPages: { pageUrl: string; visitCount: number }[];
  avgTimeSpent: { pageUrl: string; avgTime: number }[];
  topDevices: { device: string; count: number }[];
  topClickedElements: { element: string; clicks: number }[];
  deviceCategories: { category: string; count: number }[];
  loggedStatusStats: { count: number }[];
  avgSessionsPerUser: number;
  processedBrowserData: ChartData[];
  processedOsData: ChartData[];
  processedLocationData: ChartData[];
}
export interface ChartData {
  name: string;
  count: number;
}
export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [startDate, setStartDate] = useState("2025-05-26");
  const [endDate, setEndDate] = useState("");
  const { isAdmin } = useAuth();

  const fetchAnalytics = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    if (isAdmin) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/analytics?startDate=${startDate}&endDate=${endDate}`,
        { credentials: "include" }
      )
        .then((res) => res.json())
        .then(setData)
        .catch((err) => console.error("Failed to fetch analytics:", err));
    }
  };

  useEffect(() => {
    const today = new Date();
    const format = (d: Date) => d.toISOString().slice(0, 10);

    setEndDate(format(today));
  }, []);

  useEffect(() => {
    if (startDate && endDate) fetchAnalytics();
  }, [startDate, endDate]);
  return (
    <>
      {isAdmin ? (
        <div className="p-6 w-screen flex items-center justify-center flex-col mx-auto space-y-8">
          <h1 className="text-4xl text-gray-700 font-bold text-center">
            Admin Analytics Dashboard
          </h1>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 ">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded"
                min={startDate}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <Button
              variant="yellow"
              onClick={fetchAnalytics}
              className=" px-4 py-4 rounded mt-4 md:mt-6"
            >
              Fetch Report
            </Button>
          </div>
          {!data || data.topPages.length <= 1 ? (
            <div className="text-center py-20">Loading Analytics...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <DashCard
                  title="Unique Visits"
                  value={data.totalUniqueVisits}
                />
                <DashCard
                  title="Logged In"
                  value={data.loggedStatusStats[1].count}
                />
                <DashCard
                  title="Logged Out"
                  value={data.loggedStatusStats[0].count}
                />
                <DashCard
                  title="Avg Sessions/User"
                  value={data.avgSessionsPerUser.toFixed(2)}
                />
              </div>
              <div className="flex md:items-start md:justify-center md:w-5xl w-[90vw] flex-wrap flex-col md:flex-row text-center">
                <div className=" flex flex-col  gap-16">
                  <Section title="Top 10 Visited Pages">
                    <List
                      data={data.topPages}
                      keyLabel="pageUrl"
                      valueLabel="visitCount"
                    />
                  </Section>

                  <Section title="Average Time Spent on Pages (sec)">
                    <List
                      data={data.avgTimeSpent}
                      keyLabel="pageUrl"
                      valueLabel="avgTime"
                    />
                  </Section>

                  <Section title="Top Devices">
                    <List
                      data={data.topDevices}
                      keyLabel="device"
                      valueLabel="count"
                    />
                  </Section>

                  <Section title="Top Clicked Buttons">
                    <List
                      data={data.topClickedElements}
                      keyLabel="element"
                      valueLabel="clicks"
                    />
                  </Section>

                  <Section title="Popular Device Categories">
                    <List
                      data={data.deviceCategories}
                      keyLabel="category"
                      valueLabel="count"
                    />
                  </Section>
                </div>
                <div className=" min-w-[400px] flex flex-col items-center justify-center gap-4 text-center">
                  <BrowserDataChart data={data.processedBrowserData} />
                  <OsDataChart data={data.processedOsData} />
                  <LocationChart data={data.processedLocationData} />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="text-4xl h-screen">Admin Access only</p>
      )}
    </>
  );
}
