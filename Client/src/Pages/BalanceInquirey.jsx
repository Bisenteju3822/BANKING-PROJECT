import React, { useEffect, useState } from "react";
import BASE_CONN from "../config";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

const BalanceInquiry = () => {
  const [balance, setBalance] = useState([]);
  let creditAmount = 0;
  let debitAmount = 0;
  let netBalance = 0;

  const loadData = async () => {
    const api = `${BASE_CONN}/banking/balance/?userid=${localStorage.getItem(
      "userid"
    )}`;
    const res = await axios.get(api);
    setBalance(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  balance.forEach((e) => {
    if (e.status === "credited") {
      creditAmount += e.amount;
    }
    if (e.status === "Debited") {
      debitAmount += e.amount;
    }
  });

  netBalance = creditAmount - debitAmount;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card
            className="shadow-lg border-0"
            style={{ borderRadius: "10px", overflow: "hidden" }}
          >
            <Card.Header
              style={{
                background: "linear-gradient(45deg, #4caf50, #81c784)",
                color: "white",
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
              className="p-4"
            >
              Balance Inquiry
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="mb-4">
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <FaArrowCircleUp
                      size="1.5rem"
                      color="green"
                      className="me-2"
                    />
                    <strong>Credit Amount:</strong> ₹
                    {creditAmount.toLocaleString()}
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <FaArrowCircleDown
                      size="1.5rem"
                      color="red"
                      className="me-2"
                    />
                    <strong>Debit Amount:</strong> ₹
                    {debitAmount.toLocaleString()}
                  </div>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col xs={12} className="text-center">
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    <strong>Net Balance:</strong>{" "}
                    <span style={{ color: netBalance >= 0 ? "green" : "red" }}>
                      ₹{netBalance.toLocaleString()}
                    </span>
                  </div>
                </Col>
              </Row>
              <Button
                variant="success"
                className="w-100"
                onClick={loadData}
                style={{
                  transition: "transform 0.2s",
                  fontWeight: "bold",
                  padding: "10px",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Refresh Data
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BalanceInquiry;
