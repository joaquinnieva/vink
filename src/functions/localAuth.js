function localAuth(option, info) {
  if (option === 'login') {
    return localStorage.setItem('sesion', JSON.stringify(info));
  } else if (option === 'logout') {
    return localStorage.removeItem('sesion');
  } else {
    return localStorage.getItem('sesion');
  }
}
export default localAuth;
