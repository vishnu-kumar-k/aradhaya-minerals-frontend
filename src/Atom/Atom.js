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

export const Width=atom({
    key:"Width",
    default:1000
})