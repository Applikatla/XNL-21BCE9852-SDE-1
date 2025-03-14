import React from 'react';
import { NavLink } from 'react-router-dom';

const ClickToLog = () => {
  return (
    <div className="gradient-bg-welcome h-screen flex justify-center items-center">
      <div className="text-white flex gap-1 text-xl">
        Click to
        <NavLink className="text-blue-600" to="/login">Login</NavLink>
      </div>
    </div>
  );
}

export default ClickToLog;
