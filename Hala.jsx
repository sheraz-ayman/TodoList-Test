import React, { useState, useEffect } from "react";
import ToDoForm from "./ToDoForm";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Todo from "./Todo";
import EditToDo from "./EditToDo";

const ToDoFunc = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('https://localhost:7262/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (todo) => {
        try {
            const response = await axios.post('https://localhost:7262/api/todos', todo);
            setTodos([...todos, response.data]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const markDone = async (id) => {
        try {
            await axios.put(`https://localhost:7262/api/todos${id}`, todos.find(todo => todo.id === id));
            setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        } catch (error) {
            console.error('Error marking todo as done:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`https://localhost:7262/api/todos/${id}`);
            const newTodos = todos.filter(todo => todo.id !== id);
            setTodos(newTodos);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    const editTask = async (task, id) => {
        try {
            await axios.put(`https://localhost:7262/api/todos/${id}`, { ...todos.find(todo => todo.id === id), task });
            setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };


    return (
        <div className='ToDoCover'>
            <h1>✨ To-Do List ✨</h1>
            <ToDoForm addTodo={addTodo} />
            {Array.isArray(todos) && todos.map(todo => todo.isEditing ? (
                <EditToDo
                    key={todo.id}
                    editTodo={editTask}
                    task={todo}
                />
            ) : (
                <Todo
                    task={todo}
                    key={todo.id}
                    markDone={markDone}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
            ))}
        </div>
    );
};

export default ToDoFunc;
