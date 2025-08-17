import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Context/UserContext";
import { getData } from "@/Api/personalizedApi";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = () => {
  const { userId } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(userId);
        setData(response.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "" },
    },
  };

  const createLineChartData = (field, label) => ({
    labels: data.map((item) => item.date),
    datasets: [
      {
        label,
        data: data.map((item) => item[field]),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        tension: 0.3,
      },
    ],
  });

  // Blood Pressure chart with 2 lines
  const createBloodPressureChartData = () => ({
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Systolic",
        data: data.map((item) => item.systolic),
        borderColor: "rgb(220, 38, 38)",
        backgroundColor: "rgba(220, 38, 38, 0.5)",
        tension: 0.3,
      },
      {
        label: "Diastolic",
        data: data.map((item) => item.diastolic),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        tension: 0.3,
      },
    ],
  });

  return (
    <div className="p-4 flex justify-center">
      <div className="w-2/3">
        <Tabs defaultValue="bloodSugar" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bloodSugar">Blood Sugar</TabsTrigger>
            <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
            <TabsTrigger value="stepCount">Step Count</TabsTrigger>
            <TabsTrigger value="burnedCalories">Burned Calories</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
          </TabsList>

          <TabsContent value="bloodSugar">
            <Line
              data={createLineChartData("bloodSugar", "Blood Sugar (mg/dL)")}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Blood Sugar Over Time" } } }}
            />
          </TabsContent>

          <TabsContent value="bloodPressure">
            <Line
              data={createBloodPressureChartData()}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Blood Pressure Over Time" } } }}
            />
          </TabsContent>

          <TabsContent value="stepCount">
            <Line
              data={createLineChartData("stepCount", "Step Count")}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Step Count Over Time" } } }}
            />
          </TabsContent>

          <TabsContent value="burnedCalories">
            <Line
              data={createLineChartData("burnedCalories", "Burned Calories")}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Burned Calories Over Time" } } }}
            />
          </TabsContent>

          <TabsContent value="weight">
            <Line
              data={createLineChartData("weight", "Weight (kg)")}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Weight Over Time" } } }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Charts;
