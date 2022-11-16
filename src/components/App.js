import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./global/globalStyle";
import { UserProvider } from "./global/dataContext";
import Home from "./home";
import SignUp from "./signUp";
import Transactions from "./transactions/transactions";
import Incoming from "./incoming";
import Outgoing from "./outgoing";

export default function App() {
    return (
        <>
            <GlobalStyle />
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/incoming" element={<Incoming />} />
                        <Route path="/outgoing" element={<Outgoing />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </>
    );
}