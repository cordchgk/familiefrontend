import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';

import './header.css';

export default function HeaderComponent() {

    const [user, setUser] = useState();
    const cookies = new Cookies();
    const apitoken = cookies.get("apitoken");
    let us;

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

    async function logout() {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Expose-Headers': '*',
                'apitoken': cookies.get('apitoken')
            },

        };
        await fetch('http://127.0.0.1:8080/rest/user/logout', requestOptions);

        cookies.remove('apitoken');
        window.location.reload();

    }

    useEffect(() => {
        if (apitoken !== undefined) {
            getUser()
        }

    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        logout();
    };

    if (apitoken != null & apitoken !== "" & apitoken !== undefined) {

        return (<div className="header">
                User: {user}

                <div>
                    <form onSubmit={handleSubmit}>
                        <button type="submit">
                            Logout
                        </button>
                    </form>
                </div>
            </div>

        )
    } else {
        return (<div className="header">


        </div>);
    }

}

export {HeaderComponent};
