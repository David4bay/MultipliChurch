import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() { 

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/user" element={<Dashboard />} />
                    <Route path="/admin" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App;