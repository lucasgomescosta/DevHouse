import Reserva from '../models/Reserva';
import User from '../models/User';
import House from '../models/House';

class ReservaController{

  async store(req, res){
    const { user_id } = req.hearders;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);
    if(!house){
      return res.status(400).json({ error: 'Essa casa não existe. '});
    }

    if(house.status !== true){
      return res.status(400).json({ error: 'Solicitação indisponível! '});
    }

    const user = await User.findById(user_id);
    if(String(user._id) === String(house.user)){
      return res.status(401).json({ error: 'Reserva não permitida! '});
    }

    const reserva = await Reserva.create({
      user: user_id,
      house: house_id,
      date
    });

    await reserva.populate('house').populate('user').execPopulate();
    return res.json(reserva);
  }
}

export default new ReservaController();