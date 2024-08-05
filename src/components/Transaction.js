import React from "react";
import { Button } from "semantic-ui-react"; 

function Transaction({ transaction, onDelete }) {
  const { id, date, description, category, amount } = transaction;

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>${amount.toFixed(2)}</td> 
      <td>
        <Button color="red" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default Transaction;


