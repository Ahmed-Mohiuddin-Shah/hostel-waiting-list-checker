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
import { FaArrowRight, FaSpinner } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { StudentWaitInfo } from "../../types";
import axios from "axios";
import { apiURL } from "../../constants";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalData, setModalData] = useState<StudentWaitInfo>({
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
      if (response.data) {
        setModalData({
          student_sr_no: response.data.data.student_sr_no,
          student_name: response.data.data.student_name,
          student_cms_id: response.data.data.student_cms_id,
        });
        console.log(modalData);
        onOpen(); // Open the modal after setting the data
      } else {
        toast.error("No data found for the provided CMS ID.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Ensure loading state is always reset
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          placement="center"
          isDismissable={false}
        >
          <ModalContent className="relative w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
            <ModalHeader className="text-black text-4xl">Waiting Info</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-3 text-black">
                <div>
                  <span className="font-bold">Student Name:</span>{" "}
                  {modalData.student_name}
                </div>
                <div>
                  <span className="font-bold">Student CMS ID:</span>{" "}
                  {modalData.student_cms_id}
                </div>
                <div className="center">
                  <span className="font-bold text-3xl">Waiting #</span>{" "}
                </div>
                <div>{modalData.student_sr_no}</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                className="p-3 w-full text-lg bg-blue-500 text-white rounded-md"
                onClick={onClose}
              >
                Close
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Hostel Waiting List</h1>
          <p className="mt-3 text-2xl">
            Check Your Hostel Waiting List Position
          </p>
          <form className="mt-8 gap-5">
            <div>
              <input
                type="number"
                placeholder="Enter your CMS ID"
                className="p-3 w-96 text-lg border border-gray-300 rounded-md text-black"
              />
            </div>
            <div>
              <button
                type="button"
                className="mt-4 p-3 w-96 text-lg bg-blue-500 text-white rounded-md flex flex-row justify-between"
                onClick={handleSubmit}
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
        <ToastContainer />
      </div>
    </>
  );
}
