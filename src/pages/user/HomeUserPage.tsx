import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAuth } from "../../reduxs/reducers/authReducers";
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";
import SortButton from "../../components/User/Common/SortButton";

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
                <SortButton />
            </div>
        </DefaultLayoutUser>
    );
}

export default HomeUserPage;
