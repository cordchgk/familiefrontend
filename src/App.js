import './App.css';

import {CreateUserComponent} from "./createUserComponent";
import React from 'react';
import {HeaderComponent} from "./HeaderComponent";
import {GroupComponent} from "./GroupComponent";

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


                    <Route path="/groups" element={<GroupComponent/>}/>
                    <Route path="/createuser" element={<CreateUserComponent/>}/>
                </Routes>

            </main>


        </BrowserRouter>
    );
}

export default App;
