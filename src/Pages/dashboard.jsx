import React, { useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom"; 

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("progress");
  
  // Sample user data
  const userData = {
    name: "Yaseerah Kader",
    streak: 7,
    points: 2150,
    level: 12,
    nextLevelPoints: 3000,
    dailyGoal: 20,
    completedToday: 12
  };

  // Sample progress data
  const progressData = [
    { topic: "JavaScript Basics", progress: 70, lastReviewed: "2 days ago" },
    { topic: "HTML & CSS", progress: 42, lastReviewed: "1 day ago" },
    { topic: "React Fundamentals", progress: 25, lastReviewed: "4 days ago" }
  ];

  // Sample review schedule
  const reviewSchedule = [
    { topic: "JavaScript Loops", due: "Today", type: "Quiz" },
    { topic: "CSS Flexbox", due: "Tomorrow", type: "Practice" },
    { topic: "React Components", due: "In 2 days", type: "Quiz" }
  ];

  // Sample badges
  const badges = [
    { name: "First Quiz", earned: true, description: "Completed your first quiz" },
    { name: "One-Week Streak", earned: true, description: "7 days of consistent learning" },
    { name: "JavaScript Basics", earned: false, description: "Mastered JavaScript fundamentals" }
  ];

  // Sample leaderboard
  const leaderboard = [
    { rank: 1, name: "Onalerona", points: 2540, streak: 14 },
    { rank: 2, name: "Alex", points: 2320, streak: 9 },
    { rank: 3, name: "You", points: 2150, streak: 7 },
    { rank: 4, name: "Simphiwe", points: 1980, streak: 5 },
    { rank: 5, name: "Lebo", points: 1760, streak: 12 }
  ];

  // Sample study groups
  const studyGroups = [
    { name: "JavaScript Beginners", members: 24, topic: "JavaScript" },
    { name: "React Study Group", members: 18, topic: "React" },
    { name: "Web Dev Fundamentals", members: 32, topic: "HTML/CSS" }
  ];

  const handleQuizClick = () => {
    navigate("/quiz"); 
  };

  const handleTopicClick = (topic) => {
    console.log(`Selected topic: ${topic}`);
    // Navigate to topic page or open module
  };

  const handleJoinGroup = (groupName) => {
    console.log(`Joining group: ${groupName}`);
    // Implement join group functionality
  };

  return (
    <div className="dash-shell">
      <div className="phone-card">
        {/* Top bar */}
        <header className="topbar">
          <div className="user-info">
            <div className="avatar">
              <div className="owl-avatar">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13.5h2v7h-2v-7zm1 10.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor"/>
                </svg>
              </div>
              <span className="status" />
            </div>
            <div className="user-details">
              <h2 className="user-name">{userData.name}</h2>
              <p className="user-level">Level {userData.level}</p>
            </div>
          </div>
          <button className="icon-button points" aria-label="Points">
            <span className="points-count">{userData.points}</span>
            <span className="points-label">pts</span>
          </button>
        </header>

        {/* Points Progress */}
        <section className="points-card">
          <div className="points-progress">
            <div className="points-bar">
              <div 
                className="points-fill" 
                style={{ width: `${(userData.points / userData.nextLevelPoints) * 100}%` }}
              ></div>
            </div>
            <div className="points-details">
              <span className="points-current">{userData.points} points</span>
              <span className="points-next">Level {userData.level + 1} at {userData.nextLevelPoints} points</span>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="dashboard-tabs">
          <button 
            className={activeTab === "progress" ? "tab active" : "tab"} 
            onClick={() => setActiveTab("progress")}
          >
            Progress
          </button>
          <button 
            className={activeTab === "review" ? "tab active" : "tab"} 
            onClick={() => setActiveTab("review")}
          >
            Review
          </button>
          <button 
            className={activeTab === "social" ? "tab active" : "tab"} 
            onClick={() => setActiveTab("social")}
          >
            Social
          </button>
        </nav>

        {/* Content based on active tab */}
        {activeTab === "progress" && (
          <>
            {/* Daily streak & goal */}
            <section className="streak-goal-card">
              <div className="streak-section">
                <div className="flame-icon">🔥</div>
                <div className="streak-info">
                  <h3>{userData.streak} Day Streak!</h3>
                  <p>Keep learning to maintain your streak</p>
                </div>
              </div>
              <div className="goal-section">
                <div className="goal-info">
                  <h3>Daily Goal</h3>
                  <p>{userData.completedToday}/{userData.dailyGoal} mins</p>
                </div>
                <div className="goal-circle">
                  <div className="circle-progress">
                    <span>{Math.round((userData.completedToday / userData.dailyGoal) * 100)}%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Learning progress */}
            <section className="progress-card">
              <h3 className="section-title">Your Learning Progress</h3>
              <div className="progress-list">
                {progressData.map((item, index) => (
                  <div key={index} className="progress-item" onClick={() => handleTopicClick(item.topic)}>
                    <div className="progress-info">
                      <h4>{item.topic}</h4>
                      <p>Last reviewed: {item.lastReviewed}</p>
                    </div>
                    <div className="progress-visual">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-percent">{item.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Badges */}
            <section className="badges-card">
              <div className="section-header">
                <h3 className="section-title">Achievements</h3>
                <span className="view-all">View All</span>
              </div>
              <div className="badges-grid">
                {badges.map((badge, index) => (
                  <div key={index} className={badge.earned ? "badge earned" : "badge locked"}>
                    <div className="badge-icon">
                      {badge.earned ? "★" : "🔒"}
                    </div>
                    <div className="badge-info">
                      <h4>{badge.name}</h4>
                      <p>{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === "review" && (
          <>
            {/* Review schedule */}
            <section className="review-card">
              <h3 className="section-title">Upcoming Reviews</h3>
              <p className="section-subtitle">Based on your learning patterns</p>
              <div className="review-list">
                {reviewSchedule.map((item, index) => (
                  <div key={index} className="review-item">
                    <div className="review-info">
                      <h4>{item.topic}</h4>
                      <p>Due: {item.due} • {item.type}</p>
                    </div>
                    <button className="review-btn">Start</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommendations */}
            <section className="recommendations-card">
              <h3 className="section-title">Recommended Next</h3>
              <div className="recommendation-item">
                <div className="rec-info">
                  <h4>JavaScript Functions</h4>
                  <p>Based on your progress with JavaScript Basics</p>
                </div>
                <button className="rec-btn" onClick={handleQuizClick}>Start Learning</button>
              </div>
            </section>
          </>
        )}

        {activeTab === "social" && (
          <>
            {/* Leaderboard */}
            <section className="leaderboard-card">
              <div className="section-header">
                <h3 className="section-title">Leaderboard</h3>
                <span className="view-all">View All</span>
              </div>
              <div className="leaderboard-list">
                {leaderboard.map((user, index) => (
                  <div key={index} className={user.name === "You" ? "leaderboard-item you" : "leaderboard-item"}>
                    <span className="rank">{user.rank}</span>
                    <span className="user">{user.name}</span>
                    <span className="points">{user.points} pts</span>
                    <span className="streak">🔥 {user.streak}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Study Groups */}
            <section className="groups-card">
              <div className="section-header">
                <h3 className="section-title">Study Groups</h3>
                <span className="view-all">View All</span>
              </div>
              <div className="groups-list">
                {studyGroups.map((group, index) => (
                  <div key={index} className="group-item">
                    <div className="group-info">
                      <h4>{group.name}</h4>
                      <p>{group.topic} • {group.members} members</p>
                    </div>
                    <button 
                      className="join-btn"
                      onClick={() => handleJoinGroup(group.name)}
                    >
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Quick Actions */}
        <section className="actions-card">
          <button className="action-btn primary" onClick={handleQuizClick}>
            <span className="action-icon">✏️</span>
            <span>Take a Quiz</span>
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📚</span>
            <span>Study Now</span>
          </button>
        </section>
      </div>
    </div>
  );
}