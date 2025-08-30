import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { UserContext } from "@/Context/UserContext";

const specialists = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Psychiatry",
  "Orthopedics",
  "Gynecology",
];

import { creatAppointment } from "@/Api/appointmentApi";

const CreateAppointment = () => {
    const {userId} = useContext(UserContext)
  const [form, setForm] = useState({
    name: "",
    specialist: "",
    reason: "",
    time: "",
    uploaded_by:userId
  });

  const [date, setDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload = {
      ...form,
      date: date ? format(date, "yyyy-MM-dd") : "",
    };
    console.log("Submitted:", payload);
    
    try{
      const response = await creatAppointment(payload)
      alert("Appointment Created")
       setForm({
      name: "",
      specialist: "",
      reason: "",
      time: "",
      uploaded_by: userId,
    });
    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-zinc-800">
           Create Appointment
        </h2>

        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Patient Name"
          required
        />

        <Select
          value={form.specialist}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, specialist: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Specialist" />
          </SelectTrigger>
          <SelectContent>
            {specialists.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason for Visit"
        />

        <div className="grid grid-cols-2 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
          Create Appointment
        </Button>
      </form>
    </div>
  );
};

export default CreateAppointment;

