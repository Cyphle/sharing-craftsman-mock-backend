'use strict';

module.exports = class UserManager {
  isUserValid(user) {
    if (user.username === 'john@doe.fr' && user.password === 'password')
      return true;
    return false;
  }

  validateChangePassword(changePassword) {
    if (changePassword.oldPassword && changePassword.newPassword)
      return true;
    return false;
  }

  validateUpdateProfile(profile) {
    /*
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@doe.fr",
  "website": "www.johndoe.fr",
  "github": "http://github.com/Johndoe",
  "linkedin": "linkedin.com/johndoe",
  "picture": "picture.jpg"
}
    */
   return true;
  }
}