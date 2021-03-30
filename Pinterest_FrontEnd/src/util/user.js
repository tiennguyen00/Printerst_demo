import moment from 'moment';

const getUserStorage = () => {
    const userInfo = localStorage.getItem('userInfo'); //Lấy chuỗi token trên localStorage
    if(!userInfo){
        return {};
    }
    return JSON.parse(userInfo);
}

const saveUserStorage = userInfo => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const parseJwt = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
  
    return JSON.parse(jsonPayload);
};
  
const getUserInfo = () => {
    const userStorage = getUserStorage();

    if (userStorage.accessToken) {
      const userParse = parseJwt(userStorage.accessToken);
  
      return {
        role: 'admin',
        // firstName: userParse.firstName,
        // lastName: userParse.lastName,
        idToken: userStorage.accessToken,
        refreshToken: userStorage.refreshToken,
        exp: userParse.exp,
        email: userParse.user.email,
        status: userParse.user.status,
      };
    }
    return {};
};
  
const checkRememberMe = (e, checked) => {
    const date = moment();
  
    if (checked) {
      return localStorage.setItem('rememberMe', JSON.stringify(date));
    }
  
    return localStorage.removeItem('rememberMe');
};
  
const checkRememberMeExpired = () => {
    const dateRememberMe = localStorage.getItem('rememberMe');
    const expiredTimeRememberMe = 5; // days
    let isRememberMeExpired = false;
  
    if (dateRememberMe) {
      const dateParse = JSON.parse(dateRememberMe);
      const nowDate = moment();
      isRememberMeExpired =
        nowDate.diff(dateParse, 'days', true) > expiredTimeRememberMe;
    }
  
    return { isRememberMeExpired, hasCheckRememberMe: !!dateRememberMe };
};
  
export const user = {
    getUserInfo,
    checkRememberMeExpired,
    checkRememberMe,
    saveUserStorage
};