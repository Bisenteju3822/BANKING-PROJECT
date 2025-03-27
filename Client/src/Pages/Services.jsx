import React from "react";
import {
  FaRegMoneyBillAlt,
  FaCreditCard,
  FaPiggyBank,
  FaChartLine,
} from "react-icons/fa";

const Services = () => {
  const servicesList = [
    {
      id: 1,
      title: "Online Banking",
      description:
        "Manage your accounts online 24/7 with secure and convenient access.",
      icon: <FaPiggyBank size="3rem" color="#007bff" />,
    },
    {
      id: 2,
      title: "Loan Services",
      description:
        "Easy and affordable loan options to help you achieve your financial goals.",
      icon: <FaRegMoneyBillAlt size="3rem" color="#28a745" />,
    },
    {
      id: 3,
      title: "Credit Cards",
      description:
        "Choose from a variety of credit cards with exciting rewards and offers.",
      icon: <FaCreditCard size="3rem" color="#6610f2" />,
    },
    {
      id: 4,
      title: "Investment Planning",
      description:
        "Grow your wealth with our expert investment advice and planning services.",
      icon: <FaChartLine size="3rem" color="#fd7e14" />,
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Our Bank Services
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "20px",
        }}
      >
        {servicesList.map((service) => (
          <div
            key={service.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              width: "300px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: "15px" }}>{service.icon}</div>
            <h2 style={{ fontSize: "1.5rem", color: "#007bff" }}>
              {service.title}
            </h2>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
