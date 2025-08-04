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
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Files = () => {
  const { userId } = useContext(UserContext);
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await getFiles(userId);
      setFiles(response.data); // adjust if structure is different
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);


  const navigate = useNavigate();

  const handleNavigate=(id)=>{
     navigate(`/details/${id}`)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">Uploaded Files</h2>
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
          {files.length > 0 ? (
            files.map((file) => (
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
                    onClick={()=>handleNavigate(file._id)}
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
