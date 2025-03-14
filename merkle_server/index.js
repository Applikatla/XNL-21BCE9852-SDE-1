import axios from "axios";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = 8001;

app.use(cors());
app.use(express.json());

const yourAlchemyAPIKey = process.env.API_KEY;
const url = `https://eth-holesky.g.alchemy.com/v2/${yourAlchemyAPIKey}`;

let blockNum = "0x4D2";  // Initially null
let transactionHashes = null;
let MerkleTreeData = null;

const fetchTransactionHashes = async () => {
  if (!blockNum) {
    console.error("Error: blockNum is not set.");
    return;
  }

  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getBlockByNumber',
    params: [blockNum, false]  // Use the updated blockNum
  };

  try {
    const response = await axios.post(url, payload);
    transactionHashes = response.data.result.transactions;
    console.log('Transaction hashes in block:', transactionHashes);
  } catch (error) {
    console.error("Error fetching transaction hashes:", error);
  }
};

app.get('/getsingletransaction', async (req, res) => {
  await fetchTransactionHashes();
  if (transactionHashes && transactionHashes.length) {
    let i = Math.floor(Math.random() * transactionHashes.length);
    res.json({ transaction: transactionHashes[i] });
  } else {
    res.status(500).json({ error: "No transactions found" });
  }
});

app.get('/alltransactions', async (req, res) => {
  await fetchTransactionHashes();
  if (transactionHashes) {
    res.json({ transactions: transactionHashes });
  } else {
    res.status(500).json({ error: "No transactions found" });
  }
});

app.get('/merkle', async (req, res) => {
  if (MerkleTreeData) {
    res.json({ root: MerkleTreeData.root, tree: MerkleTreeData.tree });
  } else {
    res.status(500).json({ error: "Merkle tree data not available" });
  }
});

app.post('/mint', async (req, res) => {
  await fetchTransactionHashes();
  if (!transactionHashes) {
    res.status(500).json({ error: "No transactions found" });
    return;
  }

  const address = req.body.transactions;
  console.log("Address:", address);

  const leaves = transactionHashes.map(tx => keccak256(tx));
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const claimingAddress = keccak256(address);
  const hexProof = merkleTree.getHexProof(claimingAddress);
  const rootHash = merkleTree.getRoot();
  const verifyProof = merkleTree.verify(hexProof, claimingAddress, rootHash);

  res.json({ proof: verifyProof, hex: hexProof, root: rootHash });

  MerkleTreeData = {
    root: rootHash.toString('hex'),
    tree: merkleTree
  };
});

app.post('/getBlock', async (req, res) => {
  const { block } = req.body;
  blockNum = `0x${parseInt(block).toString(16)}`;
  await fetchTransactionHashes();
  if (transactionHashes && transactionHashes.length) {
    let i = Math.floor(Math.random() * transactionHashes.length);
    res.json({block: blockNum, transaction: transactionHashes[i] });
  } else {
    res.status(500).json({ error: "No transactions found" });
  }
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
