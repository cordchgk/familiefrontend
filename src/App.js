import './App.css';

import {CreateUserComponent} from "./createUserComponent";
import React from 'react';
import {HeaderComponent} from "./HeaderComponent";
import {GroupsComponent} from "./GroupsComponent";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import GroupComponent from "./GroupComponent";
import MessageComponent from "./MessageComponent";

function App() {
    return (

        <BrowserRouter>
            <HeaderComponent/>
            <main>
                <Routes>

                    <Route path={"/"} element={<GroupsComponent/>}/>
                    <Route path="/groups" element={<GroupsComponent/>}/>
                    <Route path="/group" element={<GroupComponent/>}/>
                    <Route path="/messages" element={<MessageComponent/>}/>
                    <Route path="/createuser" element={<CreateUserComponent/>}/>
                </Routes>

            </main>


        </BrowserRouter>
    );
}

export default App;
