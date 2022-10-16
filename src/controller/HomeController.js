import Aluno from '../models/Aluno';

class HomeController {
  async store(req, res) {
    const aluno = await Aluno.create(req.body);
    res.send(aluno);
  }
}

export default new HomeController();
