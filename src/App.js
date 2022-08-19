import './App.css';
import {LoginComponent} from "./loginComponent";
import {CreateUserComponent} from "./createUserComponent";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    return <Router>[...]</Router>;
};


function App() {
    return (

        <div className="App">
            <header className="App-header">

                <LoginComponent></LoginComponent>
                <CreateUserComponent></CreateUserComponent>
            </header>
        </div>
    );
}





export default App;
