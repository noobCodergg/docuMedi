import React, { useContext, useEffect, useRef, useState } from "react";
import { getUser } from "@/Api/authApi";
import { UserContext } from "@/Context/UserContext";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  DropletIcon,
  HeartPulseIcon,
  UserIcon,
  ShieldAlertIcon, // ✅ Icon for emergency contact
} from "lucide-react";

const Card = () => {
  const { userId } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const cardRef = useRef();

  const fetchUser = async () => {
    try {
      const response = await getUser(userId);
      setUser(response.data);
    } catch (error) {
      console.error("Fetch user failed:", error);
    }
  };

  const handleDownload = () => {
    if (!cardRef.current) return;

    const downloadButton = document.getElementById("download-btn");

    // Hide without breaking layout
    downloadButton.style.visibility = "hidden";
    downloadButton.style.position = "absolute";

    const opt = {
      margin: 0,
      filename: `${user.name}_certificate.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        scrollY: 0,
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(cardRef.current)
      .save()
      .then(() => {
        // Restore button style
        downloadButton.style.visibility = "visible";
        downloadButton.style.position = "static";
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div
        ref={cardRef}
        className="w-full max-w-3xl bg-white rounded-[40px] border-[2px] border-orange-600 p-10 shadow-2xl font-serif mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-2 text-zinc-800 tracking-wide uppercase">
          Certificate of Health Profile
        </h2>
        <p className="text-center text-zinc-500 mb-10 italic">
          This is to certify that the following personal health information is
          recorded in our system.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-gray-800 text-lg">
          <div className="flex items-center space-x-4">
            <UserIcon className="text-orange-600" />
            <p>
              <strong>Name:</strong> {user.name}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <MailIcon className="text-orange-600" />
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <MapPinIcon className="text-orange-600" />
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <PhoneIcon className="text-orange-600" />
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
          </div>

          {/* ✅ Emergency Contact */}
          <div className="flex items-center space-x-4">
            <ShieldAlertIcon className="text-orange-600" />
            <p>
              <strong>Emergency :</strong> {user.emergency_contact}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <DropletIcon className="text-orange-600" />
            <p>
              <strong>Blood Group:</strong> {user.blood_group}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <HeartPulseIcon className="text-orange-600" />
            <p>
              <strong>Health Condition:</strong> {user.health_condition}
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            id="download-btn"
            onClick={handleDownload}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-full print:hidden"
          >
            Download as PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;

