const { startOfDay, endOfDay, parseISO } = require('date-fns');
const { Op } = require('sequelize');

const User = require('../models/User');
const Appointments = require('../models/Appointment');

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a Provider' });
    }

    const { date } = req.query;
    const dateParse = parseISO(date);

    const appointments = await Appointments.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(dateParse), endOfDay(dateParse)],
        },
      },
      order: ['date'],
    });
    return res.json(appointments);
  }
}

module.exports = new ScheduleController();
