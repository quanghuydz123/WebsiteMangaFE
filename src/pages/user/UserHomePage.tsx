import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addAuth } from "../../reduxs/reducers/authReducers";
import Header from "../../components/User/Header/Header";

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
        <div className="bg-zinc-900">
            <Header />
        </div>
    );
}

export default HomeUserPage;
