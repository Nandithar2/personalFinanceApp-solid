import { createSignal } from 'solid-js';

type Transaction = {
  amount: number;
  date: string;
  category: string;
};

const App = () => {
  const [transactions, setTransactions] = createSignal<Transaction[]>([]);

  const addTransaction = async (amount: number, date: string, category: string) => {
    const res = await fetch("/transactions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount, date, category }),
    });
    const newTransaction = await res.json();
    setTransactions([...transactions(), newTransaction]);
  };

  const fetchTransactions = async () => {
    const response = await fetch("/transactions");
    const data = await response.json();
    setTransactions(data);
  };

  fetchTransactions();
  
  return (
    <main>
      <form id="transaction-form" onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        const amount = Number(data.get("amount"));
        const date = data.get("date")?.toString() || "";
        const category = data.get("category")?.toString() || "";
        addTransaction(amount, date, category);
        form.reset();
      }}>
        <input type="number" name="amount" placeholder="amount" required />
        <input type="date" name="date" placeholder="date" required />
        <select name="category" aria-label="Select Category" required>
          <option selected disabled value="">Select your category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>

      <h1>Transactions</h1>
      <hr />
      <table class="striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions().map((transaction) => (
            <tr>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default App;
// function onMount( () =>  {
//   throw new Error('Function not implemented.');
// }
// )

