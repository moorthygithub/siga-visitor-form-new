
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./app/home/Home";
import ThankYou from "./app/thankyou/ThankYou";
const queryClient = new QueryClient()
function App() {
  return (
    <>
       <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
