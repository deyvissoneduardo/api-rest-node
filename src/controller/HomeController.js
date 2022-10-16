import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create(
      {
        nome: 'Deyvisson',
        sobrenome: 'Eduardo',
        email: 'deyvisson@gmail.com',
        idade: 27,
        peso: 92,
        altura: 1.7,
      },
    );
    res.send(novoAluno);
  }
}

export default new HomeController();
