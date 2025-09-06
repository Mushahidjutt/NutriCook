import "./App.css";
import RouterView from "./Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouterView />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
