// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {

  getUserId() {
    const profile = this.getProfile();
    return profile ? profile.userId : null;
  }

  // get user data
  getProfile() {
    try {
      return decode(this.getToken()) || JSON.parse(localStorage.getItem('user_info'));
    } catch (err) {
      return null;
    }
  }

  // check if user's logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken, userId, user) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('user_info', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_info');
    window.location.assign('/');
  }
}

export default new AuthService();