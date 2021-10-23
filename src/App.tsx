import { AppContextProvider } from "./AppContext";
import { Exchanger } from "./exchange/Exchanger";
import { GlobalStyles } from "./styles";

export function App() {
  return (
    <div className="d-flex justify-content-center">
      <GlobalStyles />
      <div className="w-50">
        <h1 className="text-center mt-2 mb-4">Currency Converter</h1>
        <AppContextProvider>
          <Exchanger />
        </AppContextProvider>
      </div>
    </div>
  );
}
