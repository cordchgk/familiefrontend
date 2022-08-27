import React, {useState, useEffect} from 'react';
import {Route, useNavigate, useParams} from 'react-router-dom';
import Cookies from 'universal-cookie';
import "./main.css";

export default function GroupsComponent() {

    const cookies = new Cookies();
    const apitoken = cookies.get("apitoken");
    let groupArray = [];
    let [groups, setGroups] = useState(groupArray);
    const navigate = useNavigate();


    async function getGroups() {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Expose-Headers': '*',
                'apitoken': apitoken
            }

        };
        const response = await fetch('http://localhost:9000/rest/group/getAllUsersGroupByToken', requestOptions);

        const responseJson = await response.json();

        for (let i = 0; i < responseJson.length; i++) {
            let groupId = responseJson[i].id;
            let groupName = responseJson[i].name;
            groupArray[i] = {groupId, groupName};
        }
        setGroups(groupArray => [
            ...groupArray
        ]);

    }

    useEffect(() => {
        if (apitoken !== undefined) {
            getGroups();

        }

    },[]);

    function handleSubmit(event) {
        event.preventDefault();

    };

    const handleClick = index => {

        const i = index.target.id;
        navigate("/group?id=" + i
        );

    }

    if (apitoken != null & apitoken !== "" && apitoken !== undefined) {

        return (<div className="group-Component">
                <form onSubmit={handleSubmit}>
                    <ul style={{listStyle: "none"}}>


                        {groups.map((group, index) => (

                            <li key={index}>

                                <button id={groups[index].groupId} onClick={handleClick}>
                                    {group.groupName}
                                </button>


                            </li>

                        ))}

                    </ul>
                </form>
            </div>

        )
    }
}

export
{
    GroupsComponent
}
    ;
