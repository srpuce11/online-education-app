import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState(0);
  const studentId = JSON.parse(sessionStorage.getItem('user')).id;

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`http://localhost:8084/api/wallets/student/${studentId}`);
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      alert('Failed to fetch balance');
    }
  };
  const handleAddMoney = async () => {
    try {
      const params = new URLSearchParams();
      params.append('studentId', studentId);
      params.append('amount', amountToAdd);

      await axios.post('http://localhost:8084/api/wallets/add-funds', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        }
      });

      // Update the balance after adding money
      fetchBalance();
      alert('Money added successfully!');
    } catch (error) {
      console.error('Error adding money:', error);
      alert('Failed to add money');
    }
  };

  return (
    <div>
      <h2>Wallet</h2>
      <p>Current Balance: ${balance}</p>
      <div>
        <input
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(Number(e.target.value))}
          placeholder="Enter amount"
        />
        <button onClick={handleAddMoney}>Add Money</button>
      </div>
    </div>
  );
};

export default Wallet;
