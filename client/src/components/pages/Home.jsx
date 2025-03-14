import React from "react";
import './Home.css'
import { Navbar } from "../Navbar";


export const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='gradient-bg-welcome'>
      <div className="text-center Home">
        <h1 className="text-white">Welcome to the world of Blockchain</h1>
        <br />
        <div className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officia
          corporis at cum sint placeat quasi voluptatibus! Officia molestiae
          tenetur at distinctio, earum, saepe beatae debitis cupiditate nulla
          nisi laborum doloribus corrupti unde totam minima id, a praesentium
          explicabo aspernatur.
        </div>
      </div>
    </div>
    </>
  );
};
