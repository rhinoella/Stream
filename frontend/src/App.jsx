// App.jsx
import React, { useState } from 'react';
import CompanyPage from './CompanyPage';
import BankPage from './BankPage';
import AuditPage from './AuditPage';
import ProofPage from './ProofPage';
import './App.css';

const App = () => {
  const [activePage, setActivePage] = useState(<CompanyPage/>);

  return (
    <div className="App">
      <header className="App-header">
        <div className="nav-buttons">
        <button onClick={() => setActivePage(<CompanyPage/>)}>Company</button>
        <button onClick={() => setActivePage(<BankPage/>)}>Bank</button>
        <button onClick={() => setActivePage(<AuditPage/>)}>Audit</button>
        <button onClick={() => setActivePage(<ProofPage/>)}>Zk Proof</button>
        </div>
        <div className="link-wallet-btn-container">
          <button className="link-wallet-btn">Link a Wallet</button>
       </div>
      </header>
      {activePage}
    </div>
  );
};

export default App;
