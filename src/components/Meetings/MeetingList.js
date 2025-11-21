import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { meetingsAPI } from '../../services/api';
import { useToast } from '../ui/Toast';
import MeetingCard from './MeetingCard';
import './MeetingList.css';

const MeetingList = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [meetings, setMeetings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    page: 1,
    per_page: 10
  });
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchMeetings();
    fetchStats();
  }, [filters]);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await meetingsAPI.getMeetings(filters);
      
      if (response.success) {
        setMeetings(response.data.meetings);
        setPagination(response.data.pagination);
      } else {
        setError(response.error || 'Failed to fetch meetings');
      }
    } catch (err) {
      console.error('Error fetching meetings:', err);
      setError(err.response?.data?.error || 'Failed to fetch meetings');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await meetingsAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      const response = await meetingsAPI.syncMeetings();
      
      if (response.success) {
        // Show success message
        toast.success(`Synced ${response.data.new_meetings} new meetings!`);
        // Refresh the list
        fetchMeetings();
        fetchStats();
      } else {
        toast.error(response.error || 'Failed to sync meetings');
      }
    } catch (err) {
      console.error('Error syncing meetings:', err);
      toast.error(err.response?.data?.error || 'Failed to sync meetings');
    } finally {
      setSyncing(false);
    }
  };

  const handleProcess = async (meetingId) => {
    try {
      const response = await meetingsAPI.processMeeting(meetingId);
      
      if (response.success) {
        toast.info('Meeting processing started. This may take a few minutes.');
        // Refresh the meeting list
        fetchMeetings();
      } else {
        toast.error(response.error || 'Failed to process meeting');
      }
    } catch (err) {
      console.error('Error processing meeting:', err);
      toast.error(err.response?.data?.error || 'Failed to process meeting');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleViewTranscript = (meetingId) => {
    navigate(`/meetings/${meetingId}/transcript`);
  };

  const handleViewSummary = (meetingId) => {
    navigate(`/meetings/${meetingId}/summary`);
  };

  return (
    <div className="meeting-list-container">
      <div className="meeting-list-header">
        <h1 className="meeting-list-title">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Meetings
        </h1>
        <p className="meeting-list-subtitle">
          AI-powered meeting summaries and action items from your Google Meet recordings
        </p>
      </div>

      {stats && (
        <div className="meeting-stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Total Meetings</span>
              <svg className="stat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="stat-card-value">{stats.total}</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Completed</span>
              <svg className="stat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-card-value">{stats.completed}</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Processing</span>
              <svg className="stat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="stat-card-value">{stats.processing}</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">Pending</span>
              <svg className="stat-card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-card-value">{stats.pending}</div>
          </div>
        </div>
      )}

      <div className="meeting-list-controls">
        <div className="meeting-filters">
          <select 
            className="filter-select"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>

          <select 
            className="filter-select"
            value={filters.per_page}
            onChange={(e) => handleFilterChange('per_page', parseInt(e.target.value))}
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        <div className="meeting-actions">
          <button 
            className={`sync-btn ${syncing ? 'syncing' : ''}`}
            onClick={handleSync}
            disabled={syncing}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {syncing ? 'Syncing...' : 'Sync Meetings'}
          </button>
        </div>
      </div>

      <div className="meeting-list-content">
        {loading ? (
          <div className="meeting-list-loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading meetings...</p>
          </div>
        ) : error ? (
          <div className="meeting-list-error">
            <svg className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="error-title">Error Loading Meetings</h3>
            <p className="error-description">{error}</p>
          </div>
        ) : meetings.length === 0 ? (
          <div className="meeting-list-empty">
            <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h2 className="empty-title">No Meetings Found</h2>
            <p className="empty-description">
              {filters.status 
                ? `No ${filters.status} meetings found. Try adjusting your filters.`
                : 'Sync your Google Calendar to see your past meetings with recordings.'}
            </p>
            {!filters.status && (
              <button className="empty-action" onClick={handleSync}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Sync Meetings Now
              </button>
            )}
          </div>
        ) : (
          <>
            {meetings.map(meeting => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onViewTranscript={handleViewTranscript}
                onViewSummary={handleViewSummary}
                onProcess={handleProcess}
              />
            ))}

            {pagination && pagination.pages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <span className="pagination-info">
                  Page {filters.page} of {pagination.pages}
                </span>
                
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === pagination.pages}
                >
                  Next
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MeetingList;
