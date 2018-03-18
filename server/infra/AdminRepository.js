'use strict';

module.exports = class AdminRepository {
  constructor() {
    this.authorizations = {
      USERS: {
        name: "USERS",
        roles: [
          { name: "ROLE_USER" }
        ]
      },
      ADMINS: {
        name: "ADMINS",
        roles: [
          { name: "ROLE_USER" },
          { name: "ROLE_ADMIN" }
        ]
      }
    };
  }

  getAuthorizations() {
    let authorizations = [];
    for (const key of Object.keys(this.authorizations)) {
      authorizations.push(this.authorizations[key]);
    }
    return authorizations;
  }

  addAuthorization(group) {
    if (this.authorizations[group.name]) {
      this.authorizations[group.name].roles.push(group.roles[0]);
    } else {
      this.authorizations[group.name] = group;
    }
  }

  deleteAuthorization(group) {
    this.authorizations[group.name].roles = this.authorizations[group.name].roles.filter(role => role.name !== group.roles[0].name);
    if (this.authorizations[group.name].roles.length === 0) {
      delete this.authorizations[group.name];
    }
  }
}