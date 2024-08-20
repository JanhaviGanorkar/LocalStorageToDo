import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
const Home = () => {
  
  const [todo, setTodo] = useState(() => {
    const savedTodo = localStorage.getItem('todoList');
    return savedTodo ? JSON.parse(savedTodo) : [];
  });

  const [newTask, setNewTask] = useState({ title: "", task: "", priority: "Medium", dueDate: "", category: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todo));
  }, [todo]);

  const saveTask = () => {
    if (newTask.title && newTask.task) {
      if (isEditing !== null) {
        const updatedTodo = todo.map((item, index) =>
          index === isEditing ? newTask : item
        );
        setTodo(updatedTodo);
        setIsEditing(null);
      } else {
        setTodo([...todo, { ...newTask, completed: false }]);
      }
      setNewTask({ title: "", task: "", priority: "Medium", dueDate: "", category: "" });
      setIsAdding(false);
    }
  };

  const deleteTask = (indexToDelete) => {
    const newTodo = todo.filter((_, index) => index !== indexToDelete);
    setTodo(newTodo);
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setNewTask(todo[index]);
    setIsAdding(true);
  };

  const toggleComplete = (index) => {
    const updatedTodo = todo.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodo(updatedTodo);
  };

  const filteredAndSearchedTasks = todo.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || task.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col items-center`}>
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">To-Do List</h1>
          <button
            className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="mb-4">
          <input
            className="w-full p-2 rounded mb-2 focus:outline-none bg-gray-600"
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full p-2 rounded focus:outline-none bg-gray-600"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option className='bg-gray-600' value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <ul>
          {filteredAndSearchedTasks.map((item, index) => (
            <li key={index} className={`mb-4 p-4 bg-gray-700 rounded flex justify-between items-center transition-all ${item.completed ? "opacity-50" : ""}`}>
              <div>
                <h3 className="text-xl font-semibold">{item.title} ({item.priority})</h3>
                <p className="text-gray-300">{item.task}</p>
                <p className="text-gray-400 text-sm">Due: {item.dueDate || "No due date"}</p>
                <p className="text-gray-400 text-sm">Category: {item.category || "Uncategorized"}</p>
              </div>
              <div className="flex items-center">
                <button
                  className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => toggleComplete(index)}
                >
                  {item.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => startEditing(index)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {isAdding && (
          <div className="mt-6">
            <input
              className="mb-3 p-2 w-full bg-gray-700 rounded focus:outline-none"
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              className="mb-3 p-2 w-full bg-gray-700 rounded focus:outline-none"
              placeholder="Description"
              value={newTask.task}
              onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            />
            <select
              className="mb-3 p-2 w-full bg-gray-700 rounded focus:outline-none"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <input
              className="mb-3 p-2 w-full bg-gray-700 rounded focus:outline-none"
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <input
              className="mb-3 p-2 w-full bg-gray-700 rounded focus:outline-none"
              type="text"
              placeholder="Category"
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={saveTask}
              >
                {isEditing !== null ? 'Update Task' : 'Save Task'}
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(null);
                  setNewTask({ title: "", task: "", priority: "Medium", dueDate: "", category: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!isAdding && (
          <button
            className="mt-6 w-full px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700"
            onClick={() => setIsAdding(true)}
          >
            Add Task
          </button>
        )}
      </div>
      <Button>fwewfe</Button>
    </div>
  );

};

export default Home;
