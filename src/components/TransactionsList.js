import React, { useState } from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, onDelete }) {
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const factor = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "description") {
      return factor * a.description.localeCompare(b.description);
    } else if (sortBy === "category") {
      return factor * a.category.localeCompare(b.category);
    } else {
      // Default sorting by date
      return factor * (new Date(a.date) - new Date(b.date));
    }
  });

  return (
    <table className="ui celled striped padded table">
      <thead>
        <tr>
          <th>
            <button className="ui basic button" onClick={() => handleSort("date")}>
              Date
            </button>
          </th>
          <th>
            <button className="ui basic button" onClick={() => handleSort("description")}>
              Description
            </button>
          </th>
          <th>
            <button className="ui basic button" onClick={() => handleSort("category")}>
              Category
            </button>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Actions</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedTransactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;


