import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      res.status(201).send({ id, nome, email });
    } catch (err) {
      res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
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
      const user = await User.findByPk(req.params.id, { attributes: ['id', 'nome', 'email'] });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.userId) {
        return res.status(401).json({ errors: ['Login Required'] });
      }

      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const newUser = await user.update(req.body);
      const { id, nome, email } = newUser;

      return res.status(200).json({ id, nome, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.userId) {
        return res.status(401).json({ errors: ['Login Required'] });
      }

      const user = await User.findByPk(req.userId);
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
