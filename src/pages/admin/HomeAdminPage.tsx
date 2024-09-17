import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeAdminPage = () => {
    const auth = useSelector((state:any) => state.auth)
    console.log("auth",auth)
  return (
    <div>
      HomeAdminPage
      <div>
        <Link to={'/'}>Sang trang home</Link>
      </div>

    </div>
  );
}

export default HomeAdminPage;
