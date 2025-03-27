import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, Spinner } from "react-bootstrap";
import BASE_CONN from "../config";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const AccountState = () => {
  const [data, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const api = `${BASE_CONN}/banking/balance/?userid=${localStorage.getItem(
      "userid"
    )}`;
    try {
      const res = await axios.get(api);
      setApiData(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1
            className="text-center mb-4 text-white"
            style={{
              background: "linear-gradient(to right, #0066cc, #003366)",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            Account Statement
          </h1>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <Card.Body>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  style={{ textAlign: "center" }}
                >
                  <thead style={{ backgroundColor: "#f8f9fa" }}>
                    <tr>
                      <th>#</th>
                      <th>Credited</th>
                      <th>Debited</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{ color: "green" }}>
                          {e.status === "credited" ? (
                            <>
                              <FaArrowUp /> {e.amount}
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                        <td style={{ color: "red" }}>
                          {e.status === "Debited" ? (
                            <>
                              <FaArrowDown /> {e.amount}
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                        <td style={{ fontSize: "18px", fontWeight: "bold" }}>
                          {e.status}
                        </td>
                        <td>{new Date(e.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AccountState;
