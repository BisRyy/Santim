import Donation from '../../../models/donation';
import connectMongo from '../../../lib/dbConnect';

export default async function handler(req, res) {
  await connectMongo();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const donations = await Donation.find({});

        res.status(200).json({ success: true, data: donations });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    case 'POST':
      try {
        const donation = await Donation.create(req.body);
        res.status(201).json({ success: true, data: donation });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
