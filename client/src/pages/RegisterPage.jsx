import RegisterForm from "../components/Register/RegisterForm";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const userApiState = useSelector((state) => state.user.apiState);
  return (
    <>
      <RegisterForm />
      <LoadingModal show={userApiState === "PENDING"} />
    </>
  );
};

export default RegisterPage;
