import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addAuth } from "../../reduxs/reducers/authReducers";

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
        <div>
            HomeUserPage
            <div>
                <Link to={'/admin'}>Sang trang admin</Link>
            </div>
        </div>
    );
}

export default HomeUserPage;
