"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UserRegistrationForm from "../components/UserRegistrationForm";
import CampRegister from "../components/CampRegister";
import VetRegister from "../components/VetRegister";
import CallRequest from "../components/CallRequest";
import RescueCenterRegistrationForm from "../components/RescueCentreRegister";
import logo from "/public/callchimp.svg";
import { Typewriter } from "react-simple-typewriter";

interface CampData {
  campName: string;
  location: string;
  city: string;
  state: string;
  zipCode: string;
  contactNumber: string;
  email: string;
  website: string;
  servicesProvided: string;
  eventDates: string;
}

const Dashboard: React.FC = () => {
  const [isModalDonorOpen, setModalDonorOpen] = useState(false);

  const openModalDonor = () => {
    setModalDonorOpen(true);
  };

  const closeModalDonor = () => {
    setModalDonorOpen(false);
  };

  const [isModalClinicOpen, setModalClinicOpen] = useState(false);

  const openModalClinic = () => {
    setModalClinicOpen(true);
  };

  const closeModalClinic = () => {
    setModalClinicOpen(false);
  };

  const [isModalMedicalOpen, setModalMedicalOpen] = useState(false);

  const openModalMedical = () => {
    setModalMedicalOpen(true);
  };

  const closeModalMedical = () => {
    setModalMedicalOpen(false);
    fetchCamps();
  };

  const [isModalRescueOpen, setModalRescueOpen] = useState(false);

  const openModalRescue = () => {
    setModalRescueOpen(true);
  };

  const closeModalRescue = () => {
    setModalRescueOpen(false);
  };

  const [camps, setCamps] = useState<CampData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCamps = async () => {
    try {
      const response = await fetch("/api/view-camps");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: CampData[] = await response.json();
      setCamps(data);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 ">
      <h2 className="relative text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-6 text-center z-10">
        <div className="h-10">
          <Typewriter
            words={["Welcome! Let's make a Paw-sitive impact on society"]}
            loop={false}
            typeSpeed={50}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </div>
      </h2>
      {/* Spotlight and Emergency Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-16 mb-10">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent from-red-700 via-blue-500 to-yellow-500 animate-text">
            Spotlight
          </h2>
          <ul className="text-blue-600 cursor-pointer list-disc text-xl">
            {camps.slice(0, 6).map((camp) => (
              <li key={camp.campName}>
                <a
                  href={camp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {camp.campName} camp is going on at {camp.location} on{" "}
                  {camp.eventDates}
                </a>
              </li>
            )) || <li>No Camps Found</li>}
          </ul>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg grid place-items-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            PAWsitive Support
          </h2>
          <p className="text-gray-700 mb-4 text-center">
            Register for our customer support and become a pet care pro! Learn
            tips, tricks, and how to navigate our portal effortlessly. Your
            pet's well-being starts here!
          </p>
          <CallRequest />
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-6 mx-16 mb-10">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Services</h2>
        <p className="text-gray-100 mb-4">Explore our services now!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Link href="../dogdonor">
            <div className="bg-[#ededed] p-6 shadow-2xl shadow-slate-600 rounded-lg hover:shadow-xl hover:shadow-slate-600 hover:bg-white transition-all duration-300 h-[300px] flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Dog Blood Donors
              </h2>
              <p className="text-gray-600 mb-4">
                Look for Dogs Who Can Donate Blood
              </p>
              <p className="text-gray-500 italic">
                "Be the hero your furry friend needs. Every drop counts!"
              </p>
            </div>
          </Link>
          <Link href="../vetclinics">
            <div className="bg-[#ededed] p-6 shadow-2xl shadow-slate-600 rounded-lg hover:shadow-xl hover:shadow-slate-600 hover:bg-white transition-all duration-300 h-[300px] flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Veterinary Clinics
              </h2>
              <p className="text-gray-600 mb-4">
                Find veterinary clinics that support blood donation.
              </p>
              <p className="text-gray-500 italic">
                "Care, Compassion, and Cure. Find the best for your pet!"
              </p>
            </div>
          </Link>
          <Link href="../rescuecenter">
            <div className="bg-[#ededed] p-6 shadow-2xl shadow-slate-600 rounded-lg hover:shadow-xl hover:shadow-slate-600 hover:bg-white transition-all duration-300 h-[300px] flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Rescue Centers
              </h2>
              <p className="text-gray-600 mb-4">
                Find rescue centers near you.
              </p>
              <p className="text-gray-500 italic">
                "Rescue, Rehabilitate, Rehome. Together, we make a difference."
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Collaborate with Us Section */}
      <div className="mt-6 mb-20 mx-16">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Collaborate with Us
        </h2>
        <p className="text-gray-100">
          Join us in making a difference. Register for any of the following:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
          <div
            className="bg-[#ededed] p-6 shadow-2xl shadow-slate-600 rounded-lg hover:shadow-xl hover:shadow-slate-600 hover:bg-white transition-all duration-300 cursor-pointer"
            onClick={openModalDonor}
          >
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              Register as a Donor
            </h3>
            <p className="text-gray-700">
              Register your dog as a blood donor and help save lives.
            </p>
          </div>
          <div
            className="bg-[#ededed] p-6 shadow-2xl shadow-slate-600 rounded-lg hover:shadow-xl hover:shadow-slate-600 hover:bg-white transition-all duration-300 cursor-pointer"
            onClick={openModalClinic}
          >
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              Register Veterinary Clinic
            </h3>
            <p className="text-gray-700">
              Register your veterinary clinic to collaborate with us.
            </p>
            {/* Add registration form or link here */}
          </div>
          <div
            className="bg-[#ededed] p-6 shadow-2xl shadow-slate-600 rounded-lg hover:shadow-xl hover:shadow-slate-600 hover:bg-white transition-all duration-300 cursor-pointer"
            onClick={openModalMedical}
          >
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              Register for Camps and Medical Drives
            </h3>
            <p className="text-gray-700">
              Organize or participate in blood donation camps and medical drives
              for pets.
            </p>
            {/* Add registration form or link here */}
          </div>
          <div
            className="bg-[#ededed] p-6 shadow-2xl shadow-slate-600 rounded-lg hover:shadow-xl hover:shadow-slate-600 hover:bg-white transition-all duration-300 cursor-pointer"
            onClick={openModalRescue}
          >
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              Register for Rescue Center
            </h3>
            <p className="text-gray-700">
              Join our site to let people know about your rescue center.
            </p>
            {/* Add registration form or link here */}
          </div>
        </div>
      </div>

      {/* Modal for ExtendedEmailSubscriptionForm */}
      {isModalDonorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-lg max-w-lg w-full relative bg-opacity-90 backdrop-filter backdrop-blur-sm border-gray-600 border-2">
            <button
              className="absolute top-2 right-2 text-gray-600 text-4xl pr-2"
              onClick={closeModalDonor}
            >
              &times;
            </button>
            <UserRegistrationForm />
          </div>
        </div>
      )}

      {/* Modal for ExtendedEmailSubscriptionForm */}
      {isModalClinicOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-lg max-w-lg w-full relative bg-opacity-90 backdrop-filter backdrop-blur-sm border-gray-600 border-2">
            <button
              className="absolute top-2 right-2 text-gray-600 text-4xl pr-2"
              onClick={closeModalClinic}
            >
              &times;
            </button>
            <VetRegister />
          </div>
        </div>
      )}

      {/* Modal for ExtendedEmailSubscriptionForm */}
      {isModalMedicalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-lg max-w-lg w-full relative bg-opacity-90 backdrop-filter backdrop-blur-sm border-gray-600 border-2">
            <button
              className="absolute top-2 right-2 text-gray-600 text-4xl pr-2"
              onClick={closeModalMedical}
            >
              &times;
            </button>
            <CampRegister />
          </div>
        </div>
      )}

      {/* Modal for ExtendedEmailSubscriptionForm */}
      {isModalRescueOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-lg max-w-lg w-full relative bg-opacity-90 backdrop-filter backdrop-blur-sm border-gray-600 border-2">
            <button
              className="absolute top-2 right-2 text-gray-600 text-4xl pr-2"
              onClick={closeModalRescue}
            >
              &times;
            </button>
            <RescueCenterRegistrationForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
