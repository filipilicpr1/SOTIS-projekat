import LoginForm from "../components/Login/LoginForm";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const userApiState = useSelector((state) => state.user.apiState);
  return (
    <>
      <LoginForm />
      <LoadingModal show={userApiState === "PENDING"} />
    </>
  );
};

export default LoginPage;
