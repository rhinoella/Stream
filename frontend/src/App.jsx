// App.jsx
import React, { useState } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import CompanyPage from './CompanyPage';
import BankPage from './BankPage';
import AuditPage from './AuditPage';
import ProofPage from './ProofPage';
import './App.css';

// 1. Get projectId
const projectId = 'dac81c2220eeaf06d3861337202036a7'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const testnet = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'SepoliaETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'wss://ethereum-sepolia-rpc.publicnode.com'
}

const etherLink = {
  chainId: 128123,
  name: 'Etherlink Testnet',
  currency: 'XTZ',
  explorerUrl: 'https://testnet-explorer.etherlink.com/',
  rpcUrl: 'https://node.ghostnet.etherlink.com'
}

const flare = {
  chainId: 114,
  name: 'Flare Testnet Coston2',
  currency: 'C2FLR',
  explorerUrl: 'https://coston2-explorer.flare.network/',
  rpcUrl: 'https://coston2-api.flare.network/ext/C/rpc'
}

// 3. Create modal
const metadata = {
  name: 'Stream',
  description: 'Streamline your cashflows with Stream',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [testnet, etherLink, flare],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const App = () => {
  const [activePage, setActivePage] = useState(<CompanyPage/>);
  const [employees, setEmployees] = useState([]);

  const handleEmployeesChanged = (employees) => {
    setEmployees(employees);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="nav-buttons">
        <button onClick={() => setActivePage(<CompanyPage/>)}>Company</button>
        <button onClick={() => setActivePage(<BankPage/>)}>Bank</button>
        <button onClick={() => setActivePage(<AuditPage/>)}>Audit</button>
        <button onClick={() => setActivePage(<ProofPage/>)}>Zk Proof</button>
        </div>
        <div className="spacer"></div>
        <div id="logo-group"><img src={"/streamIcon.png"} height={50} width={50}></img><p id="logo">stream</p></div>
        <div className="spacer"></div>
        <div className="link-wallet-btn-container">
          <w3m-button />
       </div>
      </header>
      {activePage}
      <div>
        Deployed at:
        <br></br>
        Etherlink contract address: 0xd1d98d4056f9bef513e3665e9a7e936cb42cfd34
        <br></br>
        Flare contract address: 0x2296768e004acf7e77ba2f9f33077c33ff3572e7
        <br></br>
        Sepolia contract address: 0xd69ccf7056421e46e76cdb9e6073620c07fb2df2
      </div>
    </div>
  );
};

export default App;
