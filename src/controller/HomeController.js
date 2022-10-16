import Student from '../models/Student';

class HomeController {
  async store(req, res) {
    const student = await Student.create(req.body);
    res.send(student);
  }
}

export default new HomeController();
