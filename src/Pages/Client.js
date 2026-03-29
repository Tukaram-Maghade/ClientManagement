import axios from "axios";
import react, { useEffect, useState } from "react";

const Client = () => {
    const [firstname,setFirstName]=useState("Neeraj");
    const [clientList,setClientList]=useState([]);
    const [isFormVisible,setIsFormVisible]=useState(false);
    const [clientObj,setClientObj]=useState({
        "clientId": 0,
        "contactPersonName": "",
        "companyName": "",
        "address": "",
        "city": "",
        "pincode": "",
        "state": "",
        "EmployeeStrength": 0,
        "gstNo": "",
        "contactNo": "",
        "regNo": ""
    });
    
    const updateFormValue=(event,key)=>{
        setClientObj(oldObj=>({...oldObj,[key]:event.target.value}))
    }
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

        const res = await axios.get("https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllClients"
        );
        setClientList(res.data.data);
    }
    const onSaveClient=async ()=>{
        try {
        const res=await axios.post("https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/ClientStrive/AddUpdateClient",clientObj);
        if(res.data.result){
            alert("client created success");
            getAllClient();
        }
        else{
            alert(res.data.message);
        }
        } catch (error) {
            alert(error);
        }
    }  
    const onDelete=async (clientId)=>{
        try{
            const isConfirm=window.confirm("Are you sure to delete");
            if(isConfirm){
                const res=await axios.delete("https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/ClientStrive/DeleteClientByClientBy?clientId="+clientId);
                if(res.data.result){
                    alert("Client deleted success");
                    getAllClient();
                }
            }
           
        }
        catch(error){
            alert(error.code);
        }
    } 
    const onEdit=(clientObj)=>{
        setClientObj(clientObj);
        //const res= axios.Update
    }
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clientList.map((item,index)=>{
                                            return(
                                                <tr key={item.clientId}>
                                                    <td>{index+1}</td>
                                                    <td>{item.contactPersonName}</td>
                                                    <td>{item.companyName}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.gstNo}</td>
                                                    <td>{item.contactNo}</td>
                                                    <td>{item.regNo}</td>
                                                    <td>
                                                        <button className="btn btn-success btn-sm" onClick={()=>{onEdit(item)}}>Edit</button>
                                                        <button className="btn btn-danger btn-sm mx-1" onClick={()=>{onDelete(item.clientId)}}>Delete</button>
                                                    </td>
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

                                    <input type="text" value={clientObj.contactPersonName} placeholder="Person Name" onChange={(event)=>{updateFormValue(event,'contactPersonName')}} className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Company Name :</label>
                                    <input type="text" value={clientObj.companyName} placeholder="Company Name" onChange={(event)=>{updateFormValue(event,'companyName')}} className="form-control"/>
                                </div>
                            </div>
                            <div className="row">

                                <div className="form-group col-md-6">
                                    Registration No :
                                    <input type="text" value={clientObj.regNo} placeholder="Enter Registration no" onChange={(event)=>{updateFormValue(event,'regNo')}} className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    City :
                                    <input type="text" value={clientObj.city} placeholder="Enter City Name" onChange={(event)=>{updateFormValue(event,'city')}} className="form-control"/>
                                </div>
                            </div>
                            <div className="row">

                                <div className="form-group col-md-6">
                                    <label>Pin Code :</label>
                                    <input type="text" value={clientObj.pincode} placeholder="Enter Pincode" onChange={(event)=>{updateFormValue(event,'pincode')}} className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>State :</label>
                                    <input type="text" value={clientObj.state} placeholder="Enter State" onChange={(event)=>{updateFormValue(event,'state')}} className="form-control"/>
                                </div>
                                <div className="row">

                                </div>

                                <div className="form-group col-md-6">
                                    <label>Contact No :</label>

                                    <input type="text" value={clientObj.contactNo} placeholder="Contact No" onChange={(event)=>{updateFormValue(event,'contactNo')}} className="form-control"/>

                                </div>
                                <div className="form-group col-md-6">
                                    <label>GST No :</label>
                                    <input type="text" value={clientObj.gstNo} placeholder="Enter GST No" onChange={(event)=>{updateFormValue(event,'gstNo')}} className="form-control"/>
                                </div>
                            </div>
                            <div className="row">


                            </div>
                            <div className="row">

                                <div className="form-group col-md-12">
                                    <label>Employee Strength:</label>
                                    <textarea value={clientObj.EmployeeStrength} placeholder="Employee Strength" onChange={(event)=>{updateFormValue(event,'EmployeeStrength')}} className="form-control"></textarea>
                                </div>

                            </div>
                            <div className="row">

                                <div className="form-group col-md-12">
                                    <label>Address :</label>
                                    <textarea placeholder="Address" onChange={(event)=>{updateFormValue(event,'address')}} className="form-control"></textarea>
                                </div>

                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="form-group col-md-12 d-flex justify-content-center">
                                <button className="btn btn-sm btn-danger"><i className="fa fa-close"></i>Cancle</button>
                                {
                                    clientObj.clientId == 0 && <button className="btn btn-sm btn-success" onClick={onSaveClient} ><i className="fa fa-save"></i>
                                        Save Client</button>       
                                }
                                {
                                    clientObj.clientId !=0 &&  <button className="btn btn-sm btn-warning" onClick={onEdit} ><i className="fa fa-save"></i>
                                        Update Client</button>
                                }
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