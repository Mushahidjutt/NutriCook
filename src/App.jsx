import "./App.css";
import RouterView from "./Router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterView />
      <Toaster position="top-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
