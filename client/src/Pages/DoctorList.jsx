import React, { useEffect, useState } from "react";
import { getDoctor } from "../Api/doctorApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchSpecialist, setSearchSpecialist] = useState("");

  const fetchDoctors = async () => {
    try {
      const response = await getDoctor();
      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchName.toLowerCase()) &&
      doc.specialist.toLowerCase().includes(searchSpecialist.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h2 className="text-2xl font-semibold">Doctor List</h2>

      {/* Search Inputs - right-aligned */}
      <div className="flex justify-end gap-2 items-center flex-wrap">
        <Input
          placeholder="Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-64 h-8 text-sm"
        />
        <Input
          placeholder="Specialist"
          value={searchSpecialist}
          onChange={(e) => setSearchSpecialist(e.target.value)}
          className="w-64 h-8 text-sm"
        />
      </div>

      {/* Doctor Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Specialist</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDoctors.map((doc) => (
            <React.Fragment key={doc._id}>
              <TableRow className="hover:bg-gray-50">
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.contact}</TableCell>
                <TableCell>{doc.specialist}</TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => toggleExpand(doc._id)}>
                    {expandedId === doc._id ? "Collapse" : "Expand"}
                  </Button>
                </TableCell>
              </TableRow>

              {expandedId === doc._id && (
                <TableRow>
                  <TableCell colSpan={4} className="bg-gray-50 p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Schedule:</h4>
                      {doc.schedule.map((s, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-5 gap-2 text-sm border-b border-gray-200 p-2"
                        >
                          <span>
                            <strong>Day:</strong> {s.day}
                          </span>
                          <span>
                            <strong>Location:</strong> {s.location}
                          </span>
                          <span>
                            <strong>Start:</strong> {s.startTime}
                          </span>
                          <span>
                            <strong>End:</strong> {s.endTime}
                          </span>
                          <span>
                            <strong>Slots:</strong> {s.slots}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorList;
