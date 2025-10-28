
import React, { useState } from "react";

function TodoList() {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (input.trim() !== "") {
            setTodos([...todos, input.trim()]);
            setInput("");
        }
    };

    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_: string, i: number) => i !== index));
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder="Add a todo"
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map((todo: string, idx: number) => (
                    <li key={idx}>
                        {todo} <button onClick={() => deleteTodo(idx)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;