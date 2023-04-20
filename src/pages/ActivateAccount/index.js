import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { activateAccount, reset } from "../../redux/authSlice";

const ActivateAccount = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get token from url
  const params = new URLSearchParams(location.search);
  const activateToken = params.get("token");

  const { loading, error, success, message } = useSelector(
    (state) => state.auth
  );

  // call api to activate account
  useEffect(() => {
    const activateAccountFunc = async () => {
      await dispatch(activateAccount(activateToken));
    };
    activateAccountFunc();
  }, [activateToken]);

  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(reset());
    }

    if (success) {
      toast.info(message);
      dispatch(reset());
      navigate("/login");
    }
  }, [success, error, message, navigate, dispatch]);

  // create activate account page
  return (
    <div>
      <h1>Activate Account</h1>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ActivateAccount;
