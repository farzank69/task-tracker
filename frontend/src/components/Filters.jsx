const Filters = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onFilterChange({ ...filters, priority: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sortBy: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({ status: '', priority: '', sortBy: '' });
  };

  const hasActiveFilters = filters.status || filters.priority || filters.sortBy;

  return (
    <div className="bg-white border border-gray-200 rounded p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">Filter tasks</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-950 cursor-pointer transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="statusFilter" className="block text-xs font-medium text-gray-600 mb-1.5">
            Status
          </label>
          <select
            id="statusFilter"
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 focus:border-transparent transition-colors"
          >
            <option value="">All status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="priorityFilter" className="block text-xs font-medium text-gray-600 mb-1.5">
            Priority
          </label>
          <select
            id="priorityFilter"
            value={filters.priority}
            onChange={handlePriorityChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 focus:border-transparent transition-colors"
          >
            <option value="">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortBy" className="block text-xs font-medium text-gray-600 mb-1.5">
            Sort by
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 focus:border-transparent transition-colors"
          >
            <option value="">Newest first</option>
            <option value="dueDate">Due date</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;