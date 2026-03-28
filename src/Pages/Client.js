import axios from "axios";
import react, { useEffect, useState } from "react";

const Client = () => {
    const [firstname,setFirstName]=useState("Neeraj");
    const [clientList,setClientList]=useState([]);
    const [isFormVisible,setIsFormVisible]=useState(false);
    
    useEffect(()=>{
        getAllClient()
    },[])
    const showForm=()=>{
        setIsFormVisible(true);
    }
    const hideForm=()=>{
        setIsFormVisible(false);
    }
    const getAllClient=async()=>{
        //const data=await axios.get("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllClients");

        const res = await axios.get(
            "https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllClients"
        );
        console.log(res);
        setClientList(res.data.data);
    }
    // const getAllClient = async () => {
    //     const res = await axios.get(
    //         "https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllClients"
    //     );
    //     setClientList(res.data.data);
    // };
    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className={isFormVisible?`col-7`:`col-12`}>
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <strong>Client Information - {firstname}</strong>
                            <button type="button" className="btn btn-sm btn-danger" onClick={showForm}><i className="fa fa-plus"></i> Add new</button>
                        </div>
                        <div className="card-body">
                            <table className="table table-srtipped table-bordered ">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Contact Person Name</th>
                                        <th>Company Name </th>
                                        <th> City </th>
                                        <th>GST No</th>
                                        <th> Contact No </th>
                                        <th>Registration No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clientList.map((item,index)=>{
                                            return(
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{item.contactPersonName}</td>
                                                    <td>{item.companyName}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.gstNo}</td>
                                                    <td>{item.contactNo}</td>
                                                    <td>{item.regNo}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div> 
                {
                    isFormVisible && <div className="col-md-5">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <strong>Add Client</strong>
                            <button type="button" className="btn btn-sm btn-danger" onClick={hideForm}><i className="fa fa-plus"></i>Close</button>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label className="form-control-label">Contact Person Name :</label>

                                    <input type="text" placeholder="Person Name" className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Company Name :</label>
                                    <input type="text" placeholder="Company Name" className="form-control"/>
                                </div>
                            </div>
                            <div className="row">

                                <div className="form-group col-md-6">
                                    Registration No :
                                    <input type="text" placeholder="Enter Registration no" className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    City :
                                    <input type="text" placeholder="Enter City Name" className="form-control"/>
                                </div>
                            </div>
                            <div className="row">

                                <div className="form-group col-md-6">
                                    <label>Pin Code :</label>
                                    <input type="text" placeholder="Enter Pincode" className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>State :</label>
                                    <input type="text" placeholder="Enter State" className="form-control"/>
                                </div>
                                <div className="row">

                                </div>

                                <div className="form-group col-md-6">
                                    <label>Contact No :</label>

                                    <input type="text" placeholder="Contact No" className="form-control"/>

                                </div>
                                <div className="form-group col-md-6">
                                    <label>No :</label>
                                    <input type="text" placeholder="Enter GST No" className="form-control"/>
                                </div>
                            </div>
                            <div className="row">


                            </div>
                            <div className="row">

                                <div className="form-group col-md-12">
                                    <label>Employee Strength:</label>
                                    <textarea placeholder="Employee Strength" className="form-control"></textarea>
                                </div>

                            </div>
                            <div className="row">

                                <div className="form-group col-md-12">
                                    <label>Address :</label>
                                    <textarea placeholder="Address" className="form-control"></textarea>
                                </div>

                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="form-group col-md-12 d-flex justify-content-center">
                                    <button className="btn btn-sm btn-success"><i className="fa fa-save"></i>
                                        Save</button>
                                    <button className="btn btn-sm btn-danger"><i className="fa fa-close"></i>Cancle</button>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
                }


            </div>
        </div>
    );
}
export default Client;