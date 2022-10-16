import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      res.status(201).send(novoUser);
    } catch (err) {
      res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async show(req, res) {
    try {
      if (req.params.id) {
        return res.status(400).json({
          errors: ['Dados invalido'],
        });
      }
      const user = await User.findByPk(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Usuario Invalido'],
        });
      }

      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const newUser = await user.update(req.body);
      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Usuario Invalido'],
        });
      }

      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }
      await user.destroy();
      return res.status(201).json('Usuario deletado');
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }
}

export default new UserController();
