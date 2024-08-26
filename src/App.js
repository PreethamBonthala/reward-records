import { useState } from "react";
import { ElementList, ElementLayout, ElementPopup } from "./elements";
import { RewardsProvider } from "./context/rewards-context";

function App() {
  const [state, setState] = useState({
    allowTransaction: false,
  });


  function setTransaction(record = {}) {
    setState((prevState) => {
      return {
        ...prevState,
        ...record,
      };
    });
  }

  return (
    <>
      <RewardsProvider>
        <ElementLayout handleTransaction={setTransaction} state={state}>
          <ElementList />
          <ElementPopup
            handleTransaction={setTransaction}
            allowTransaction={state.allowTransaction}
          ></ElementPopup>
        </ElementLayout>
      </RewardsProvider>
    </>
  );
}

export default App;
