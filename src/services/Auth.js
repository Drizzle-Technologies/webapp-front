export const AuthLogin = () => {
  if (!localStorage.getItem("accessToken")) {
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
