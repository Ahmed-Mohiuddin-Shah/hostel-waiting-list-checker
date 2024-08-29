"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { FaArrowRight, FaBackward, FaSpinner } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { StudentWaitInfo } from "../../types";
import axios from "axios";
import { apiURL } from "../../constants";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);

  const [studentData, setStudentData] = useState<StudentWaitInfo>({
    student_sr_no: 0,
    student_name: "",
    student_cms_id: 0,
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const cmsId = document.querySelector("input")?.value;
    console.log(cmsId);

    if (!cmsId) {
      toast.error("Please enter a valid CMS ID.");
      setIsLoading(false);
      return;
    }

    // validate cmsId
    if (
      cmsId.length > 11 ||
      cmsId.length < 6 ||
      isNaN(parseInt(cmsId)) ||
      parseInt(cmsId) < 0
    ) {
      toast.error("Please enter a valid CMS ID.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${apiURL}/student/student-waiting-info/${parseInt(cmsId)}`
      );

      // Ensure response is valid and contains data
      if (response.data.status) {
        setStudentData({
          student_sr_no: response.data.data.student_sr_no,
          student_name: response.data.data.student_name,
          student_cms_id: response.data.data.student_cms_id,
        });
        setShowData(true);
        toast.success("Data found successfully.");
      } else {
        toast.error("No data found for the provided CMS ID.");
        setShowData(false);
      } // Handle error if no data is found
    } catch (error) {
      setShowData(false);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Ensure loading state is always reset
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {showData ? (
          <>
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
              <h1 className="mt-3 text-9xl">YOUR WAITING LIST POSITION IS</h1>
              <p className="mt-3 text-9xl">
                <b>{studentData.student_sr_no}</b>
              </p>
              <div className="mt-8 gap-10 text-white">
                <div className="">
                  <div className="p-3 w-96 text-lg border border-gray-300 rounded-md text-black mb-5">
                    <div className="flex flex-row justify-between text-white">
                      <div>Student CMS ID</div>
                      <div>{studentData.student_cms_id}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="p-3 w-96 text-lg border border-gray-300 rounded-md text-black">
                    <div className="flex flex-row justify-between text-white">
                      <div>Student Name</div>
                      <div>{studentData.student_name}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="mt-4 p-3 w-96 text-lg bg-blue-500 text-white rounded-md flex flex-row justify-between"
                    onClick={() => setShowData(false)}
                  >
                    <div>Check Another</div>
                    <div>
                      <FaBackward />
                    </div>
                  </button>
                </div>
              </div>
            </main>
          </>
        ) : (
          <>
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
              <h1 className="text-6xl font-bold">Hostel Waiting List</h1>
              <p className="mt-3 text-2xl">
                Check Your Hostel Waiting List Position
              </p>
              <form className="mt-8 gap-5" onSubmit={(e)=>{
                e.preventDefault();
                handleSubmit();
              }}>
                <div>
                  <input
                    type="number"
                    placeholder="Enter your CMS ID"
                    className="p-3 w-96 text-lg border border-gray-300 rounded-md text-black"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="mt-4 p-3 w-96 text-lg bg-blue-500 text-white rounded-md flex flex-row justify-between"
                  >
                    <div>Check</div>
                    <div>
                      {isLoading && <FaSpinner className="animate-spin" />}
                      {!isLoading && <FaArrowRight />}
                    </div>
                  </button>
                </div>
              </form>
            </main>
          </>
        )}
        <ToastContainer />
      </div>
    </>
  );
}
