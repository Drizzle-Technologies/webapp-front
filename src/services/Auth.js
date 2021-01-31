export const AuthLogin = () => {
  if (!localStorage.getItem("token")) {
    return true;
  }
  else{
      return false;
  }
};
