export function ElementLayout({ children, handleTransaction, state }) {
  return (
    <>
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl">
                Rewards Record
              </h1>
              <p className="mt-1.5 text-sm text-gray-500">
                UI Developer A retailer offers a rewards program to its
                customers, awarding points based on each recorded purchase. A
                customer receives 2 points for every dollar spent over $100 in
                each transaction, plus 1 point for every dollar spent between
                $50 and $100 in each transaction. (e.g. a $120 purchase = 2x$20
                + 1x$50 = 90 points). Given a record of every transaction during
                a three month period, calculate the reward points earned for
                each customer per month and total.
              </p>
              <ul className="mt-1.5 text-sm text-gray-500">
                <li>Use React JS (do not use TypeScript)</li>
                <li>Simulate an asynchronous API call to fetch data</li>
                <li>No redux (requirement added 06/07/24)</li>
                <li>Make up a data set to best demonstrate your solution</li>
                <li>Check solution into GitHub</li>
              </ul>
            </div>

          </div>
            <div className="flex justify-end items-center gap-4">
              <button
                className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
                onClick={() => handleTransaction({allowTransaction: !state.allowTransaction})}
              >
                Add Transaction
              </button>
            </div>
        </div>
      </header>
      <main className="m-auto p-4">{children}</main>
    </>
  );
}
