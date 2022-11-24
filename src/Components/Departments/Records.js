import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Accordian from "./Accordian";

import editIcon from "../../Assets/editIcon.png";
import tripsIcon from "../../Assets/tripsIcon.png";
import statementIcon from "../../Assets/statementIcon.png";
import staffIcon from "../../Assets/staffIcon.png";
import adminIcon from "../../Assets/adminIcon.png";

import "./Records.css";
import Loading from "../../Loading/Loading";

const Records = ({ isLoading, data, headers }) => {
    const history = useHistory();
    const func = (val) => {
        if (val) {
            document.getElementById(val).click();
        }
    }
    const subListClickHandler = (e) => {
        let dptId = e.target.parentElement.id;
        console.log(e.target.alt !== "statement" && dptId);
        // if(e.target.alt === "edit"){}
        if (e.target.alt !== "statement" && dptId)
            history.push(`${e.target.alt}?departmentId=${dptId}`);
    }
    return (
        <React.Fragment>
            { }
            {data[0] ?
                <table className="table" id="my-table">
                    <thead>
                        <tr>
                            {headers.map((data) => (
                                <th>{data}</th>
                            ))}
                        </tr>
                    </thead>
                    {/* <tbody  onClick={(e) => console.log(e.target.parentElement.children[0])}> */}
                    <tbody>
                        {data.map(myData => <tr>
                            <td>{myData.department_name}</td>
                            <td>{myData.admin_name}</td>
                            <td>{myData.admin_email}</td>
                            <td>{myData.vehicle_category}</td>
                            <td id={myData.id} onClick={subListClickHandler} className="department-data" >
                                <img src={editIcon} alt="edit" title="Click to edit department Details" />
                                <img src={tripsIcon} alt="trips" title="Click to see Trips Details" />
                                <img src={statementIcon} alt="statement" title="Click to see Statement" />
                                <img src={staffIcon} alt="staff" title="Click to see Staff Details" />
                                <img src={adminIcon} alt="admins" title="Click to see Admin Details" />
                            </td>
                            {/* <td><Accordian myId={myData.id} forMyRender={func} /></td> */}
                        </tr>)}
                    </tbody>
                </table>
                :
                <React.Fragment>
                    <table className="table" id="my-table">
                        <thead>
                            <tr>
                                {headers.map((data) => (
                                    <th>{data}</th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                    </table> 
                    {isLoading ? <Loading datatable="true" /> :
                        <div style={{ textAlign: "center", marginTop: "10px" }}>No Data Available</div>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default Records;

//git push origin HEAD:refs/heads/<origin>