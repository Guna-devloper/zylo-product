import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, ProgressBar } from "react-bootstrap";
import { FaUser, FaBook, FaChartLine, FaTrash, FaPlus, FaSun, FaMoon } from "react-icons/fa";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { useAuth } from "../Component/AuthContext";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      const userCollection = await getDocs(collection(db, "users"));
      setUsers(userCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchCourses = async () => {
      const courseCollection = await getDocs(collection(db, "courses"));
      setCourses(courseCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchActivities = async () => {
      const activityCollection = await getDocs(collection(db, "activities"));
      setRecentActivities(activityCollection.docs.map(doc => doc.data()));
    };

    fetchUsers();
    fetchCourses();
    fetchActivities();
  }, [currentUser]);

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter(user => user.id !== id));
  };

  // Chart.js Data for User Growth
  const userGrowthData = {
    labels: users.map(user => user.email.split("@")[0]), // Using email prefix as username
    datasets: [
      {
        label: "User Registrations",
        data: users.map(() => Math.floor(Math.random() * 100)), // Simulated data
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={`dashboard ${darkMode ? "dark-mode" : ""}`} style={{ padding: "20px" }}>
      <Container>
        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Welcome, {currentUser.email.split("@")[0]} (Admin) 🚀</h2>
          </Col>
          <Col className="text-end">
            <Button variant={darkMode ? "light" : "dark"} onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Col>
        </Row>

        {/* Admin Overview Section */}
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body className="text-center">
                <FaUser size={50} />
                <h5 className="mt-2">Total Users</h5>
                <h3>{users.length}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body className="text-center">
                <FaBook size={50} />
                <h5 className="mt-2">Total Courses</h5>
                <h3>{courses.length}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body className="text-center">
                <FaChartLine size={50} />
                <h5 className="mt-2">User Growth 📈</h5>
                <Line data={userGrowthData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* User Management Section */}
        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Body>
                <h5>Manage Users</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>
                          <Button variant="danger" onClick={() => deleteUser(user.id)}>
                            <FaTrash /> Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Course Management Section */}
        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Body>
                <h5>Manage Courses</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td>{course.name}</td>
                        <td>
                          <Button variant="danger">
                            <FaTrash /> Remove
                          </Button>{" "}
                          <Button variant="success">
                            <FaPlus /> Add More
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activities Section */}
        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Body>
                <h5>Recent Activities 📅</h5>
                {recentActivities.length > 0 ? (
                  <ul>
                    {recentActivities.map((activity, index) => (
                      <li key={index}>{activity.description} - {activity.date}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No recent activities.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Dark Mode Styles */}
      <style jsx="true">{`
        .dark-mode {
          background-color: #121212;
          color: white;
        }
        .dark-mode .card {
          background-color: #1e1e1e;
          color: white;
        }
        .dark-mode .btn {
          background-color: #fff;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
