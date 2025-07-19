import React from "react";

const InputTodosComponent = ({
  inputRef,
  todos,
  setTodos,
  message,
  messageColor,
  handleAdd,
  isEditing,
}) => {
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        name=""
        placeholder="Enter todos..."
        className="border-2 border-amber-600 rounded-sm w-full p-2 text-slate-50"
        value={todos}
        onChange={(e) => setTodos(e.target.value)}
      />
      <div className="flex justify-between relative w-full pt-2">
        <span className={messageColor}>{message}</span>
        <button
          onClick={() => handleAdd(todos)}
          className="text-green-500 bg-white/50 w-50 p-1 rounded-2xl cursor-pointer h-10"
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </div>
    </>
  );
};

export default InputTodosComponent;
