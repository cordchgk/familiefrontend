import React, {useState, useEffect} from 'react';

import Cookies from 'universal-cookie';
import "./main.css";

export default function GroupComponent() {

    let userArray = [];
    let [user, setUser] = useState(userArray);
    const [userToAddId, setUserToAddId] = useState();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const cookies = new Cookies();
    const apitoken = cookies.get("apitoken");

    async function getGroup() {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Expose-Headers': '*',
                "apitoken": cookies.get("apitoken")
            },

            body: JSON.stringify({id: id})
        };
        const response = await fetch('http://localhost:9000/rest/group/getUsersByGroupId', requestOptions);

        const responseJson = await response.json();

        for (let i = 0; i < responseJson.length; i++) {
            let firstname = responseJson[i].firstname;
            let surname = responseJson[i].surname;
            let birthday = responseJson[i].birthday;
            userArray[i] = {firstname, surname, birthday};

        }
        setUser(userArray => [
            ...userArray
        ]);

    };

    async function addUser() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Expose-Headers': '*',
                "apitoken": cookies.get("apitoken")
            },

            body: JSON.stringify({userId: userToAddId, groupId: id})

        };

        const response = await fetch('http://localhost:9000/rest/group/addUserToGroupById', requestOptions);
        if (response.status === 409) {
            document.getElementById("message").innerHTML = "Something went wrong!";
        } else if (response.status === 200) {
            window.location.reload();
        }

    }

    useEffect(() => {
        if (apitoken !== undefined) {

            getGroup();

        }

    }, []);

    function isBirthdayToday(index) {
        const today = new Date();
        let date;
        if (today.getMonth() + 1 < 10) {
            date = "0" + (today.getMonth() + 1) + '-' + today.getDate();
        } else {
            date = (today.getMonth() + 1) + '-' + today.getDate();
        }

        let userBirthday = user[index].birthday;
        userBirthday = userBirthday.slice(5, userBirthday.length);

        if (userBirthday === date) {
            return true;
        }
    }

    function getAge(index) {

        const today = new Date();
        let year = today.getFullYear();
        let birthdayYear = user[index].birthday.slice(0, 4);
        let birthdayMonth = user[index].birthday.slice(5, 7);
        let birthdayDay = user[index].birthday.slice(8, 10);
        let m;
        if (year > birthdayYear) {
            if (today.getMonth() + 1 < 10) {
                m = "0" + (today.getMonth() + 1);
            } else {
                m = (today.getMonth() + 1);
            }

            if (m === birthdayMonth) {

                if (today.getDate() - birthdayDay < 0) {
                    console.log("true");
                    return year - birthdayYear - 1;
                } else {
                    return year - birthdayYear;
                }
            } else if (m < birthdayMonth) {
                return year - birthdayYear - 1;
            } else if (m > birthdayMonth) {
                return year - birthdayYear;
            }
        } else {
            return 0;
        }

    }

    function handleSubmit(event) {
        event.preventDefault();
        addUser();

    };

    if (apitoken != null & apitoken !== "" && apitoken !== undefined) {

        return (<div className="group-Component">
                <form onSubmit={handleSubmit} style={{width: "50%"}}>

                    <ul style={{listStyle: "none"}}>


                        {user.map((user, index) => (

                            <li key={index} style={{marginTop: "3px", height: "40px"}}>
                                <div className={"group-center-div"}>
                                    <div style={{float: "left", width: "50%", height: "10%"}}>
                                        <p>
                                            {user.firstname} {user.surname}
                                        </p>
                                    </div>
                                    <div style={{float: "left", width: "30%"}}>
                                        <p style={isBirthdayToday(index) ? {color: "red"} : {color: "white"}}>
                                            {user.birthday}
                                        </p>
                                    </div>
                                    <div style={{float: "right", width: "20%"}}>
                                        <p style={isBirthdayToday(index) ? {color: "red", float: "right"} : {color: "white", float: "right"}}>
                                            {getAge(index)}
                                        </p>
                                    </div>

                                </div>
                            </li>

                        ))}

                    </ul>
                    <label>
                        ID:
                        <input type="text" name="email"
                               onChange={e => setUserToAddId(e.target.value)}/>
                    </label>
                    <button type="submit">
                        Add User!
                    </button>
                    <p id={"message"} style={{color: "red"}}></p>

                </form>
            </div>

        )
    }
}

export
{
    GroupComponent
}
    ;
