import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { meetingsAPI } from '../../services/api';
import './MeetingSummary.css';

const MeetingSummary = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeetingData();
  }, [meetingId]);

  const fetchMeetingData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch meeting details and summary
      const [meetingResponse, summaryResponse] = await Promise.all([
        meetingsAPI.getMeeting(meetingId),
        meetingsAPI.getSummary(meetingId)
      ]);

      if (meetingResponse.success) {
        setMeeting(meetingResponse.data);
      }

      if (summaryResponse.success) {
        setSummary(summaryResponse.data);
      } else {
        setError(summaryResponse.error || 'Summary not available');
      }
    } catch (err) {
      console.error('Error fetching meeting data:', err);
      setError(err.response?.data?.error || 'Failed to load meeting summary');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="meeting-summary-container">
        <div className="summary-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading summary...</p>
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="meeting-summary-container">
        <button className="summary-back-btn" onClick={() => navigate('/meetings')}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Meetings
        </button>
        <div className="summary-error">
          <svg className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="error-title">Summary Not Available</h3>
          <p className="error-description">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="meeting-summary-container">
      <div className="summary-header">
        <button className="summary-back-btn" onClick={() => navigate('/meetings')}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Meetings
        </button>

        <h1 className="summary-meeting-title">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {meeting?.title || 'Meeting Summary'}
        </h1>

        {meeting && (
          <div className="summary-meeting-meta">
            <div className="summary-meta-item">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(meeting.start_time)}
            </div>
            {meeting.attendees && (
              <div className="summary-meta-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {meeting.attendees.length} attendees
              </div>
            )}
          </div>
        )}
      </div>

      <div className="summary-content">
        <div className="summary-main">
          {/* Overview */}
          <div className="summary-card">
            <h2 className="summary-card-title">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Summary
            </h2>
            <p className="summary-overview">{summary.summary}</p>
          </div>

          {/* Key Points */}
          {summary.key_points && summary.key_points.length > 0 && (
            <div className="summary-card">
              <h2 className="summary-card-title">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Key Points
              </h2>
              <ul className="summary-list">
                {summary.key_points.map((point, index) => (
                  <li key={index} className="summary-list-item">{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Decisions Made */}
          {summary.decisions_made && summary.decisions_made.length > 0 && (
            <div className="summary-card">
              <h2 className="summary-card-title">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Decisions Made
              </h2>
              <ul className="summary-list">
                {summary.decisions_made.map((decision, index) => (
                  <li key={index} className="summary-list-item">{decision}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Items */}
          {summary.action_items && summary.action_items.length > 0 && (
            <div className="summary-card">
              <h2 className="summary-card-title">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Action Items ({summary.action_items.length})
              </h2>
              {summary.action_items.map((item, index) => (
                <div key={index} className="action-item-card">
                  <div className="action-item-header">
                    <div className="action-item-description">{item.description}</div>
                    <span className={`action-item-priority priority-${item.priority || 'medium'}`}>
                      {item.priority || 'medium'}
                    </span>
                  </div>
                  <div className="action-item-meta">
                    {item.assigned_to && (
                      <div className="action-item-meta-item">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {item.assigned_to}
                      </div>
                    )}
                    {item.deadline && (
                      <div className="action-item-meta-item">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {item.deadline}
                      </div>
                    )}
                  </div>
                  {item.context && (
                    <div className="action-item-context">{item.context}</div>
                  )}
                </div>
              ))}
              <a href={`/tasks?source_type=meeting&meeting_id=${meetingId}`} className="tasks-link">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                View Created Tasks
              </a>
            </div>
          )}

          {/* Topics Discussed */}
          {summary.topics_discussed && summary.topics_discussed.length > 0 && (
            <div className="summary-card">
              <h2 className="summary-card-title">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Topics Discussed
              </h2>
              <ul className="summary-list">
                {summary.topics_discussed.map((topic, index) => (
                  <li key={index} className="summary-list-item">{topic}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="summary-sidebar">
          {/* Participants */}
          {summary.participants_mentioned && summary.participants_mentioned.length > 0 && (
            <div className="summary-card">
              <h2 className="summary-card-title">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Participants Mentioned
              </h2>
              <div>
                {summary.participants_mentioned.map((participant, index) => (
                  <span key={index} className="participant-tag">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {participant}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Next Meeting */}
          {summary.next_meeting && summary.next_meeting.suggested_date && (
            <div className="summary-card">
              <h2 className="summary-card-title">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Next Meeting
              </h2>
              <div className="next-meeting-info">
                <div className="next-meeting-date">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {summary.next_meeting.suggested_date}
                </div>
                {summary.next_meeting.topics && summary.next_meeting.topics.length > 0 && (
                  <ul className="next-meeting-topics">
                    {summary.next_meeting.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="summary-card">
            <h2 className="summary-card-title">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h2>
            <button
              className="tasks-link"
              onClick={() => navigate(`/meetings/${meetingId}/transcript`)}
              style={{ marginTop: 0, width: '100%', justifyContent: 'center' }}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Full Transcript
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSummary;
