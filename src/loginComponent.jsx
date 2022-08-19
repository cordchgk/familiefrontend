import React from 'react';
import Cookies from 'universal-cookie';

class LoginComponent extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            api: "", user: "", email: "", password: "",

            response: ""
        };

        this.user = {
            user: ""
        };


    }

    async login() {
        const cookies = new Cookies();
        const e = this.state.email;
        const p = this.state.password;


        const requestOptions = {
            method: 'POST', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': '*'},

            body: JSON.stringify({email: e, password: p})
        };
        const response = await fetch('http://localhost:8080/rest/user/login', requestOptions);


        const responseJson = await response.json();

        const apitoken = response.headers.get("apitoken");

        if (apitoken != null) {


            cookies.set('apitoken', apitoken, {path: '/'}, {secure: true, sameSite: 'none'});

        }


    }


    async getUser() {
        const cookies = new Cookies();

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

        this.setState({user: u});

    }


    setEmail(v) {

        this.state.email = v;

    }


    setPassword(v) {
        this.state.password = v;

    }

    componentDidMount() {
        this.getUser();
    }


    render() {


        const cookies = new Cookies();
        const apitoken = cookies.get("apitoken");


        const handleSubmit = event => {
            event.preventDefault();

            this.login();
        };
        if (apitoken != null) {
          
            const u = this.state.user;

            return (<div>
                    User: {u}
                </div>

            )
        } else {
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
                    <button type="submit">Login</button>


                </form>


            </div>);
        }


    }
}

export {LoginComponent};
