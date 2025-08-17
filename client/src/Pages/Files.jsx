import React, { useContext, useEffect, useState } from "react";
import { getFiles } from "@/Api/fileApi";
import { UserContext } from "@/Context/UserContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Files = () => {
  const { userId } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const fetchFiles = async () => {
    try {
      const response = await getFiles(userId);
      setFiles(response.data); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/details/${id}`);
  };

  const filteredFiles = files.filter((file) => {
    const fileDate = file.createdAt ? new Date(file.createdAt) : null;

    // Convert input dates to Date objects
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Name & Category filter
    const matchesName = file.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesCategory = file.category
      .toLowerCase()
      .includes(searchCategory.toLowerCase());

    // Date range filter
    let matchesDate = true;
    if (fileDate) {
      if (start && fileDate < start) matchesDate = false;
      if (end && fileDate > end) matchesDate = false;
    }

    return matchesName && matchesCategory && matchesDate;
  });

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 space-y-4">
      <h2 className="text-2xl font-semibold mb-2">Uploaded Files</h2>

      {/* Search Inputs - Single line */}
      <div className="flex gap-4 flex-wrap items-center">
        <Input
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="flex-1 min-w-[150px]"
        />
        <Input
          placeholder="Search by Category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="flex-1 min-w-[150px]"
        />

        {/* ✅ Start & End Date Range */}
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="flex-1 min-w-[150px]"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="flex-1 min-w-[150px]"
        />
      </div>

      {/* Files Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <TableRow key={file._id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.category}</TableCell>
                <TableCell>
                  {file.createdAt
                    ? format(new Date(file.createdAt), "yyyy-MM-dd")
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => handleNavigate(file._id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No files found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Files;
