import {useState, useEffect} from 'react'
import { NotepadText } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import Filters from './components/Filters.jsx';
import { getTasks, createTask, updateTask, deleteTask } from './services/api.js';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: ''
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await getTasks(filters);
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      toast.success('Task created successfully!');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to create task: ' + error.message);
      throw error;
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      toast.success('Task updated successfully!');
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task: ' + error.message);
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task: ' + error.message);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    
    try {
      await updateTask(task._id, { ...task, status: newStatus });
      toast.success(`Task marked as ${newStatus}!`);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task status: ' + error.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };
  return (
      <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-3xl font-semibold text-gray-900 tracking-tight"> <NotepadText size={30} /> Task Tracker</h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <div>
                <p className="text-3xl font-semibold text-gray-900">{tasks.length}</p>
                <p className="text-sm text-gray-500 mt-0.5">Total</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-emerald-600">
                  {tasks.filter(t => t.status === 'Completed').length}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">Done</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-amber-600">
                  {tasks.filter(t => t.status === 'Pending').length}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <TaskForm 
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            editingTask={editingTask}
            onCancel={handleCancelEdit}
          />
        </div>

        <div className="mb-6">
          <Filters 
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        <TaskList 
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
          isLoading={isLoading}
        />
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">Built with React, Node.js & MongoDB</p>
        </div>
      </footer>
    </div>
  )
}

export default App