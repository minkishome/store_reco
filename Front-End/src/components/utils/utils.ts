const isLogin = (): boolean => {
  const _id = window.sessionStorage.getItem('id');
  const _jwt = window.sessionStorage.getItem('jwt');
  if (_id && _jwt) {
    return true;
  }
  sessionStorage.clear();
  return false;
};

export {
  isLogin
};