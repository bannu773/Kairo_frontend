import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, logout as logoutAction } from '../../store/slices/authSlice';
import { fetchTasks, syncEmails as syncEmailsAction, updateTask as updateTaskAction, setFilter, optimisticUpdateTaskStatus } from '../../store/slices/tasksSlice';
import { useToast } from '../ui/Toast';
import KanbanBoard from '../ui/kanban';
import TaskForm from '../TaskForm/TaskForm';
import { FiLogOut, FiRefreshCw, FiPlus, FiMenu, FiSearch, FiBell, FiSettings, FiVideo } from 'react-icons/fi';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  
  // Redux state
  const { user } = useSelector((state) => state.auth);
  const { tasks, loading, syncing, filter } = useSelector((state) => state.tasks);
  
  // Local state
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasks({
      status: filter.status,
      priority: filter.priority
    }));
  }, [dispatch, filter]);

  const handleSyncEmails = async () => {
    try {
      const result = await dispatch(syncEmailsAction()).unwrap();
      toast.success(`Sync completed! ${result.new_tasks_created} new tasks created.`);
      dispatch(fetchTasks({
        status: filter.status,
        priority: filter.priority
      }));
    } catch (error) {
      console.error('Error syncing emails:', error);
      toast.error('Error syncing emails. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutAction()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      navigate('/login');
    }
  };

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    dispatch(fetchTasks({
      status: filter.status,
      priority: filter.priority
    }));
  };

  // No need to refetch on update - Redux store is already updated optimistically
  const handleTaskUpdated = () => {
    // Do nothing - the optimistic update already handled it
    // Only refetch if you need to sync other data or on error
  };

  const handleTaskDeleted = () => {
    // Refetch to ensure list is updated after deletion
    dispatch(fetchTasks({
      status: filter.status,
      priority: filter.priority
    }));
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    // Optimistic update - update UI immediately
    dispatch(optimisticUpdateTaskStatus({ taskId, status: newStatus }));
    
    // Then update backend in the background
    try {
      await dispatch(updateTaskAction({ taskId, taskData: { status: newStatus } })).unwrap();
    } catch (error) {
      console.error('Error updating task status:', error);
      // Optionally: revert the optimistic update or show error
      // For now, we'll just refresh to get the correct state
      dispatch(fetchTasks({
        status: filter.status,
        priority: filter.priority
      }));
    }
  };

  const getStatistics = () => {
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    
    return { total, pending, inProgress, completed };
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = getStatistics();

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-dark-text text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Modern Header */}
      <header className="bg-dark-card border-b border-dark-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-[2100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-dark-text hover:text-primary-400 transition-colors p-2"
              >
                <FiMenu size={24} />
              </button>
              <div 
                onClick={() => navigate('/')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <h1 className="text-xl sm:text-2xl font-bold text-dark-text bg-gradient-to-r from-teal-400 via-green-400 to-purple-500 bg-clip-text text-transparent">
                  Kairo
                </h1>
                <p className="text-xs text-dark-textSecondary hidden sm:block">AI that Converts Conversations into Workflows</p>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-textSecondary" size={20} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-dark-text placeholder-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => navigate('/meetings')}
                className="p-2 sm:px-4 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg sm:rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <FiVideo size={18} />
                <span className="hidden sm:inline text-sm font-medium">Meetings</span>
              </button>
              
              <button
                onClick={handleSyncEmails}
                disabled={syncing}
                className="p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white rounded-lg sm:rounded-xl transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <FiRefreshCw className={syncing ? 'animate-spin' : ''} size={18} />
                <span className="hidden sm:inline text-sm font-medium">{syncing ? 'Syncing...' : 'Sync'}</span>
              </button>
              
              <button className="p-2 text-dark-textSecondary hover:text-dark-text transition-colors hidden sm:block">
                <FiBell size={20} />
              </button>

              <div className="flex items-center space-x-3 pl-3 border-l border-dark-border">
                {user.picture && (
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-teal-500 ring-offset-2 ring-offset-dark-card"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center space-x-2 text-dark-textSecondary hover:text-red-400 transition-colors"
                >
                  <FiLogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="sm:hidden p-2 text-dark-textSecondary hover:text-red-400 transition-colors"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-textSecondary" size={18} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-dark-text placeholder-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[2100px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Statistics Cards - Compact Version */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-dark-card rounded-lg p-3 sm:p-4 border border-dark-border hover:border-blue-500/50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-textSecondary text-xs font-medium mb-0.5">Total</p>
                <p className="text-xl sm:text-2xl font-bold text-dark-text">{stats.total}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-dark-card rounded-lg p-3 sm:p-4 border border-dark-border hover:border-yellow-500/50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-textSecondary text-xs font-medium mb-0.5">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-dark-card rounded-lg p-3 sm:p-4 border border-dark-border hover:border-blue-400/50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-textSecondary text-xs font-medium mb-0.5">In Progress</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-400">{stats.inProgress}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-dark-card rounded-lg p-3 sm:p-4 border border-dark-border hover:border-green-500/50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-textSecondary text-xs font-medium mb-0.5">Completed</p>
                <p className="text-xl sm:text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              value={filter.status}
              onChange={(e) => dispatch(setFilter({ status: e.target.value }))}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-teal-500/50 transition-all"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={filter.priority}
              onChange={(e) => dispatch(setFilter({ priority: e.target.value }))}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-teal-500/50 transition-all"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowTaskForm(true)}
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200"
          >
            <FiPlus size={18} />
            <span>Create Task</span>
          </button>
        </div>

        {/* Kanban Board */}
        <KanbanBoard
          tasks={searchQuery ? filteredTasks : tasks}
          loading={loading}
          onTaskDeleted={handleTaskDeleted}
        />
      </main>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
    </div>
  );
}

export default Dashboard;
