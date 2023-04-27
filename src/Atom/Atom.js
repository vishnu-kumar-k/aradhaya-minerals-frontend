import { atom } from "recoil";

export const AdminDetails=atom(
    {
        key:"AdminDetails",
        default:{
            status:false,
            name:"",
            jwt:localStorage.getItem("adminJwt")
        }
    }
)

export const Load=atom({
    key:"Load",
    default:false
})

export const Status=atom({
    key:"Status",
    default:1
})
export const ShowModel=atom({
    key:"ShowModel",
    default:false
})
export const Filter=atom({
    key:"Filter",
    default:{status:0,pincode:0,date:"yyyy-mm-dd"}
})


export const Fetch=atom({
    key:"Fetch",
    default:1
})
export const Reload=atom({
    key:"Reload",
    default:true,
})