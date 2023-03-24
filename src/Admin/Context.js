import React,{useState} from "react";

export const AdminDetails=React.createContext();

export const Context=(props)=>{
    const [status,setStatus]=useState();
    const [name,setName]=useState();
    return(
        <AdminDetails.Provider value={{setName,setStatus,name,status}}>{props.children}</AdminDetails.Provider>
    )
}

