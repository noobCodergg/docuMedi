import { getSingleFile } from "@/Api/fileApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [url, setUrl] = useState("");

  const fetchSingleFile = async () => {
    try {
      const response = await getSingleFile(id);
      setUrl(response.data.fileUrl);
      console.log("File URL:", response.data.fileUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleFile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold mb-4">Document Preview</h1>

      {url ? (
        <iframe
          src={`http://localhost:8000/${url}`}
          title="PDF Viewer"
          width="100%"
          height="800px"
          className="rounded-lg shadow border max-w-5xl w-full"
        />
      ) : (
        <p>Loading document...</p>
      )}
    </div>
  );
};

export default Details;

