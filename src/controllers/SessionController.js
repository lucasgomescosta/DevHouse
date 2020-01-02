import { Router } from 'express';
//méotodos: index, show, update, store, destroy
/*
index: listagem de sessoes
store: Criar uma sessao
show: Quando queremos listar uma única sessão
update: quando queremos alterar alguma sessão
destroy: quando queremos deletar uma sessão
*/
import User from '../models/User';

class SessionController{
  async store(req, res){
    const { email } = req.body;

    let user = await User.findOne({ email });

    if(!user){
        user = await User.create({ email });
    }

    return res.json(user);
  }
}


export default new SessionController();