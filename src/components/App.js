import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./global/globalStyle";
import { UserProvider } from "./dataContext";

export default function App() {
    return (
        <>
            <GlobalStyle />
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </>
    );
}