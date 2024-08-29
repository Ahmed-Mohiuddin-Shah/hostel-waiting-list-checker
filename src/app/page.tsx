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

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    setIsLoading(true);
    onOpen();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading delay
    toast.success("Your position in the waiting list is 5.", 
      {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          placement="center"
          isDismissable={false}
          className="flex items-center justify-center"
        >
          <ModalContent className="relative w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
            <ModalHeader>Hostel Waiting List</ModalHeader>
            <ModalBody>
              <p>Your position in the waiting list is 5.</p>
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
                type="text"
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
      </div>
    </>
  );
}
