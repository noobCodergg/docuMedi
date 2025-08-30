import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postDoctor } from "@/Api/doctorApi";

const UploadDoctor = () => {
  const [name, setName] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [contact, setContact] = useState(""); 
  const [schedule, setSchedule] = useState([
    { day: "", location: "", startTime: "", endTime: "", slots: "" },
  ]);

  const handleScheduleChange = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const addSchedule = () => {
    setSchedule([
      ...schedule,
      { day: "", location: "", startTime: "", endTime: "", slots: "" },
    ]);
  };

  const removeSchedule = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, specialist, contact, schedule }; // ✅ include contact
    console.log(formData);

    try {
      await postDoctor(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Upload Doctor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Doctor Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Doctor Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter doctor's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Specialist */}
            <div className="grid gap-2">
              <Label htmlFor="specialist">Specialist</Label>
              <Select value={specialist} onValueChange={setSpecialist}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                  <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                  <SelectItem value="Neurologist">Neurologist</SelectItem>
                  <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact Number ✅ */}
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter doctor's contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            {/* Schedule */}
            <div className="space-y-2">
              <Label>Schedule (Day, Location, Time, Slots)</Label>
              {schedule.map((s, index) => (
                <div key={index} className="grid grid-cols-6 gap-2 items-end">
                  <Input
                    type="text"
                    placeholder="Day (e.g., Saturday)"
                    value={s.day}
                    onChange={(e) =>
                      handleScheduleChange(index, "day", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={s.location}
                    onChange={(e) =>
                      handleScheduleChange(index, "location", e.target.value)
                    }
                  />
                  <Input
                    type="time"
                    placeholder="Start"
                    value={s.startTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "startTime", e.target.value)
                    }
                  />
                  <Input
                    type="time"
                    placeholder="End"
                    value={s.endTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "endTime", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Slots"
                    value={s.slots}
                    onChange={(e) =>
                      handleScheduleChange(index, "slots", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeSchedule(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addSchedule}>
                Add Schedule
              </Button>
            </div>

            <Button type="submit" className="w-full mt-4">
              Save Doctor
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadDoctor;
