
import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";

function AddTransactionForm({ onAddTransaction }) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { date, description, category, amount: parseFloat(amount) };
    onAddTransaction(newTransaction);
    // Clear form fields after submission
    setDate("");
    setDescription("");
    setCategory("");
    setAmount("");
  };

  return (
    <div className="ui segment">
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fluid
            placeholder="Date"
          />
          <Form.Field
            control={Input}
            label="Description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fluid
            placeholder="Description"
          />
          <Form.Field
            control={Input}
            label="Category"
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fluid
            placeholder="Category"
          />
          <Form.Field
            control={Input}
            label="Amount"
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fluid
            placeholder="Amount"
            step="0.01"
          />
          <Form.Field>
            <Button color="blue" type="submit">
              Add Transaction
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AddTransactionForm;
