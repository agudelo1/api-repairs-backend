import { UserService } from "./users.service.js";

const userService = new UserService();

export const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { id = 0, email } = req.body;

    const userExistsById = await userService.doesUserExistById(id);
    const userExistsByEmail = await userService.doesUserExistByEmail(email);

    if (userExistsById) {
      return res.status(400).json({
        error: `User with ID: ${id} cannot be created because it already exists.`,
      });
    }
    if (userExistsByEmail) {
      return res.status(400).json({
        error: `User with EMAIL: ${email} cannot be created because it already exists.`,
      });
    }

    const user = await userService.createUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOneUser(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id: ${id} not found`,
      });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.findOneUser(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id: ${id} not found`,
      });
    }
    const { name, email } = req.body;
    const data = {
      name,
      email,
    };

    const updatedUser = await userService.updateUser(user, data);
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.findOneUser(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id: ${id} not found`,
      });
    }

    await userService.deleteUser(user);

    res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};
