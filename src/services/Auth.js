export const AuthLogin = () => {
  if (!localStorage.getItem("token")) {
    return true;
  }
  else{
      return false;
  }
};

export const RemoveAuth = () => {
  localStorage.clear();
  window.location.reload();
}
