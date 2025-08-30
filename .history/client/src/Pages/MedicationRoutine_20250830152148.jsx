// src/pages/MedicationRoutine.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserContext } from "@/Context/UserContext";

const weekDaysList = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const MedicationRoutine = () => {
  const { userId } = useContext(UserContext);
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "daily",
    times: [""],
    user: userId,
    weekDays: [],
  });

  const formatTime12h = (timeStr) => {
    if (!timeStr) return "";
    let [hour, minute] = timeStr.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2,"0")} ${ampm}`;
  };

  const fetchMedications = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/personalized/get-medication/${userId}`);
      setMedications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleChange = (e, index) => {
    if (e.target.name === "times") {
      const newTimes = [...formData.times];
      newTimes[index] = e.target.value;
      setFormData({ ...formData, times: newTimes });
    } else if (e.target.name === "weekDays") {
      const value = e.target.value;
      const newWeekDays = formData.weekDays.includes(value)
        ? formData.weekDays.filter(d => d !== value)
        : [...formData.weekDays, value];
      setFormData({ ...formData, weekDays: newWeekDays });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addTimeField = () => {
    setFormData({ ...formData, times: [...formData.times, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/personalized/add-medication", formData);
      fetchMedications();
      alert("Submitted Successfully")
      setFormData({ name: "", dosage: "", frequency: "daily", times: [""], weekDays: [] });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/personalized/delete-medication/${id}`);
      fetchMedications();
      alert("Deleted Successfully")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 grid gap-6">
      {/* Add Medication Form */}
      <Card className="p-4 shadow-xl">
        <h2 className="text-xl font-bold">Add Medication</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-3">
          <input type="text" name="name" placeholder="Medication Name" value={formData.name} onChange={handleChange} className="p-2 border rounded"/>
          <input type="text" name="dosage" placeholder="Dosage (e.g., 1 tablet)" value={formData.dosage} onChange={handleChange} className="p-2 border rounded"/>
          <select name="frequency" value={formData.frequency} onChange={handleChange} className="p-2 border rounded">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {formData.frequency === "weekly" && (
            <div className="flex gap-2 flex-wrap">
              {weekDaysList.map(day => (
                <label key={day} className="flex items-center gap-1">
                  <input type="checkbox" name="weekDays" value={day} checked={formData.weekDays.includes(day)} onChange={handleChange} />
                  {day}
                </label>
              ))}
            </div>
          )}

          {formData.times.map((time, index) => (
            <input key={index} type="time" name="times" value={time} onChange={(e) => handleChange(e,index)} className="p-2 border rounded"/>
          ))}
          <Button type="button" onClick={addTimeField}>+ Add Another Time</Button>
          <Button type="submit">Add</Button>
        </form>
      </Card>

      {/* Medication Routine Display */}
      <Card className="p-4 shadow-xl">
        <h2 className="text-xl font-bold">Your Medication Routine</h2>
        <CardContent className="mt-3 space-y-3">
          {medications.map(med => (
            <div key={med._id} className="p-2 border rounded shadow-sm flex justify-between items-center">
              <div>
                <p><strong>{med.name}</strong> – {med.dosage}</p>
                <p>
                  {med.frequency} at {med.times.map(formatTime12h).join(", ")}
                  {med.frequency==="weekly" && med.weekDays.length > 0 ? ` on ${med.weekDays.join(", ")}` : ""}
                </p>
              </div>
              <Button variant="destructive" onClick={() => handleDelete(med._id)}>Delete</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationRoutine;
