import User from "./users.model.js";

export class UserService {
  async findOneUser(id) {
    return await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
  }

  async findAllUsers() {
    return await User.findAll({
      where: {
        status: "available",
      },
    });
  }

  async createUser(data) {
    return await User.create(data);
  }

  async updateUser(user, data) {
    return await user.update(data);
  }

  async deleteUser(user) {
    return await user.update({
      status: "disabled",
    });
  }

  async doesUserExistById(userId) {
    const user = await User.findOne({ where: { id: userId } });
    return !!user;
  }
  async doesUserExistByEmail(email) {
    const user = await User.findOne({ where: { email: email } });
    return !!user;
  }
}
