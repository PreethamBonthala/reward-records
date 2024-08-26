import React, { createContext, useState } from "react";

export const RewardsContext = createContext();

export function RewardsProvider({ children }) {
  const [value, setValue] = useState({
    transactions: [],
  });

  function calculateRewards(amount) {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2;
    }
    if (amount > 50) {
      points += Math.min(amount - 50, 50) * 1;
    }
    return points;
  }

  function pushTransaction(amount) {
    const rewards = calculateRewards(amount);
    const transactions = [...value.transactions];
    transactions.push({
      id: `tr${value.transactions.length}ans${new Date().getTime()}act`,
      amount,
      rewards,
    });

    setValue((prevState) => {
      return {
        ...prevState,
        transactions,
      };
    });
  }

  function removeTransaction(index) {
    const transactions = [...value.transactions];
    transactions.splice(index, 1)
    setValue((prevState) => {
      return {
        ...prevState,
        transactions,
      };
    });
  }

  return (
    <RewardsContext.Provider value={{ value, setValue, pushTransaction, removeTransaction }}>
      {children}
    </RewardsContext.Provider>
  );
}
