import { useAppDispatch } from '../../../hooks/hooks';
import { loginUser, signupUser, logoutUser, } from '../slice/authSlice';




export const useAuthViewModel = () => {
  const dispatch = useAppDispatch();

  //----------- login fun -----------
  const login = (email: string, password: string) => {
    try {
      dispatch(loginUser({ email, password }));
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed Login. Please try again." };
    }

  };

  //----------- signup fun -------------
  const signup = async (email: string, password: string) => {
    try {
      dispatch(signupUser({ email, password }));
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed SignUp. Please try again." };
    }

  };
  //--------------- logout fun --------------
  const logout = () => {
    dispatch(logoutUser());
  };

  return { login, signup, logout, };
};