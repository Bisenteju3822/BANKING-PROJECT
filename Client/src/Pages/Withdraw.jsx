import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_CONN from "../config";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const customerid = localStorage.getItem("userid");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      return;
    }

    const api = `${BASE_CONN}/banking/transaction`;
    try {
      const response = await axios.post(api, {
        amount: parseFloat(amount),
        status: "Debited",
        customerid: customerid,
      });

      toast.success("Amount debited successfully!");
      setAmount(""); // Reset form field
    } catch (error) {
      toast.error("Transaction failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h2>Withdraw Amount</h2>
        <form onSubmit={handleSubmit}>
          <label>Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to withdraw"
          />
          <button type="submit">Withdraw</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Withdraw;
