import { act } from 'react';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ElementLayout } from './element-layout';

describe('ElementLayout Component', () => {
  const mockHandleTransaction = jest.fn();
  const initialState = { allowTransaction: false };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the header section correctly', () => {
    render(
      <ElementLayout handleTransaction={mockHandleTransaction} state={initialState}>
        <div>Child Component</div>
      </ElementLayout>
    );

    expect(screen.getByText(/Rewards Record/i)).toBeInTheDocument();
    expect(screen.getByText(/UI Developer A retailer offers a rewards program/i)).toBeInTheDocument();
    expect(screen.getByText(/Use React JS \(do not use TypeScript\)/i)).toBeInTheDocument();
  });

  test('renders the Add Transaction button', () => {
    render(
      <ElementLayout handleTransaction={mockHandleTransaction} state={initialState}>
        <div>Child Component</div>
      </ElementLayout>
    );

    const buttonElement = screen.getByRole('button', { name: /Add Transaction/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('handles transaction state change on button click', () => {
    render(
      <ElementLayout handleTransaction={mockHandleTransaction} state={initialState}>
        <div>Child Component</div>
      </ElementLayout>
    );

    const buttonElement = screen.getByRole('button', { name: /Add Transaction/i });
    fireEvent.click(buttonElement);

    expect(mockHandleTransaction).toHaveBeenCalledTimes(1);
    expect(mockHandleTransaction).toHaveBeenCalledWith({ allowTransaction: true });
  });

  test('renders children properly', () => {
    render(
      <ElementLayout handleTransaction={mockHandleTransaction} state={initialState}>
        <div data-testid="child-component">Child Component</div>
      </ElementLayout>
    );

    const childComponent = screen.getByTestId('child-component');
    expect(childComponent).toBeInTheDocument();
    expect(childComponent).toHaveTextContent('Child Component');
  });
});
