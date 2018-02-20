'use strict';

module.exports = class AdminManager {
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