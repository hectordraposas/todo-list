import React from "react";

const ListItemComponent = ({
  search,
  tempSearchData = [],
  todoOutput = [],
  calcTime,
  handleIsDone,
  handlePostEdit,
  handleDelete,
  editID,
}) => {
  return (
    <>
      {todoOutput.length === 0 && (
        <span className="text-blue-400">
          No todos loaded from LocalStorage please add one.
        </span>
      )}
      <ul>
        {(search.length > 0 ? tempSearchData : todoOutput).map((item, i) => (
          <li
            key={item.id}
            className={`flex justify-between flex-col ${
              i % 2 === 0
                ? " bg-white/80 text-green-500"
                : "bg-white/50 text-green-600"
            } border-2 border-white/10 p-0.5  m-1 cursor-pointer first:mt-2`}
          >
            <span>{calcTime(item.id)}</span>
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
              </span>
            </span>
            <hr className="border-t border-slate-50 my-2 w-full mx-auto" />
            <span className="flex items-center justify-end">
              <button
                onClick={() => handlePostEdit(item.id, item.todo)}
                className="bg-blue-400 text-slate-50 p-1  md:w-30 w-full h-8 cursor-pointer"
              >
                {editID === item.id ? "Cancel" : "Edit"}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-slate-50 p-1 md:w-30 w-full h-8 cursor-pointer"
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListItemComponent;
