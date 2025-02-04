import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./practice.css";

const Practice = () => {
  const [practiceData, setPracticeData] = useState([]);
  const [error, setError] = useState("");
  const sectionRefs = useRef({}); // Refs for scrolling to specific sections
  const location = useLocation(); // Access lessonId passed via state

  useEffect(() => {
    const fetchPracticeQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/v1/homepage/practice", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch practice questions");
        }

        const data = await response.json();
        setPracticeData(data.lessons);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPracticeQuestions();
  }, []);

  useEffect(() => {
    if (location.state?.lessonId && sectionRefs.current[location.state.lessonId]) {
      // Scroll to the specified lesson section
      sectionRefs.current[location.state.lessonId].scrollIntoView({ behavior: "smooth" });
    }
  }, [location, practiceData]);

  if (error) return <div>Error: {error}</div>;
  if (!practiceData.length) return <div>Loading practice questions...</div>;

  return (
    <div className="practice-container">
      {/* Header */}
      <div className="practice-header">
        <Link to="/home" className="header-item">
          homepage
        </Link>
        <Link to="/dashboard" className="header-item">
          dashboard
        </Link>
      </div>

      {/* Title */}
      <div className="practice-title">
        <h2>
          practice questions <span className="emoji">✨</span>
        </h2>
      </div>

      {/* Questions Section */}
      <div className="questions-section">
        {practiceData.map((lesson) => (
          <div
            className="theory-group"
            key={lesson.lessonId}
            ref={(el) => (sectionRefs.current[lesson.lessonId] = el)}
          >
            {/* Theory Title */}
            <div className="theory-title">
              <Link to="/coding" className="theory-link">
                {lesson.lessonTitle}
              </Link>
            </div>
            {/* Questions List */}
            <ul className="questions-list">
              {lesson.codingQuestions.map((question, index) => (
                <li key={index} className="question-item">
                  <div className="question-icon"></div>
                  <div className="question-text">
                    <h3>{question.title}</h3>
                    <p>{question.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
