import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addAuth } from "../../reduxs/reducers/authReducers";
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";

const HomeUserPage = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state:any) => state.auth)
    console.log("auth",auth)
    useEffect(()=>{
        dispatch(addAuth({
            id:'abc',
            email:'huy@gmail',
            fullname:"nguyen quang huy"
        }))
    },[])

    return (
        <DefaultLayoutUser>
            <div>
            </div>
        </DefaultLayoutUser>
    );
}

export default HomeUserPage;
