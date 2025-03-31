import React, { useEffect, useState } from "react";
import BASE_CONN from "../config";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

const BalanceInquiry = () => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let creditAmount = 0;
  let debitAmount = 0;
  let netBalance = 0;

  const loadData = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      console.error("User ID not found in localStorage");
      setError("User ID is missing. Please log in again.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_CONN}/banking/balance/?userid=${userId}`
      );

      if (!Array.isArray(res.data)) {
        throw new Error("Unexpected API response format.");
      }

      setBalance(res.data);
    } catch (err) {
      console.error("Error fetching balance data:", err);
      setError("Failed to fetch balance data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  balance.forEach((transaction) => {
    if (transaction.status?.toLowerCase() === "credited") {
      creditAmount += transaction.amount || 0;
    }
    if (transaction.status?.toLowerCase() === "debited") {
      debitAmount += transaction.amount || 0;
    }
  });

  netBalance = creditAmount - debitAmount;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0" style={{ borderRadius: "10px" }}>
            <Card.Header
              className="p-4 text-center"
              style={{ backgroundColor: "#4caf50", color: "white" }}
            >
              Balance Inquiry
            </Card.Header>
            <Card.Body className="p-4">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-center text-danger">{error}</div>
              ) : (
                <>
                  <Row className="mb-4">
                    <Col>
                      <FaArrowCircleUp className="me-2 text-success" />
                      Credit Amount: ₹{creditAmount.toLocaleString()}
                    </Col>
                    <Col>
                      <FaArrowCircleDown className="me-2 text-danger" />
                      Debit Amount: ₹{debitAmount.toLocaleString()}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      Net Balance: ₹{netBalance.toLocaleString()}
                    </Col>
                  </Row>
                  <Button
                    onClick={loadData}
                    className="mt-4"
                    style={{ fontWeight: "bold" }}
                  >
                    Refresh Data
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BalanceInquiry;
