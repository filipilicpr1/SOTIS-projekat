import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { getUserByIdAction } from "../store/userSlice";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import NewCourse from "../components/NewCourse";

const HomePage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token);
  const userApiState = useSelector((state) => state.user.apiState);
  const { sub } = token ? jwtDecode(token) : { sub: null };

  useEffect(() => {
    if (!sub) {
      return;
    }
    
    dispatch(getUserByIdAction(sub));
  }, [dispatch, sub]);

    return(
        <>
            <NewCourse />
            <LoadingModal show={userApiState === "PENDING"} />
        </>
    );
}

export default HomePage