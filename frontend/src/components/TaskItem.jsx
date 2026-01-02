const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Completed'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isOverdue = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return task.status === 'Pending' && dueDate < today;
  };

  return (
    <div className={`bg-white rounded shadow-md hover:shadow-lg transition-shadow p-5 border-l-4 ${
      task.status === 'Completed' ? 'border-green-500' : isOverdue() ? 'border-red-500' : 'border-blue-500'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold text-gray-800 mb-2 ${
            task.status === 'Completed' ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
          isOverdue() ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100 text-gray-700 border-gray-200'
        }`}>
          {formatDate(task.dueDate)}
          {isOverdue() && ' (Overdue)'}
        </span>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button
          onClick={() => onToggleStatus(task)}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium transition cursor-pointer ${
            task.status === 'Completed'
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {task.status === 'Completed' ? 'Mark Pending' : 'Mark Complete'}
        </button>
        
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 rounded text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
        >
          Edit
        </button>
        
        <button
          onClick={() => onDelete(task._id)}
          className="px-4 py-2 rounded text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 cursor-pointer transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
