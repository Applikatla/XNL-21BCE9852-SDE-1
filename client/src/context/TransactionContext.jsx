import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress, merkleABI, merkleContract } from "../utils/constants.js";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const TransactionContext = createContext();

const { ethereum } = window;
console.log(ethereum);
const getEthereumContract = () => {
  if (!ethereum) throw new Error("Ethereum object not found");
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};
const getEthereumMerkl = () => {
  if (!ethereum) throw new Error("Ethereum object not found");
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    merkleContract,
    merkleABI,
    signer
  );
  console.log(transactionContract);
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [Isconform, setIsconform] = useState();

  const [isLoading, setisLoading] = useState(false);

  const [connectAccount, setConnectAccount] = useState("");

  const [TransactionCount, setTransactionCount] = useState(
    localStorage.getItem("count")
  ); //we are storing the value in the localstorage to avoid value loss at the time of page reload

  const [AccountId, setAccountId] = useState("");

  const [THash, setTHash] = useState("");

  const [Root, setRoot] = useState();

  const [HexProof, setHexProof] = useState([]);

  const [TransactionHash, setTransactionHash] = useState("");

  const [ContractProof, setContractProof] = useState();


  const [FormData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setConnectAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
      setAccountId(accounts);
      console.log(accounts);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async (e) => {
    // e.preventDefault();
    try {
      if (!ethereum) return alert("Please install Metamask");

      const { addressTo, amount, keyword, message } = FormData; //after call sendTransaction in Eth.jsx form will fill and send to here

      // console.log(FormData);

      const transactionContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount); //to convert decimals into GWEI hex amount

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectAccount,
            to: addressTo,
            gas: "0x5208", //21000 GWEI
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setisLoading(true);
      // alert(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setisLoading(false);
      // alert(`Sucess - ${transactionHash.hash}`);
      toast.success(`Transaction conformed: ${transactionHash.hash}`, {
        position: 'top-right',
        autoClose: 5000,
      });
      try {
        const hash = await transactionHash.hash;
        const status = 'Sucess';
        const body = { addressTo, amount, keyword, message, hash, status };
        const response = await fetch("http://localhost:8000/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        console.log(response);
        setIsconform(true);
      } catch (error) {
        console.log(error);
      }
      setTHash(transactionHash);

      console.log(THash);

      setIsconform(false);

      const transactionsCount = await transactionContract.getTransactionCount();
    } catch (error) {
      console.log(error);
      toast.error('Transaction Failed', {
        position: 'top-right',
        autoClose: 5000,
      })
      const hash = "null";
        const status = 'Failed';
        const body = { addressTo, amount, keyword, message, transaction_hash: hash, status: status };
        const response = await fetch("http://localhost:8000/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
    }
  };
  const sendRoot = async (e) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const transactionContract = getEthereumMerkl();
      // const gasPrice = await provider.getGasPrice();
      // const rootBytes32 = ethers.utils.arrayify(Root);
      const tx = await transactionContract.setMerkleRoot(Root);
      const hash = await tx.hash;
      // alert("transaction hash: "+ hash);
      toast.success(`Transaction conformed: ${hash}`, {
        position: 'top-right',
        autoClose: 5000,
      });
      console.log(tx); 
      console.log(Root);
    } catch (error) {
      console.log(error);
      toast.error('Transaction Failed', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  }
  // const verify = async () => {
  //   try {
  //     if (!ethereum) return alert("Please install Metamask");
  //     const transactionContract = getEthereumMerkl();
  //     const proofByte32 = HexProof.map((proof) => ethers.utils.arrayify(proof));
  //     const transactionHashBytes32 = ethers.utils.arrayify(TransactionHash);
  //     const tx = await transactionContract.verifyTransaction(proofByte32, transactionHashBytes32);
  //     const data = await tx;
  //     setContractProof(data);
  //     console.log("data: " + data);
  //     console.log(TransactionHash);
  //     console.log(proofByte32);
  //     console.log(transactionHashBytes32);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectAccount,
        FormData,
        setFormData,
        handleChange,
        sendTransaction,
        AccountId,
        isLoading,
        Isconform,
        setIsconform,
        sendRoot,
        // verify,
        setRoot,
        sendRoot,
        setHexProof,
        setTransactionHash,
        ContractProof
      }}  
    >
      {children}
    </TransactionContext.Provider>
  );
};
