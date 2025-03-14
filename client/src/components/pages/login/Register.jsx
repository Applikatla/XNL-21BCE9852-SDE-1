import React, { useState } from "react";

import { NavLink } from "react-router-dom";
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    name={name}
    onChange={handleChange}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Register = () => {
  const [Form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { email, password } = Form;
      console.log(Form);  
      const body = { email, password };
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gradient-bg-welcome"> 

    <div className="flex items-center justify-center min-h-screen">
      <div className="p-5 sm:w-96 w-full blue-glassmorphism flex flex-col">
        <h2 className="text-center text-white text-xl font-semibold mb-4">
          Register
        </h2>

        <Input
          placeholder="Email"
          name="email"
          type="text"
          value={Form.email}
          handleChange={handleChange}
          />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={Form.password}
          handleChange={handleChange}
          />

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full text-white"
          >
          Register
        </button>
        <div className="flex justify-center">
            <div className="text-white flex gap-1">
              Already Registerd?
              <div>
                <NavLink className={"text-blue-600/100"} to={"/login"}>Login</NavLink>
              </div>
            </div>
          </div>
      </div>
    </div>
            </div>
  );
};

export default Register;
