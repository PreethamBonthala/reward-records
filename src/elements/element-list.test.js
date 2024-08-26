import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ElementList } from './element-list';
import { RewardsContext } from '../context/rewards-context';

describe('ElementList Component', () => {
  const mockRemoveTransaction = jest.fn();
  const renderComponent = (value) => {
    return render(
      <RewardsContext.Provider value={{ value, removeTransaction: mockRemoveTransaction }}>
        <ElementList />
      </RewardsContext.Provider>
    );
  };

  it('should render "No Transactions Found" when there are no transactions', () => {
    const value = { transactions: [] };
    renderComponent(value);

    expect(screen.getByText(/No Transactions Found/i)).toBeInTheDocument();
  });

  it('should render a table with transactions', () => {
    const value = {
      transactions: [
        { id: 'T001', amount: 100, rewards: 10 },
        { id: 'T002', amount: 200, rewards: 20 },
      ],
    };
    renderComponent(value);

    expect(screen.getByText('T001')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText('T002')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('should call removeTransaction when the delete button is clicked', () => {
    const value = {
      transactions: [{ id: 'T001', amount: 100, rewards: 10 }],
    };
    renderComponent(value);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    expect(mockRemoveTransaction).toHaveBeenCalledWith(0);
  });

  it('should not render "No Transactions Found" when transactions exist', () => {
    const value = {
      transactions: [{ id: 'T001', amount: 100, rewards: 10 }],
    };
    renderComponent(value);

    expect(screen.queryByText(/No Transactions Found/i)).not.toBeInTheDocument();
  });
});
