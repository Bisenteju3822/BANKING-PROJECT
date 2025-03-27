import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import BASE_CONN from "../config";
import axios from "axios";
import { FaWallet } from "react-icons/fa";

const DepositMoney = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const customerid = localStorage.getItem("userid");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    let api = `${BASE_CONN}/banking/transaction`;
    try {
      const res = await axios.post(api, {
        amount: parseFloat(amount),
        status: "credited",
        customerid: customerid,
      });
      console.log(res.data);
      alert("Amount credited successfully");
      setAmount("");
      setError("");
    } catch (error) {
      console.error("Error crediting amount:", error);
      setError("Failed to process the transaction. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0" style={{ borderRadius: "10px" }}>
            <Card.Header
              className="text-center text-white"
              style={{
                background: "linear-gradient(to right, #00c853, #64dd17)",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                padding: "15px",
              }}
            >
              <h3>
                <FaWallet className="me-2" />
                Deposit Amount
              </h3>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="amount">
                  <Form.Label className="fw-bold">Enter Amount (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={amount}
                    placeholder="Enter amount to deposit"
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                  />
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  className="w-100 mt-3"
                  style={{
                    transition: "transform 0.2s",
                    fontWeight: "bold",
                    padding: "10px",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Deposit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DepositMoney;
