import React from "react";

const Hero = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('Screenshot 2025-03-24 181620.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto text-center text-white relative z-10 py-40">
        <h1 className="text-5xl font-bold mb-4 ">Welcome to Prudentia Bank</h1>
        <p className="text-xl mb-6">Your Trusted Financial Partner</p>
        <a
          href="login"
          className="px-8 py-3 bg-indigo-700 text-white rounded-full text-lg hover:bg-indigo-800"
        >
          Login
        </a>
      </div>
    </section>
  );
};

export default Hero;
