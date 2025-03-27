import React from "react";

const LoanTypes = () => {
  return (
    <section className="bg-white py-16" id="services">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Loans Available</h2>

        {/* Loan Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Car Loan */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <img
              src="6428429.jpg"
              alt="Car Loan"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg">Car Loan</h3>
            <p className="text-sm">
              Affordable monthly payments. Quick approval process.
            </p>
          </div>

          {/* Home Loan */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <img
              src="8460355.jpg"
              alt="Home Loan"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg">Home Loan</h3>
            <p className="text-sm">
              Flexible loan terms. Low-interest rates for your dream home.
            </p>
          </div>

          {/* Personal Loan */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <img
              src="8292064.jpg"
              alt="Personal Loan"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg">Personal Loan</h3>
            <p className="text-sm">
              Quick and easy personal loans with low interest.
            </p>
          </div>

          {/* Student Loan */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <img
              src="Tiny college or university students making loan to take degree.jpg"
              alt="Student Loan"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg">Student Loan</h3>
            <p className="text-sm">
              Affordable education financing options with flexible terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanTypes;
