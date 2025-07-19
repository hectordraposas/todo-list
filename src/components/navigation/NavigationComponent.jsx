import React from "react";

const NavigationComponent = ({ handleSearch, search }) => {
  return (
    <div className="justify-between w-full md:w-8/12 h-full bg-white/30 text-slate-50 mx-auto p-2 rounded-t-md flex items-center">
      <figure className="cursor-pointer">Todo List</figure>
      <figure>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search here..."
          className="p-2"
        />
      </figure>
    </div>
  );
};

export default NavigationComponent;
