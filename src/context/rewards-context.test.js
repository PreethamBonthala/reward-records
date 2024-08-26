import React from "react";
import { render, act } from "@testing-library/react";
import { RewardsProvider, RewardsContext } from "./rewards-context"; // Adjust the import path

describe("RewardsProvider", () => {
  const TestComponent = () => (
    <RewardsContext.Consumer>
      {(context) => (
        <div>
          <button onClick={() => context.pushTransaction(120)}>Add $120 Transaction</button>
          <button onClick={() => context.pushTransaction(70)}>Add $70 Transaction</button>
          <button onClick={() => context.removeTransaction(0)}>Remove First Transaction</button>
          <div data-testid="transactions">
            {context.value.transactions.map((transaction, index) => (
              <div key={index} data-testid={`transaction-${index}`}>
                {`Amount: ${transaction.amount}, Rewards: ${transaction.rewards}`}
              </div>
            ))}
          </div>
        </div>
      )}
    </RewardsContext.Consumer>
  );

  it("should calculate rewards correctly", () => {
    const { container } = render(
      <RewardsProvider>
        <TestComponent />
      </RewardsProvider>
    );

    const button = container.querySelector("button");

    act(() => {
      button.click(); // Click to add $120 transaction
    });

    const transaction = container.querySelector('[data-testid="transaction-0"]');
    expect(transaction.textContent).toBe("Amount: 120, Rewards: 90");
  });

  it("should add a transaction and calculate rewards correctly", () => {
    const { getByText, getByTestId } = render(
      <RewardsProvider>
        <TestComponent />
      </RewardsProvider>
    );

    act(() => {
      getByText("Add $120 Transaction").click();
    });

    const transaction = getByTestId("transaction-0");
    expect(transaction.textContent).toBe("Amount: 120, Rewards: 90");

    act(() => {
      getByText("Add $70 Transaction").click();
    });

    const transaction2 = getByTestId("transaction-1");
    expect(transaction2.textContent).toBe("Amount: 70, Rewards: 20");
  });

  it("should remove a transaction", () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <RewardsProvider>
        <TestComponent />
      </RewardsProvider>
    );
  
    act(() => {
      getByText("Add $120 Transaction").click();
    });
  
    act(() => {
      getByText("Add $70 Transaction").click();
    });
  
    expect(getByTestId("transaction-0").textContent).toBe("Amount: 120, Rewards: 90");
    expect(getByTestId("transaction-1").textContent).toBe("Amount: 70, Rewards: 20");
  
    act(() => {
      getByText("Remove First Transaction").click();
    });
  
    // After removal, the transaction with Amount: 70 should now be the first transaction
    expect(queryByTestId("transaction-1")).toBeNull(); // The original second transaction should no longer have the id "transaction-1"
    expect(getByTestId("transaction-0").textContent).toBe("Amount: 70, Rewards: 20"); // The second transaction becomes the first one
  });
  
});
