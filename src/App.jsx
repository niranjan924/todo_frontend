import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch all todos when app loads
  useEffect(() => {
    axios
      .get("https://api-todo-backend-lhs7.onrender.com/api/todos") // <-- backend runs on 5000
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post("https://api-todo-backend-lhs7.onrender.com/api/todos", { text });
      setTodos([...todos, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://api-todo-backend-lhs7.onrender.com/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📝 MERN Todo App
        </h1>

        {/* Input + Button */}
        <div className="flex items-center gap-2 mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTodo}
            className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition duration-200"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <span className="text-gray-700 font-medium">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="ml-4 text-red-500 hover:text-red-700 transition"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks yet 🚀</p>
        )}
      </div>
    </div>
  );
}

export default App;
