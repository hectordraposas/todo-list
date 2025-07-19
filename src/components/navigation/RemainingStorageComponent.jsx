import React from "react";

const RemainingStorageComponent = ({ remaining }) => {
  return (
    <div className="flex justify-between">
      <p className="text-slate-50 mb-2">Todo Name</p>
      <p className="text-slate-50">
        Remaining Storage : {remaining.toFixed(0)}%
      </p>
    </div>
  );
};

export default RemainingStorageComponent;
