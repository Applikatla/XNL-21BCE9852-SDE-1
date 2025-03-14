import React from "react";
import { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";
const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

export const Eth = () => {
  const {
    connectWallet,
    connectAccount,
    FormData,
    setFormData,
    handleChange,
    sendTransaction,
    AccountId,
    isLoading,
    Isconform,
    setIsconform
  } = useContext(TransactionContext);

  const handleSubmit = async (e) => {
    const { addressTo, amount, keyword, message } = FormData;

    console.log(FormData);

    e.preventDefault(); //to prevent rerendering while submit

    if (!addressTo || !amount || !keyword || !message) {
      return alert("Please fill the required fields");
    }
    // console.log(FormData);
    sendTransaction();
  };
  return (
    <div className="text-white flex w-full justify-center items-center gradient-bg-welcome p-7">
      <div className="flex md:flex-row flex-col items-start justify-between">
        <div className="flex flex-1 justify-start flex-col">
          <h1 className="text-3xl sm:text-5xl text-gradient">
            Send crypto <br /> accross the world
          </h1>
          <p className="text-left text-gradient mt-5 font-light md:w-9/12 w-11/12 py-12 text-base">
            Send and recieve crypto accross the world, this application made it
            easy
          </p>
          {!connectAccount && (
            <button
              onClick={connectWallet}
              className="blue-glassmorphism w-40 flex flex-row justify-center items-center my-5 hover:bg-[#2546bd]"
            >
              Connect Wallet
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliablity</div>
            <div className={`${commonStyles}`}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web3.0</div>
            <div className={`${commonStyles}`}>Low fee</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start  w-full md:mt-0 mt-10">
          <div className="p-5 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-4">
              <div className="flex justify-between item-start">
                {/* <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                      <span>Eth</span>
                  </div> */}
                <div>
                  <p>Address</p>
                  <p className="font-light tex-sm">{AccountId}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justift-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full"
              >
                click to send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
