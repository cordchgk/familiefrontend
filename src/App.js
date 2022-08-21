import './App.css';
import {LoginComponent} from "./loginComponent";
import {CreateUserComponent} from "./createUserComponent";
import React from 'react';
import {HeaderComponent} from "./HeaderComponent";


import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


function App() {
    return (

        <BrowserRouter>
            <HeaderComponent/>
            <main>
                <Routes>

                    <Route path="/login" element={<LoginComponent/>}/>
                    <Route path="/createuser" element={<CreateUserComponent/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    );
}


export default App;
