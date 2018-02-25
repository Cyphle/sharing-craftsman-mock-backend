'use strict';

module.exports = class UserManager {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  registerUser(user) {
    this.userRepository.add(user);
  }
  
  isUserValid(user) {
    if (user.username && user.password)
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