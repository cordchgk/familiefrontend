import React, {useState, useEffect} from 'react';
import './login.css';
import {useNavigate} from 'react-router-dom';
import "./main.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateUserComponent() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [surname, setSurname] = useState();
    const [userCreated, setUserCreated] = useState(true);
    const [birthday, setBirthday] = useState();
    const [badRequest, setBadRequest] = useState();
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());

    useEffect(() => {

    }, []);

    async function createUser() {

        const requestOptions = {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': '*'},

            body: JSON.stringify({email: email, password: password, firstname: firstname, surname: surname})
        };
        const response = await fetch('http://localhost:9000/rest/user/createUser', requestOptions);

        if (response.status === 409) {
            document.getElementById("message").innerHTML = "User already exists!";

        } else if (response.status === 400) {
            document.getElementById("message").innerHTML = "Something is missing!";
        } else if (response.status === 200) {
            navigate("/login");
        }

    }

    async function handleSubmit(event) {
        event.preventDefault();

        await createUser();

    };

    return (<div className="group-Component">
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
            <DatePicker
                selected={date}

                onChange={(date) => setDate(date)}
            >
            </DatePicker>

            <button type="submit">
                Create
            </button>

            <p id={"message"} style={{color: "red"}}></p>
        </form>


    </div>);

}
export {CreateUserComponent};
