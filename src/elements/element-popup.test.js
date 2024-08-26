import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ElementPopup } from "./element-popup";
import { RewardsContext } from "../context/rewards-context";

describe("ElementPopup", () => {
  const mockPushTransaction = jest.fn();
  const mockHandleTransaction = jest.fn();

  const renderComponent = (allowTransaction = true) => {
    return render(
      <RewardsContext.Provider value={{ pushTransaction: mockPushTransaction }}>
        <ElementPopup
          allowTransaction={allowTransaction}
          handleTransaction={mockHandleTransaction}
        />
      </RewardsContext.Provider>
    );
  };

  beforeEach(() => {
    mockPushTransaction.mockClear();
    mockHandleTransaction.mockClear();
  });

  it("should render the modal when allowTransaction is true", () => {
    renderComponent();

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  it("should not render the modal when allowTransaction is false", () => {
    renderComponent(false);

    const dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it("should call pushTransaction and handleTransaction on 'Add Transaction' click", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Transaction Amount");
    fireEvent.change(input, { target: { value: "50" } });

    const button = screen.getByText("Add Transaction");
    fireEvent.click(button);

    expect(mockPushTransaction).toHaveBeenCalledWith("50");
    expect(mockHandleTransaction).toHaveBeenCalledWith({ allowTransaction: false });
  });

  it("should call handleTransaction on 'close' button click", () => {
    renderComponent();

    const closeButton = screen.getByLabelText("close dialog");
    fireEvent.click(closeButton);

    expect(mockHandleTransaction).toHaveBeenCalledWith({ allowTransaction: false });
  });

  it("should reset transaction state after adding a transaction", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Transaction Amount");
    fireEvent.change(input, { target: { value: "50" } });

    const button = screen.getByText("Add Transaction");
    fireEvent.click(button);

    expect(input.value).toBe("0"); // Reset to initial value
  });
});
