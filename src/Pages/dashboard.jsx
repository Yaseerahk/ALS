import React from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom"; 

export default function Dashboard() {
// progress %
  const percent = 70;
  const navigate = useNavigate(); 
  //leads to quiz page 
  const handleQuizClick = () => {
    navigate("/quiz"); 
  };

  return (
    <div className="dash-shell">
      <div className="phone-card">
        {/* Top bar */}
        <header className="topbar">
          <div className="avatar">
            <span className="status" />
          </div>
          <h1 className="brand">ALS</h1>
          {/* bell icon */}
          <button className="icon-button bell" aria-label="Notifications">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M12 2a6 6 0 0 0-6 6v2.3c0 .7-.26 1.38-.73 1.9L3.7 15a1 1 0 0 0 .77 1.66h15.06a1 1 0 0 0 .77-1.66l-1.57-1.8a2.7 2.7 0 0 1-.73-1.9V8a6 6 0 0 0-6-6Z" fill="currentColor"/>
              <path d="M9.5 19a2.5 2.5 0 0 0 5 0" fill="currentColor"/>
            </svg>
            <span className="ping" /> {/* notification ping */}
          </button>
        </header>

        {/* Progress card + learning status */}
        <section className="card progress-card glass">
          <div className="row between">
            <div>
              <p className="eyebrow">Currently learning</p>
              <h2 className="title">JavaScript Basics</h2>
            </div>
            <span className="pill">{percent}%</span> {/* progress percent */}
          </div>

          <div className="progress">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
            <div className="progress-thumb" style={{ left: `${percent}%` }} />
          </div>

          <div className="row between sub">
            <span className="chip streak">🔥 7-day streak</span>
            <span className="hint">Nice pace—keep going!</span>
          </div>
        </section>

        {/* Badges */}
        <section className="card">
          <h3 className="section-title">Badges</h3>
          <div className="badges">
            <div className="badge earned">
              <div className="badge-icon check">
                <svg viewBox="0 0 24 24" width="26" height="26">

                  {/* tick */}
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>First Quiz</span>
              <small>Completed</small>
            </div>

            <div className="badge earned">
              <div className="badge-icon star">
                <svg viewBox="0 0 24 24" width="26" height="26">

                  {/* star */}
                  <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.8 6.2 20.8l1.1-6.4L2.6 9.8l6.5-.9L12 3z" fill="currentColor"/>
                </svg>
              </div>
              <span>One-Week Streak</span>
              <small>Unlocked</small>
            </div>

            <div className="badge locked">
              <div className="badge-icon lock">
                <svg viewBox="0 0 24 24" width="26" height="26">
                  {/* lock */}
                  <path d="M17 9h-1V7a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-6 7a1 1 0 1 1 2 0v1h-2v-1Zm3-7H10V7a2 2 0 1 1 4 0v2Z" fill="currentColor"/>
                </svg>
              </div>
              <span>MVP Learner</span>
              <small>Finish 3 modules</small>
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section className="card glass next-card">
          <h3 className="section-title">Next Steps</h3>
          <p className="next-copy">
            You mastered loops—try <strong>JavaScript Functions</strong> next!
          </p>
          <div className="cta">
            <button className="btn primary" onClick={handleQuizClick}>Quiz Me</button>
            {/* study plan button(activate+make functional) */}
            <button className="btn ghost">Study Plan</button>
          </div>
        </section>
      </div>
    </div>
  );
}
