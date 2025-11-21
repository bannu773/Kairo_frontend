import React from 'react';
import './MeetingCard.css';

const MeetingCard = ({ meeting, onViewDetails, onViewTranscript, onViewSummary, onProcess }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'processing':
        return (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'pending':
        return (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'failed':
        return (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const attendees = meeting.attendees || [];
  const displayAttendees = attendees.slice(0, 3);
  const remainingCount = attendees.length - 3;

  return (
    <div className="meeting-card">
      <div className="meeting-card-header">
        <div>
          <h3 className="meeting-card-title">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {meeting.title || 'Untitled Meeting'}
          </h3>
          <div className="meeting-card-date">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(meeting.start_time)}
          </div>
        </div>
        <span className={`meeting-status-badge status-${meeting.processing_status || 'pending'}`}>
          {getStatusIcon(meeting.processing_status)}
          {meeting.processing_status || 'pending'}
        </span>
      </div>

      <div className="meeting-card-content">
        {meeting.description && (
          <p className="meeting-description">{meeting.description}</p>
        )}

        {attendees.length > 0 && (
          <div className="meeting-attendees">
            <span className="meeting-attendees-label">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {attendees.length} {attendees.length === 1 ? 'Attendee' : 'Attendees'}
            </span>
            <div className="attendee-avatars">
              {displayAttendees.map((attendee, index) => (
                <div 
                  key={index} 
                  className="attendee-avatar"
                  title={attendee.name || attendee.email}
                >
                  {getInitials(attendee.name || attendee.email)}
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="attendee-count">+{remainingCount}</div>
              )}
            </div>
          </div>
        )}

        {meeting.meet_link && (
          <a 
            href={meeting.meet_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="meeting-link"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Join Meeting
          </a>
        )}

        {meeting.error_message && (
          <div className="error-message">
            {meeting.error_message}
          </div>
        )}
      </div>

      <div className="meeting-card-footer">
        <div className="meeting-stats">
          <div className="meeting-stat">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date(meeting.end_time).getTime() - new Date(meeting.start_time).getTime() > 0 
              ? `${Math.round((new Date(meeting.end_time) - new Date(meeting.start_time)) / 60000)} min`
              : 'Duration unknown'}
          </div>
          {meeting.processing_status === 'completed' && (
            <div className="meeting-stat">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="meeting-stat-value">AI Processed</span>
            </div>
          )}
        </div>

        <div className="meeting-card-actions">
          {meeting.processing_status === 'pending' && (
            <button 
              className="meeting-action-btn btn-primary"
              onClick={() => onProcess(meeting.id)}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Process
            </button>
          )}
          
          {meeting.processing_status === 'completed' && (
            <>
              <button 
                className="meeting-action-btn btn-secondary"
                onClick={() => onViewTranscript(meeting.id)}
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Transcript
              </button>
              <button 
                className="meeting-action-btn btn-primary"
                onClick={() => onViewSummary(meeting.id)}
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Summary
              </button>
            </>
          )}
          
          {meeting.processing_status === 'processing' && (
            <button className="meeting-action-btn btn-secondary btn-disabled">
              <svg className="animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Processing...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
