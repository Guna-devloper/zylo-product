import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ProgressBar, Button, Table } from "react-bootstrap";
import { FaCode, FaBook, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { db } from "../firebase/firebaseConfig"; // Firestore DB
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { useAuth } from "../Component/AuthContext";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUserData = async () => {
      const userDoc = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    const fetchCourses = () => {
      const courseRef = collection(db, "users", currentUser.uid, "courses");
      return onSnapshot(courseRef, (snapshot) => {
        const enrolledCourses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(enrolledCourses);
      });
    };

    const fetchProgress = () => {
      const progressRef = collection(db, "users", currentUser.uid, "progress");
      return onSnapshot(progressRef, (snapshot) => {
        const progressData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProgress(progressData);
      });
    };

    const fetchActivities = () => {
      const activitiesRef = collection(db, "users", currentUser.uid, "activities");
      return onSnapshot(activitiesRef, (snapshot) => {
        const activitiesData = snapshot.docs.map((doc) => doc.data());
        setRecentActivities(activitiesData);
      });
    };

    fetchUserData();
    const unsubCourses = fetchCourses();
    const unsubProgress = fetchProgress();
    const unsubActivities = fetchActivities();

    return () => {
      unsubCourses();
      unsubProgress();
      unsubActivities();
    };
  }, [currentUser]);

  if (!currentUser || !userData) {
    return <h2>Loading...</h2>;
  }

  // Chart.js data for progress
  const progressData = {
    labels: progress.map((p) => p.week),
    datasets: [
      {
        label: "Course Progress",
        data: progress.map((p) => p.percentage),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
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
  <h2 className="text-center">
    Welcome, {userData.email.split("@")[0]}! 🎉
  </h2>
</Col>

          <Col className="text-end">
            <Button variant={darkMode ? "light" : "dark"} onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Col>
        </Row>

        {/* User Overview Section */}
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body className="text-center">
                <FaUserCircle size={50} />
                <h5 className="mt-2">{userData.name}</h5>
                <p>Email: {userData.email}</p>
                <Button variant="primary">Edit Profile</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <h5>Your Learning Progress 📈</h5>
                {progress.length > 0 ? <Line data={progressData} /> : <p>No progress data available.</p>}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Course Progress Section */}
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h5><FaBook /> Enrolled Courses</h5>
                {courses.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.id}>
                          <td>{course.name}</td>
                          <td><ProgressBar now={course.progress} label={`${course.progress}%`} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>No enrolled courses.</p>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h5><FaCode /> Coding Practice</h5>
                <p>Practice your coding skills in our built-in editor.</p>
                <Button variant="success">Start Coding</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activities */}
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

export default UserDashboard;
