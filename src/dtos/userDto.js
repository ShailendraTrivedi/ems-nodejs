class UserDTO {
  constructor(user) {
    this.userID = user.userID;
    this.fullName = user.fullName;
    this.username = user.username;
  }
}

module.exports = UserDTO;
