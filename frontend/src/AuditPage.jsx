// AuditPage.jsx
import React, { useState, useEffect } from 'react';

const fetchAuditTransactions = async () => {
  return [
    { id: 1, timestamp: new Date().toLocaleString(), hash: '193641913704, 34197310491730', payments: [{ employee: 'Employee1', hash: '9137496143678, 1379464314791' }, { employee: 'Employee2', hash: '1903473926, 1974396438' }] },
  ];
};

const AuditPage = () => {
  const [auditTransactions, setAuditTransactions] = useState([]);

  useEffect(() => {
    const loadAuditTransactions = async () => {
      const fetchedTransactions = await fetchAuditTransactions();
      setAuditTransactions(fetchedTransactions);
    };
    
    loadAuditTransactions();
  }, []);

  // Dummy status, in real app you would have logic to verify the integrity
  const integrityStatus = "Verified";

  return (
    <div className="audit-page-container">
      <div className="total-balance">
        <h2>Total Committed Balance: {8913463823589441}</h2>
      </div>

      <div className="integrity-status">
        <h3>Integrity: {integrityStatus}</h3>
      </div>

      <div className="transactions">
        <h3>Transactions:</h3>
        {auditTransactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <h4>Transaction #{transaction.id} [Date: {transaction.timestamp}] Pedersen Commit: 1930437817273, 834686146193</h4>
            {transaction.payments.map((payment, index) => (
              <div key={index} className="transaction-details">
                <p>{payment.employee} Pedersen Commit: {payment.hash}</p>
              </div>
            ))}
            <hr className="transaction-separator" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditPage;
