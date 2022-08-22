import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import "./main.css";

export default function GroupComponent() {

    const cookies = new Cookies();
    const apitoken = cookies.get("apitoken");
    let groupArray = [];
    let [groups, setGroups] = useState(groupArray);

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
        const response = await fetch('http://localhost:8080/rest/group/getAllUsersGroupByToken', requestOptions);

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

            console.log(groups);
        }

    }, []);

    if (apitoken != null & apitoken !== "" && apitoken !== undefined) {

        return (<div className="group-Component">

                <ul>


                    {groups.map((group, index) => (

                        <li key={index}>

                            <p> {group.groupName}</p>

                        </li>

                    ))}

                </ul>
            </div>

        )
    }
}

export
{
    GroupComponent
}
    ;
