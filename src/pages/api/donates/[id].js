import Donation from '../../../models/donation';
import connectMongo from '../../../lib/dbConnect';

export default async function handler(req, res) {
  await connectMongo();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const donation = await Donation.findById(id);
        if (!donation) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: donation });
      }
      catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
    }
}
