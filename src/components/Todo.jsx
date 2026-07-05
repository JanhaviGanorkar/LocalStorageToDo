import React, {useEffect, useState} from 'react';

import { Button } from './ui/button';
const Home () => {

    const [todo, setTodo] = useState(() => { 
        const savedTodo = localStorage.getItem('todoList')
        return savedTodo ? JSON.parse(savedTodo) : [];

    });

    const [newTask, setNewTask] = useState();
    const [isAdding, seIsAdding] = useState();
    const [searchTerm, setSearchTerm] = useState(null);
    const [filter, setFillter] = useState("All");
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
    

}
