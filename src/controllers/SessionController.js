import * as Yup from "yup";

// méotodos: index, show, update, store, destroy
/*
index: listagem de sessoes
store: Criar uma sessao
show: Quando queremos listar uma única sessão
update: quando queremos alterar alguma sessão
destroy: quando queremos deletar uma sessão
*/
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required()
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na validação. " });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
