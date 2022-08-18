import React from 'react';
import Cookies from 'universal-cookie';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

class LoginComponent extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            api: "", user: "", email: "", password: "",

            response: ""
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
        this.setState({api: apitoken});


    }


    setEmail(v) {

        this.state.email = v;

    }


    setPassword(v) {
        this.state.password = v;

    }




    render() {

        const localizer = momentLocalizer(moment) // or globalizeLocalizer


        const DnDCalendar = withDragAndDrop(Calendar)

        /* ... */



        const cookies = new Cookies();
        const apitoken = cookies.get("apitoken");
        console.log(apitoken);

        const handleSubmit = event => {
            event.preventDefault();

            this.login();
        };
        if (apitoken != null) {
            this.state.api = apitoken;
            return (
                <DnDCalendar
                    localizer={localizer}
                    draggableAccessor={(event) => true}
                    style={{height:500}}
                />
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
