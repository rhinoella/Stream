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
  rpcUrl: 'https://sepolia.infura.io/v3/'
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
  chains: [testnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})


const App = () => {
  const [activePage, setActivePage] = useState(<CompanyPage/>);

  return (
    <div className="App">
      <header className="App-header">
        <div className="nav-buttons">
        <button onClick={() => setActivePage(<CompanyPage/>)}>Company</button>
        <button onClick={() => setActivePage(<BankPage/>)}>Bank</button>
        <button onClick={() => setActivePage(<AuditPage/>)}>Audit</button>
        <button onClick={() => setActivePage(<ProofPage/>)}>Zk Proofs</button>
        </div>
        <div className="spacer"></div>
        <div id="logo-group"><img src={"/streamIcon.png"} height={50} width={50}></img><p id="logo">stream</p></div>
        <div className="spacer"></div>
        <div className="link-wallet-btn-container">
          <w3m-button />
       </div>
      </header>
      {activePage}
    </div>
  );
};

export default App;
