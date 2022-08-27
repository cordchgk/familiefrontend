import React, {useState, useEffect} from 'react';

import Cookies from 'universal-cookie';
import "./main.css";

export default function MessageComponent() {

    const cookies = new Cookies();
    const apitoken = cookies.get("apitoken");

    const [receiverId, setReceiverId] = useState();
    const [message, setMessage] = useState();

    async function sendMessage() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': '*', apitoken: apitoken},

            body: JSON.stringify({receiverId: receiverId, message: message})
        };
        const response = await fetch('http://localhost:9000/rest/messages/sendMessage', requestOptions);

    }

    useEffect(() => {

    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        console.log("send")
        sendMessage();

    }

    return (<div className="group-Component">
            <form onSubmit={handleSubmit} style={{width: "50%"}}>
                <div>
                    <label>
                        Receiver ID:<br/>
                        <input type="text" id="receiverId" onChange={e => setReceiverId(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Message:<br/>
                        <textarea id="messageInput" style={{width: "100%", height: "200px",textAlign:"left",paddingTop:"0px"}} onChange={e => setMessage(e.target.value)} >

                        </textarea>

                    </label>
                </div>
                <div>
                    <button type="submit">Send!</button>
                </div>


            </form>
        </div>

    )

}

export
{
    MessageComponent
}
    ;
