import React from 'react';
import Cookies from 'universal-cookie';

class CreateUserComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: "", password: "",firstname : "",surname : ""


        };

    }

    async createUser() {
        const cookies = new Cookies();
        const e = this.state.email;
        const p = this.state.password;
        const f = this.state.firstname;
        const s = this.state.surname;


        const requestOptions = {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': '*'},

            body: JSON.stringify({email: e, password: p, firstname: f, surname: s})
        };
        const response = await fetch('http://localhost:8080/rest/user/createUser', requestOptions);


        const responseJson = await response.json();
        console.log(responseJson);


    }


    setEmail(v) {

        this.state.email = v;

    }


    setPassword(v) {
        this.state.password = v;

    }

    setFirstname(v) {
        this.state.firstname = v;

    }

    setSurname(v) {
        this.state.surname = v;

    }

    componentDidMount() {

    }


    render() {





        const handleSubmit = event => {
            event.preventDefault();

            this.createUser();
        };

            return (<div className="card text-center m-3">
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="email"
                               onChange={e => this.setEmail(e.target.value)}/>
                    </label>
                    <label>
                        Password:
                        <input type="secret" name="password"
                               onChange={e => this.setPassword(e.target.value)}/>
                    </label>
                    <label>
                        Firstname:
                        <input type="secret" name="password"
                               onChange={e => this.setFirstname(e.target.value)}/>
                    </label>
                    <label>
                        Surname:
                        <input type="secret" name="password"
                               onChange={e => this.setSurname(e.target.value)}/>
                    </label>
                    <button type="submit">Create</button>


                </form>


            </div>);
        }



}

export {CreateUserComponent};
