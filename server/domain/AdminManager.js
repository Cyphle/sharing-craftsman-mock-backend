'use strict';

module.exports = class AdminManager {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  getAuthorizations() {
    return this.adminRepository.getAuthorizations();
  }

  createAuthorization(group) {
    this.adminRepository.addAuthorization(group);
  }

  deleteAuthorization(group) {
    this.adminRepository.deleteAuthorization(group);
  }

  validateGroup(group) {
    if (group.name && group.roles && group.roles.length > 0)
      return true;
    return false;
  }

  validateUser(user) {
    if (user.username)
      return true;
    return false;
  }

  validateAddedGroup(groupToAdd) {
    if (groupToAdd.username && groupToAdd.group)
      return true;
    return false;
  }
}