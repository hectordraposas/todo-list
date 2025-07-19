import React from "react";

const AppInfoComponent = () => {
  return (
    <div className="w-full md:w-8/12 mx-auto p-2 text-slate-50 bg-white/30 rounded-b-md mb-5">
      <ul>
        <li>
          <div>👍This app is created using React Library + Vite.</div>
        </li>
        <li>
          <div>👍Use react hooks like useState, useEffect and useRef.</div>
        </li>
        <li>
          <div>👍Add, Update, Deletion and Search in the app.</div>
        </li>
        <li>
          <div>👍Track multiple states over the app.</div>
        </li>
        <li>
          <div>👍Localstorage for storing todos.</div>
        </li>
        <li>
          <div>👍Date and date computation.</div>
        </li>
      </ul>
    </div>
  );
};

export default AppInfoComponent;
