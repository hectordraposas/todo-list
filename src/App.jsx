import { useEffect, useRef, useState } from "react";
import NavigationComponent from "./components/navigation/NavigationComponent";
import ListItemComponent from "./components/navigation/ListItemComponent";
import InputTodosComponent from "./components/navigation/InputTodosComponent";
import RemainingStorageComponent from "./components/navigation/RemainingStorageComponent";
import AppInfoComponent from "./components/navigation/AppInfoComponent";

const tempData = [{ todo: "hellow", id: 1752778472650, done: false }];

function App() {
  //states
  const inputRef = useRef(null);
  const [todos, setTodos] = useState("");
  const [editID, setEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [lastKey, setLasKey] = useState(null);
  const [search, setSearch] = useState("");
  const [tempSearchData, setTempSearchData] = useState([]);
  const [todoOutput, setTodoOutput] = useState(() => {
    const storedValue = localStorage.getItem("todos");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  //calculates the date
  const calcTime = (time) => {
    const today = Date.now();

    const diffTime = today - time;

    const seconds = Math.floor(diffTime / 1000);
    const minutes = Math.floor(diffTime / (1000 * 60));
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;

    return "Just Now";
  };

  //this handle the enter key listener

  useEffect(() => {
    const handleKey = (e) => {
      setLasKey(e.key);
      if (e.key === "Enter") {
        handleAdd(todos);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [todos]);

  //this handles the total todos the localstorage can store
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
  //handling the edit
  //post edit because there is so much happening when clicking the edit button
  //update the ui button name checking if where editing or adding
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
  //handling error
  const handleError = (error = "", color = "text-red-500") => {
    setMessage(error);
    setMessageColor(color);

    setTimeout(() => setMessage(""), 2000);
  };
  //this handle that add todos
  const handleAdd = (addTodo) => {
    const newId = Date.now();
    if (!isEditing) {
      if (!todos) return handleError("Please enter todos first to save");
      else
        setTodoOutput([
          { todo: addTodo, id: newId, done: false },
          ...todoOutput,
        ]);
      setTodos("");
      inputRef.current.focus();
      handleError("Successfully saved!", "text-blue-500");
    } else {
      if (todos) {
        const editItem = todoOutput.map((item) =>
          item.id === editID ? { ...item, todo: todos } : item
        );

        setTodoOutput(editItem);
        setTempSearchData(editItem);
        setEditId(null);
        setTodos("");
        setIsEditing((editState) => !editState);
        handleError("Successfully updated", "text-green-600");
      } else {
        handleError(
          "Please dont update todo with empty string.",
          "text-red-500"
        );
      }
    }
  };
  //this handles the checkbox
  //if the user want to make the todo done or not
  //simple compairing using filter
  const handleIsDone = (id) => {
    const updateIsDone = todoOutput.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );

    const updateTempIsDone = tempSearchData.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );

    setTodoOutput(updateIsDone);
    setTempSearchData(updateTempIsDone);
  };
  //handling deletion
  // first creating a alert confirm button
  // asking the user to delete the data
  //then if yes  then delete happen
  // updating the ui
  //set all the state to their default state
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
        handleError("Item successfully deleted");
      } else {
        setTodos("");
        setIsEditing(false);
        inputRef.current.focus();
        setTodoOutput(itemDelete);
        handleError("Item successfully deleted");
      }
    } else {
      console.log("Not Deleted");
    }
  };
  // searching todos
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchData = todoOutput.filter((item) =>
      item.todo.toLowerCase().includes(search.toLowerCase())
    );

    setTempSearchData(searchData);
  };
  return (
    <>
      <NavigationComponent handleSearch={handleSearch} search={search} />
      <hr className="border-t border-gray-200 my-1 md:w-8/12 mx-auto" />

      <div className="w-full md:w-8/12 h-full mx-auto p-2 bg-white/30">
        <RemainingStorageComponent remaining={remaining} />
        <div className="w-full">
          <InputTodosComponent
            inputRef={inputRef}
            todos={todos}
            setTodos={setTodos}
            message={message}
            messageColor={messageColor}
            handleAdd={handleAdd}
            isEditing={isEditing}
          />

          <ListItemComponent
            handleSearch={handleSearch}
            search={search}
            tempSearchData={tempSearchData}
            todoOutput={todoOutput}
            calcTime={calcTime}
            handleIsDone={handleIsDone}
            handlePostEdit={handlePostEdit}
            handleDelete={handleDelete}
            editID={editID}
          />
        </div>
      </div>
      <hr className="border-t border-slate-50 my-1 md:w-8/12 mx-auto" />
      <AppInfoComponent />
    </>
  );
}

export default App;
