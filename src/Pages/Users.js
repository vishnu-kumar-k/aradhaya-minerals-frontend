import React, { useEffect, useState } from 'react'
import axios from '../Axios/Axios';
import { Container, Table } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { Load } from '../Atom/Atom';
import Loading from '../Component/Loading';

export const Users = () => {
    const[user,setUser]=useState();
    const [loading,setLoading]=useRecoilState(Load)
    useEffect(()=>
    {
        setLoading(true);
        axios.get("/admin/users").then(async(result)=>
        {
            if(result.data.status)
            {
                await setUser(result.data.result);
                setLoading(false);
            }
            else{
                setUser([]);
                setLoading(false)
            }
        }).catch((err)=>console.log(err))
    },[])
  return (
    <>{loading?(<Loading />):(
    <Container>
        <p>Total users {user?user.length:0}</p>
        <Table responsive striped bordered hover>
        <thead>
           <tr>
            <td>S.no</td>
            <td>Name</td>
            <td>Phone Number</td>
            <td>Address</td>
            <td>Email</td>
            </tr> 
        </thead>
        <tbody>
  {user ? (
    user.map((p, i) => (
      <tr key={i}>
        <td>{i+1}</td>
        <td>{p.username}</td>
        <td>{p.usernumber}</td>
        <td>{p.useraddress}</td>
        <td>{p.useremail}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td>No users</td>
    </tr>
  )}
</tbody>

        </Table>
    </Container>)}
    </>
  )
}
