import React, { useState, useEffect } from "react";
import { Plus, Trash2, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask, createTask, optimisticUpdateTaskStatus } from '../../store/slices/tasksSlice';
import { useToast } from './Toast';
import { format } from 'date-fns';
import { FiMail, FiUser, FiCalendar, FiClock, FiAlertCircle } from 'react-icons/fi';

export const KanbanBoard = ({ tasks = [], loading = false, onTaskUpdated, onTaskDeleted }) => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);

  // Convert tasks to cards format when tasks change
  useEffect(() => {
    const formattedCards = tasks.map(task => ({
      id: task.id?.toString() || Math.random().toString(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline,
      assigned_by: task.assigned_by,
      created_from_email: task.created_from_email,
      sender_email: task.sender_email, // Add sender email
      email_id: task.email_id, // Add email ID
      source_type: task.source_type, // Add source type
      created_at: task.created_at,
      column: task.status || 'pending', // Map status to column
      originalTask: task
    }));
    setCards(formattedCards);
  }, [tasks]);

  // Handle card updates - sync with Redux
  const handleCardsUpdate = async (updatedCards) => {
    setCards(updatedCards);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-dark-textSecondary text-sm">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-dark-bg text-dark-text">
      <Board 
        cards={cards} 
        setCards={handleCardsUpdate}
        onTaskUpdated={onTaskUpdated}
        onTaskDeleted={onTaskDeleted}
      />
    </div>
  );
};

