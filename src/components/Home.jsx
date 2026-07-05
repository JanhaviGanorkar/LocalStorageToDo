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
        const taskToAdd = {
          ...newTask,
          category: newTask.category.trim() || "Uncategorized",
          completed: false
        };
        setTodo([...todo, taskToAdd]);
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
    const titleText = task.title ? task.title.toLowerCase() : "";
    const taskText = task.task ? task.task.toLowerCase() : "";
    const search = searchTerm.toLowerCase();

    const matchesSearch = titleText.includes(search) || taskText.includes(search);
    const matchesFilter = filter === "All" || task.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    // min-h-[100vh] और bg-black सेट है, टेक्स्ट हमेशा व्हाइट रहेगा
    <div className="w-full min-h-[100vh] flex items-center bg-black justify-center px-4 relative overflow-hidden text-white">
      
      {/* 🔮 बैकग्राउंड एनिमेटेड गोला */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500 opacity-25 blur-[120px] animate-[bounce_6s_infinite_alternate] z-0 pointer-events-none"></div>

      {/* 📦 मुख्य डार्क ग्लास कार्ड */}
      <div className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl border border-gray-800 bg-gray-950/75 backdrop-blur-md z-10">
        
        {/* हेडर (बटन हटा दिया है) */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-500/20 pb-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">To-Do Dashboard</h1>
        </div>

        {/* सर्च और फ़िल्टर */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <input
            className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900/90 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-sm"
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900/90 text-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-sm cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Uncategorized">Uncategorized</option>
          </select>
        </div>

        {/* टास्क लिस्ट */}
        <ul className="max-h-[320px] overflow-y-auto space-y-3 pr-1 scrollbar-thin">
          {filteredAndSearchedTasks.length === 0 ? (
            <p className="text-center text-sm text-gray-400 my-4">No tasks found. Add some!</p>
          ) : (
            filteredAndSearchedTasks.map((item, index) => (
              <li key={index} className={`p-4 border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all bg-gray-900/60 border-gray-800 ${item.completed ? "opacity-40 line-through" : ""}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.priority === "High" ? "bg-red-500/20 text-red-500" : item.priority === "Medium" ? "bg-yellow-500/20 text-yellow-500" : "bg-green-500/20 text-green-500"}`}>
                      {item.priority}
                    </span>
                    {item.category && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-1 text-gray-300">{item.task}</p>
                  <p className="text-gray-400 text-xs mt-1.5">📅 Due: {item.dueDate || "No due date"}</p>
                </div>
                
                {/* एक्शन बटन्स */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-0 pt-2 sm:pt-0 border-gray-500/10">
                  <button
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg text-white transition-all ${item.completed ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
                    onClick={() => toggleComplete(index)}
                  >
                    {item.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    className="px-3 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all"
                    onClick={() => startEditing(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* नया टास्क जोड़ने का फॉर्म */}
        {isAdding && (
          <div className="mt-6 p-5 border border-gray-700 bg-gray-900/90 rounded-xl space-y-4 transition-all">
            <h4 className="text-md font-bold border-b border-gray-500/10 pb-1">{isEditing !== null ? '✏️ Edit Task' : '➕ Add New Task'}</h4>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              className="w-full px-4 py-2 rounded-xl border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm h-20 resize-none"
              placeholder="Task Description"
              value={newTask.task}
              onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
              <input
                className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
              <input
                className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                type="text"
                placeholder="Category (e.g. Work)"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                className="px-4 py-2 bg-pink-500 text-white font-medium text-sm rounded-xl hover:bg-pink-600 transition-all shadow-sm"
                onClick={saveTask}
              >
                {isEditing !== null ? 'Update Task' : 'Save Task'}
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-white font-medium text-sm rounded-xl hover:bg-gray-600 transition-all"
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

        {/* टास्क जोड़ने का बटन */}
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="mt-6 w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-base rounded-xl transition-all shadow-md"
          >
            🚀 Add New Task
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;