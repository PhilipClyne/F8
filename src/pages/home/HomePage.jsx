import React from "react";
import Header from "../../components/header/Header.jsx";
import "./HomePage.css";
export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="relative">
        {/* Sliding Banner */}
        <div className="carousel">
          <div className="slide active bg-orange-400">Slide 1</div>
          <div className="slide bg-orange-600">Slide 2</div>
          <div className="slide bg-orange-800">Slide 3</div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-white text-4xl font-bold">
            Welcome to the HomePage
          </h1>
        </div>
      </div>

      <div className="text-center p-8">
        <h2 className="text-orange-600 text-3xl font-bold">Our Services</h2>
        <p className="mt-4 text-gray-600">
          Discover the amazing features we offer!
        </p>
      </div>
    </div>
  );
}