const Board = ({ cards, setCards, onTaskUpdated, onTaskDeleted }) => {
  const dispatch = useDispatch();

  const handleStatusChange = async (cardId, newColumn) => {
    // Find the card to get the original task ID
    const card = cards.find(c => c.id === cardId);
    if (card && card.originalTask) {
      // Optimistic update - UI already updated by drag and drop
      // Just update backend in the background without blocking UI
      try {
        await dispatch(updateTask({ 
          taskId: card.originalTask.id, 
          taskData: { status: newColumn } 
        })).unwrap();
        // Success - UI is already showing the new state
        // DON'T call onTaskUpdated() here - it triggers a refetch with loading state
      } catch (error) {
        console.error('Error updating task status:', error);
        // On error, we could revert the UI change, but for now just log
        // The next fetch will sync the correct state
      }
    }
  };

  return (
    <div className="flex h-full w-full gap-3 p-4 sm:p-8">
      <Column
        title="Pending"
        column="pending"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
        onStatusChange={handleStatusChange}
        onTaskDeleted={onTaskDeleted}
      />
      <Column
        title="In Progress"
        column="in_progress"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
        onStatusChange={handleStatusChange}
        onTaskDeleted={onTaskDeleted}
      />
      <Column
        title="Completed"
        column="completed"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
        onStatusChange={handleStatusChange}
        onTaskDeleted={onTaskDeleted}
      />
      <BurnBarrel setCards={setCards} onTaskDeleted={onTaskDeleted} />
    </div>
  );
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  onStatusChange,
  onTaskDeleted
}) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      
      // Update the column
      const oldColumn = cardToTransfer.column;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
      
      // Only call status change if column actually changed
      if (oldColumn !== column && onStatusChange) {
        onStatusChange(cardId, column);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="${column}"]`)
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="flex-1 min-w-[280px]">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors rounded-xl ${
          active ? "bg-dark-card/50 border-2 border-primary-500" : "bg-dark-card/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} onTaskDeleted={onTaskDeleted} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Card = ({ 
  title, 
  id, 
  column, 
  description,
  priority,
  deadline,
  assigned_by,
  created_from_email,
  sender_email,
  email_id,
  source_type,
  created_at,
  originalTask,
  handleDragStart,
  onTaskDeleted
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-orange-500';
      case 'low':
        return 'border-l-4 border-l-green-500';
      default:
        return 'border-l-4 border-l-gray-500';
    }
  };

  const getPriorityTextColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-orange-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        if (originalTask) {
          await dispatch(deleteTask(originalTask.id)).unwrap();
          toast.success('Task deleted successfully');
          if (onTaskDeleted) onTaskDeleted();
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        toast.error('Failed to delete task');
      }
    }
  };

  const isOverdue = deadline && new Date(deadline) < new Date() && column !== 'completed';

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        className={`cursor-grab rounded-lg border border-dark-border bg-dark-card p-3 active:cursor-grabbing mb-3 hover:shadow-dark-lg transition-all group ${getPriorityColor(priority)}`}
      >
        <div
          draggable="true"
          onDragStart={(e) =>
            handleDragStart(e, { title, id, column, description, priority, deadline, assigned_by, created_from_email, sender_email, email_id, source_type, created_at, originalTask })
          }
        >
          {/* Header with title and delete button */}
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-semibold text-dark-text flex-1">{title}</p>
            <button
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 p-1 text-dark-textSecondary hover:text-red-400 transition-all duration-200 rounded hover:bg-red-500 hover:bg-opacity-10"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Priority Badge */}
          {priority && (
            <div className="mb-2">
              <span className={`text-xs font-medium ${getPriorityTextColor(priority)} uppercase tracking-wide`}>
                {priority}
              </span>
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-xs text-dark-textSecondary mb-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Metadata */}
          <div className="space-y-1.5 mt-3">
            {deadline && (
              <div className={`flex items-center space-x-2 text-xs ${
                isOverdue ? 'text-red-400' : 'text-dark-textSecondary'
              }`}>
                {isOverdue ? <FiAlertCircle size={12} /> : <FiCalendar size={12} />}
                <span className="text-xs">
                  {isOverdue && 'Overdue: '}
                  {format(new Date(deadline), 'MMM dd, yyyy')}
                </span>
              </div>
            )}
            
            {/* Show sender email if task is from email */}
            {source_type === 'email' && sender_email && (
              <div className="flex items-center space-x-2 text-xs text-blue-400 bg-blue-500 bg-opacity-10 px-2 py-1 rounded">
                <FiMail size={12} />
                <span className="truncate text-xs font-medium">
                  From: {sender_email}
                </span>
              </div>
            )}
            
            {assigned_by && (
              <div className="flex items-center space-x-2 text-xs text-dark-textSecondary">
                <FiUser size={12} />
                <span className="truncate text-xs">
                  {assigned_by.name || assigned_by.email}
                </span>
              </div>
            )}
          </div>

          {/* Overdue Badge */}
          {isOverdue && (
            <div className="mt-2 px-2 py-1 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded">
              <p className="text-red-400 text-xs font-semibold flex items-center space-x-1">
                <FiAlertCircle size={10} />
                <span>Overdue</span>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-primary-500 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards, onTaskDeleted }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = async (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    // Find the card to get original task
    setCards((pv) => {
      const card = pv.find(c => c.id === cardId);
      if (card && card.originalTask) {
        // Delete from backend
        dispatch(deleteTask(card.originalTask.id))
          .unwrap()
          .then(() => {
            toast.success('Task deleted successfully');
            if (onTaskDeleted) onTaskDeleted();
          })
          .catch((error) => {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task');
          });
      }
      return pv.filter((c) => c.id !== cardId);
    });

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-40 shrink-0 place-content-center rounded-xl border-2 text-3xl transition-all ${
        active
          ? "border-red-500 bg-red-500/20 text-red-400"
          : "border-dark-border bg-dark-card/20 text-dark-textSecondary"
      }`}
    >
      {active ? (
        <Flame className="animate-bounce" size={32} />
      ) : (
        <Trash2 size={32} />
      )}
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    try {
      // Create task via Redux
      const result = await dispatch(createTask({
        title: text.trim(),
        description: '',
        status: column,
        priority: 'medium'
      })).unwrap();

      // Add to local cards state
      const newCard = {
        column,
        title: text.trim(),
        id: result.id?.toString() || Math.random().toString(),
        description: result.description || '',
        priority: result.priority || 'medium',
        deadline: result.deadline,
        assigned_by: result.assigned_by,
        created_from_email: result.created_from_email,
        created_at: result.created_at,
        originalTask: result
      };

      setCards((pv) => [...pv, newCard]);
      setText("");
      setAdding(false);
      toast.success('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded-lg border border-primary-500 bg-primary-500/10 p-3 text-sm text-dark-text placeholder-primary-300 focus:outline-0 focus:ring-2 focus:ring-primary-500"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              type="button"
              className="px-3 py-1.5 text-xs text-dark-textSecondary transition-colors hover:text-dark-text"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-primary-500 px-3 py-1.5 text-xs text-white transition-colors hover:bg-primary-600"
            >
              <span>Add</span>
              <Plus size={16} />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-dark-textSecondary transition-colors hover:text-dark-text"
        >
          <span>Add card</span>
          <Plus size={16} />
        </motion.button>
      )}
    </>
  );
};

export default KanbanBoard;
