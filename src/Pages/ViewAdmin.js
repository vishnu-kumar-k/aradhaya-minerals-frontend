import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import axios from '../Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { Reload } from '../Atom/Atom';

export const ViewAdmin = ({name,number,superAdmin,i,id}) => {
    const[showModel,setShowModel]=useState(false);
    const[reload,setReload]=useRecoilState(Reload);
    const handleRemove=(e)=>
    {
        e.preventDefault();
        setShowModel(true)
    }
    const handleCloseModal = () => {
        setShowModel(false);
      };
      const handleDelete=(e)=>
      {
        e.preventDefault();
        handleCloseModal();
        axios.post("/admin/removeadmin",{id}).then((result)=>
        {
            console.log(result.data)
            if(result.data.status)
            {
                

                toast.success("Removed Successfully");
                setTimeout(()=>
                {
                    setReload(!reload);
                },2000)
            }
            else
            {
                toast.error("Something went Wrong!!!")
            }
        })
            
        
      }
  return (
    <>
    <ToastContainer />
    <tr >
        
        <td>{name}</td>
        <td>{number}</td>
        <td>{superAdmin===1?"Yes":"No"}</td>
       <td> <button className='btn btn-outline-danger' onClick={handleRemove}>Remove</button></td>
    </tr>
    <Modal show={showModel} onHide={handleCloseModal}>
    <Modal.Header closeButton>
          <Modal.Title>Are You Sure to Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <button className='btn btn-outline-success' onClick={handleDelete}>Yes</button>
            <button className='btn btn-outline-danger' onClick={handleCloseModal}>No</button>
          
        </Modal.Body>

    </Modal>
    </>
  )
}
