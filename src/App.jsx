import { useEffect, useRef, useState } from "react";

function App() {
  const inputRef = useRef(null);
  const [todos, setTodos] = useState("");
  const [editID, setEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [tempOutput, setTempOutput] = useState([]);
  const [search, setSearch] = useState("");
  const [todoOutput, setTodoOutput] = useState(() => {
    const storedValue = localStorage.getItem("todos");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  const calcTime = (time) => {
    const today = Date.now();

    const diffTime = today - time;

    const seconds = Math.floor(diffTime / 1000);
    const minutes = Math.floor(diffTime / (1000 * 60));
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;

    return "Just Now";
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoOutput));
    const totalSize = 4_885_000;
    const remName = todoOutput.map((t) => t.todo).join("").length;
    const remId = todoOutput.map((t) => t.id).join("").length;

    const total = remName + remId;

    setRemaining(((totalSize - total) / totalSize) * 100);
  }, [todoOutput]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handlePostEdit = (id, todoName) => {
    if (editID === id) {
      inputRef.current.focus();
      setEditId(null);
      setTodos("");
      setIsEditing(false);
    } else {
      inputRef.current.focus();
      setIsEditing(true);
      setEditId(id);
      setTodos(todoName);
    }
  };

  const handleAdd = (addTodo) => {
    const newId = Date.now();
    if (!isEditing) {
      if (!todos) alert("Please enter todo");
      else
        setTodoOutput([
          { todo: addTodo, id: newId, done: false },
          ...todoOutput,
        ]);
      setTodos("");
      inputRef.current.focus();
    } else {
      if (todos) {
        const editItem = todoOutput.map((item) =>
          item.id === editID ? { ...item, todo: todos } : item
        );

        setTodoOutput(editItem);
        setEditId(null);
        setTodos("");
        setIsEditing((editState) => !editState);
      } else {
        alert("Please dont update todo with empty string.");
      }
    }
  };

  const handleIsDone = (id) => {
    const updateIsDone = todoOutput.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );

    setTodoOutput(updateIsDone);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "are you sure you want to delete this data?"
    );
    if (confirm) {
      const itemDelete = todoOutput.filter((item) => item.id !== id);
      if (editID) {
        setTodoOutput(itemDelete);
        setEditId(null);
        setTodos("");
        setIsEditing(false);
        inputRef.current.focus();
      } else {
        inputRef.current.focus();
        setTodoOutput(itemDelete);
      }
    } else {
      console.log("Not Deleted");
    }
  };
  return (
    <>
      <div className="justify-between w-full md:w-8/12 h-full bg-white/30 text-slate-50 mx-auto p-5 rounded-t-md flex">
        <figure className="cursor-pointer">
          Todo List - Hector Dela Cruz Raposas
        </figure>
      </div>
      <hr className="border-t border-gray-200 my-1 md:w-8/12 mx-auto" />
      <div className="w-full md:w-8/12 h-full mx-auto p-2 bg-white/30">
        <div className="flex justify-between">
          <p className="text-slate-50 mb-2">Todo Name</p>
          <p className="text-slate-50">
            Remaining Storage : {remaining.toFixed(0)}%
          </p>
        </div>
        <div className="w-full">
          <input
            ref={inputRef}
            type="text"
            name=""
            placeholder="Enter todos..."
            className="border-2 border-amber-600 rounded-sm w-full p-2 text-slate-50"
            value={todos}
            onChange={(e) => setTodos(e.target.value)}
          />
          <div className="relative w-full h-12">
            <button
              onClick={() => handleAdd(todos)}
              className="text-green-500 bg-white/50 w-50 p-2 rounded-2xl cursor-pointer right-1 mt-2 absolute"
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>

          <ul>
            {todoOutput.map((item, i) => (
              <li
                key={item.id}
                className={`flex justify-between flex-col ${
                  i % 2 === 0
                    ? " bg-white/80 text-green-500"
                    : "bg-white/50 text-green-600"
                } border-2 border-white/10 p-0.5  m-1 cursor-pointer first:mt-2`}
              >
                <span className="flex items-center">
                  <span className="mr-2.5 flex items-center">
                    <input
                      type="checkbox"
                      value={item.done}
                      onChange={() => handleIsDone(item.id)}
                      checked={item.done}
                    />
                  </span>
                  {/* //for content span side by side to creat time and date*/}
                  <span className="flex justify-between w-full">
                    <span
                      className={`${
                        item.done
                          ? "line-through font-semibold decoration-red-500"
                          : ""
                      }`}
                      onClick={() => handleIsDone(item.id)}
                    >
                      <span>{item.todo}</span>
                    </span>
                    <span>{calcTime(item.id)}</span>
                  </span>
                </span>
                <hr className="border-t border-slate-50 my-2 w-full mx-auto" />
                <span className="flex items-center justify-end">
                  <button
                    onClick={() => handlePostEdit(item.id, item.todo)}
                    className="bg-blue-400 text-slate-50 p-1  md:w-30 w-full h-8"
                  >
                    {editID === item.id ? "Cancel" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-slate-50 p-1 md:w-30 w-full h-8"
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr className="border-t border-slate-50 my-1 md:w-8/12 mx-auto" />
      <div className="w-full md:w-8/12 mx-auto p-2 text-slate-50 bg-white/30 rounded-b-md mb-5">
        <ul>
          <li>
            <div>
              👍This app is created using React Library + Vite, with help of
              differrent React hooks like useState, useEffect and useRef.
            </div>
          </li>
          <li>
            <div>👍Add, Edit and Deletion in the app.</div>
          </li>
          <li>
            <div>👍Track multiple states over the app.</div>
          </li>
          <li>
            <div>👍Localstorage for storing todos.</div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
