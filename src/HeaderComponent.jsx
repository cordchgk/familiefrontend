import React, {useState, useCallback, useEffect} from 'react';
import Cookies from 'universal-cookie';
import {Route, useNavigate, useParams} from 'react-router-dom';
import useWebSocket, {ReadyState, resetGlobalState} from 'react-use-websocket';

import './header.css';
import LoginComponent from "./loginComponent";

export default function HeaderComponent() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const cookies = new Cookies();
    const apitoken = cookies.get("apitoken");
    let id;
    let [nots, setNots] = useState(0);

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

        const response = await fetch('http://localhost:9000/rest/user/getByToken', requestOptions);

        const responseJson = await response.json();

        const u = responseJson.firstname + " " + responseJson.surname;
        setUserId(responseJson.id);
        id = responseJson.id;
        setUser(u);

        return id;
    }

    React.useEffect(() => {

        getUser();
        console.log(userId);
        const ws = new WebSocket("ws://localhost:9000/messages/" + userId);

        ws.onopen = (event) => {

        };
        ws.onmessage = function (event) {

            setNots(nots + 1);
            ws.close();

        };
    }, [userId, nots]);

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
        navigate("/createuser");
        window.location.reload();

    }

    const handleSubmit = event => {
        event.preventDefault();

        logout();
    };

    const handleSend = event => {
        event.preventDefault();

    }

    if (apitoken != null & apitoken !== "" & apitoken !== undefined) {

        return (<div className="header">
                <div style={{float: "left", display: "inline-block"}}>
                    ({userId}) {user}
                </div>
                <div style={{float: "left", display: "inline-block", marginLeft: "30px"}}>

                    {nots}
                </div>

                <div style={{float: "right", display: "inline-block"}}>
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
            <LoginComponent/>

        </div>);
    }

}

export {HeaderComponent};
