import { useContext } from "react";
import { RewardsContext } from "../context/rewards-context";

export function ElementList() {
  const { value, removeTransaction } = useContext(RewardsContext);
  return (
    <>
      <section className="max-w-6xl m-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Transaction
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Rewards
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {value && value.transactions.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="flex justify-center m-4">
                      <span className="text-indigo-800">
                        No Transactions Found
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              {value &&
                value.transactions.map((record, idx) => {
                  return (
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        <div className="flex justify-center">{record.id}</div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div className="flex justify-center">
                          {record.amount}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div className="flex justify-center">
                          {record.rewards}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={() => removeTransaction(idx)}
                          className="inline-block rounded px-4 py-2 text-xs font-medium text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
