"use client";

import { useState } from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa6";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
  };

  return (
    <>
      {/* page for student to enter their CMS ID */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
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
                className="p-3 w-96 text-lg border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
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
