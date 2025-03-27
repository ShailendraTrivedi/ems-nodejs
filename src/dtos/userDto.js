class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.fullName = user.fullName;
    this.username = user.username;
  }
}

module.exports = UserDTO;
