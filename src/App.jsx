import { useEffect, useRef, useState } from "react";

const todoData = [
  { id: 1, todo: "Wake Up early" },
  { id: 2, todo: "Take Bath" },
  { id: 3, todo: "Goto Bus waiting area" },
];

function App() {
  const inputRef = useRef(null);
  const [todoOutput, setTodoOutput] = useState(todoData);
  const [todos, setTodos] = useState("");
  const [editID, setEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handlePostEdit = (id, todoName) => {
    if (editID === id) {
      setEditId(null);
      setTodos("");
      setIsEditing(!isEditing);
    } else {
      setIsEditing(!isEditing);
      setEditId(id);
      setTodos(todoName);
    }
  };

  const handleAdd = (addTodo) => {
    const newId = Date.now();
    if (!isEditing) {
      if (!todos) alert("Please enter todo");
      else setTodoOutput([...todoOutput, { todo: addTodo, id: newId }]);
      setTodos("");
      inputRef.current.focus();
    } else {
      const editItem = todoOutput.map((item) =>
        item.id === editID ? { ...item, todo: todos } : item
      );

      setTodoOutput(editItem);
      setEditId(null);
      setTodos("");
      setIsEditing(!isEditing);
    }
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "are you sure you want to delete this data?"
    );
    if (confirm) {
      const itemDelete = todoOutput.filter((item) => item.id !== id);

      setTodoOutput(itemDelete);
      console.log("Deleted");
    } else {
      console.log("Not Deleted");
    }
  };
  return (
    <>
      <div className="justify-between w-8/12 h-full bg-white/30 text-slate-50 mx-auto p-5 rounded-2xl mt-5 flex">
        <figure className="cursor-pointer">
          {" "}
          Todo List - Hector Dele Cruz Raposas
        </figure>
        <figure>
          <ul className="flex gap-2 cursor-pointer">
            <li>Profile</li>
            <li>Projects</li>
            <li>About</li>
          </ul>
        </figure>
      </div>
      <div className="w-11/12 md:w-8/12 h-full mx-auto mt-5 p-5 rounded-2xl bg-white/30">
        <p className="text-slate-50 mb-2">Todo Name</p>
        <div className="w-full">
          <input
            ref={inputRef}
            type="text"
            name=""
            id=""
            placeholder="Enter todos..."
            className="border-2 border-amber-600 rounded-2xl w-full p-2 text-slate-50"
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
            {todoOutput.map((item) => (
              <li
                key={item.id}
                className="flex justify-between bg-white/80 border-2 border-white/10 p-1 rounded-sm text-green-500 m-1 cursor-pointer first:mt-2"
              >
                <span className="flex items-center text-wrap">{item.todo}</span>
                <span className="flex gap-2 items-center">
                  <button
                    onClick={() => handlePostEdit(item.id, item.todo)}
                    className="bg-blue-400 text-slate-50 p-1 rounded-sm w-20 h-8"
                  >
                    {editID === item.id ? "Cancel" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-slate-50 p-1 rounded-sm w-20 h-8"
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-11/12 md:w-8/12 mx-auto p-5 text-slate-50 bg-white/30 rounded-2xl mt-2 mb-5">
        <ul>
          <li>
            <div>
              👍This app is created using React Library, using only useState,
              useEffect and useRef.
            </div>
          </li>
          <li>
            <div>👍You can do Add, Edit and Deletion in the app.</div>
          </li>
          <li>
            <div>👍This can track multiple states over the app.</div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
