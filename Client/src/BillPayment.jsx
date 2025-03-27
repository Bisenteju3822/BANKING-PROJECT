import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_CONN from "./config";

const BillPayment = () => {
  const [billAmount, setBillAmount] = useState("");
  const [billType, setBillType] = useState("");
  const customerid = localStorage.getItem("userid");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!billAmount || parseFloat(billAmount) <= 0 || !billType) {
      toast.error("Please enter valid bill details.");
      return;
    }

    const api = `${BASE_CONN}/banking/billpayment`;
    try {
      const response = await axios.post(api, {
        amount: parseFloat(billAmount),
        billType: billType,
        customerid: customerid,
      });

      toast.success("Bill payment successful!");
      setBillAmount(""); // Reset form field
      setBillType("");
    } catch (err) {
      toast.error("Failed to process bill payment. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pay Your Bills</h2>
      <form onSubmit={handleSubmit}>
        <label>Bill Type</label>
        <select
          value={billType}
          onChange={(e) => setBillType(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        >
          <option value="">Select bill type</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
          <option value="Others">Others</option>
        </select>

        <label>Bill Amount</label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="Enter bill amount"
          style={{ display: "block", marginBottom: "10px" }}
        />

        <button type="submit" style={{ display: "block" }}>
          Pay Bill
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BillPayment;
