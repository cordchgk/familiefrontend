import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import './login.css';


export default function LoginComponent() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState();


    const cookies = new Cookies();
    const apitoken = cookies.get("apitoken");


    async function getUser() {


        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Expose-Headers': '*',
                'apitoken': cookies.get('apitoken')
            },


        };
        const response = await fetch('http://localhost:8080/rest/user/getByToken', requestOptions);


        const responseJson = await response.json();

        const u = responseJson.firstname + " " + responseJson.surname;

        setUser(u);

    }

    async function login() {
        const cookies = new Cookies();
        const requestOptions = {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': '*'},

            body: JSON.stringify({email: email, password: password})
        };
        const response = await fetch('http://localhost:8080/rest/user/login', requestOptions);


        const apitoken = response.headers.get("apitoken");

        if (apitoken != null) {


            cookies.set('apitoken', apitoken, {path: '/'}, {secure: true, sameSite: 'None'});
            window.location.reload();


        }


    }


    useEffect(() => {
        if (apitoken !== undefined) {
            getUser()
        }

    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        login();

    };


    if (apitoken != null & apitoken !== "" && apitoken !== undefined) {


        return (<div className="login">
            User: {user}
        </div>)

    } else {
        return (<div>
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

                <button type="submit">Login</button>

            </form>
        </div>);
    }


}

export {
    LoginComponent
};
