import React, { useContext, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select"; // adjust path if needed
import { uploadFile } from "@/Api/fileApi";
import { UserContext } from "@/Context/UserContext";

const categories = [
  "Dental",
  "Eye",
  "General",
  "Cardiology",
  "Orthopedic",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "Psychiatry",
  "Gynecology",
];

const Upload = () => {

  const {userId} = useContext(UserContext)
  const [data, setData] = useState({
    name: "",
    category: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleCategoryChange = (value) => {
    setData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("file", data.file);
    formData.append("uploaded_by",userId)

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await uploadFile(formData);
      console.log("Upload successful", response);
      alert("Document uploaded successfully");
        setData({
      name: "",
      category: "",
      file: null,
    });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md"
      >
        <Input
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Document Name"
          required
        />

        <Select value={data.category} onValueChange={handleCategoryChange} required>
          <SelectTrigger className="text-black">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="text-black">
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="file"
          name="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />

        <Button type="submit" className="w-full bg-orange-600">
          Upload Document
        </Button>
      </form>
    </div>
  );
};

export default Upload;
