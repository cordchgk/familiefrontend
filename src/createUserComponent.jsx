import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import './login.css';
import {BrowserRouter as Router, Link, use, useNavigate} from 'react-router-dom';


export default function CreateUserComponent() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [surname, setSurname] = useState();
    const navigate = useNavigate();

    useEffect(() => {


    }, []);


    async function createUser() {


        const requestOptions = {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': '*'},

            body: JSON.stringify({email: email, password: password, firstname: firstname, surname: surname})
        };
        const response = await fetch('http://localhost:8080/rest/user/createUser', requestOptions);





    }



    async function handleSubmit(event) {
        event.preventDefault();

        await createUser();
        navigate("/login");

    };


    return (<div className="login">
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="email"
                       onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" name="password"
                       onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                Firstname:
                <input type="secret" name="password"
                       onChange={e => setFirstname(e.target.value)}/>
            </label>
            <label>
                Surname:
                <input type="secret" name="password"
                       onChange={e => setSurname(e.target.value)}/>
            </label>


            {/* eslint-disable-next-line no-restricted-globals */}
            <button type="submit" onClick={() => {
                window.location.href = "http://localhost:3000/login"
            }}>Create
            </button>


        </form>


    </div>);


}

export {CreateUserComponent};
