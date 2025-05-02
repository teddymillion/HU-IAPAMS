// import { useAuthStore } from "../store/authStore";

import { useContext } from "react";
import { AuthContext } from "../context/authContext";




// export const useAuth = () => {
//     const { user, token, ...rest } = useAuthStore();
//     return {
//       user,
//       token,
//       isAuthenticated: !!token && !!user,
//       ...rest,
//     };
//   };


export const useAuth = () => {
  return useContext(AuthContext);
};