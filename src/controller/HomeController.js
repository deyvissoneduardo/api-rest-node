import Aluno from '../models/Aluno';

class HomeController {
  async store(req, res) {
    const novoAluno = await Aluno.create(req.body);
    res.send(novoAluno);
  }
}

export default new HomeController();
