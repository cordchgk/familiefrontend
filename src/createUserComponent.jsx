import React, {useState, useEffect} from 'react';
import './login.css';
import { useNavigate} from 'react-router-dom';
import "./main.css";

export default function CreateUserComponent() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [surname, setSurname] = useState();
    const [userCreated, setUserCreated] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    async function createUser() {

        const requestOptions = {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': '*'},

            body: JSON.stringify({email: email, password: password, firstname: firstname, surname: surname})
        };
        const response = await fetch('http://localhost:8080/rest/user/createUser', requestOptions);
        console.log(response.status);
        if (response.status === 409) {
            setUserCreated(false);
        } else if (response.status === 200) {
            navigate("/login");
        }

    }

    async function handleSubmit(event) {
        event.preventDefault();

        await createUser();

    };

    if (userCreated) {
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


                <button type="submit">
                    Create
                </button>


            </form>




        </div>);
    } else {
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


                <button type="submit">
                    Create
                </button>

                <p style={{color:"red"}}>Something went wrong!</p>
            </form>


        </div>);

    }
}
    export {CreateUserComponent};
