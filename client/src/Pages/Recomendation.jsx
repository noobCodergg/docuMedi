import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/Context/UserContext";

const Recomendation = () => {
  const { userId } = useContext(UserContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/personalized/get-recomendation/${userId}`
        );
        setRecommendations(res.data.recommendations || []);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setRecommendations(["Failed to fetch recommendations."]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchRecommendations();
  }, [userId]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-1">
          Health Recommendations
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Based on your vitals from the last 30 days
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 animate-pulse">
          Loading recommendations...
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
            >
              <p className="text-gray-800 font-medium">{rec}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 italic">
          No recommendations available for the last 30 days.
        </div>
      )}
    </div>
  );
};

export default Recomendation;
