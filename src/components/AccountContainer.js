import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        setFilteredTransactions(data);
      });
  }, []);

  const handleAddTransaction = (newTransaction) => {
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(response => response.json())
    .then(data => {
      // Update transactions state to include the new transaction
      setTransactions([...transactions, data]);
      // Update filteredTransactions state to include the new transaction if it matches search term
      if (data.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        setFilteredTransactions([...filteredTransactions, data]);
      }
    });
  };

  const handleDeleteTransaction = (id) => {
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      // Remove the transaction from transactions state
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);
      // Remove the transaction from filteredTransactions state if it matches
      setFilteredTransactions(filteredTransactions.filter(transaction => transaction.id !== id));
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const filtered = transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionsList 
        transactions={filteredTransactions} 
        onDelete={handleDeleteTransaction} 
      />
    </div>
  );
}

export default AccountContainer;
