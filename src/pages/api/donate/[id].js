import SantimpaySdk from '../../../lib';
import Donation from '../../../models/donation';
import connectMongo from '../../../lib/dbConnect';
export default async function handler(req, res) {
  await connectMongo();
  const { method } = req;
  const { name, email, amount, phone } = req.body;
  const { id } = req.query;

  console.log(id);

  if (req.method == 'POST') {
    try {
      const donations = await Donation.find({});
      console.log(donations);
      const donation = donations.find((donation) => donation._id == id) || null;
      if (!donation) {
        return res.status(400).json({ success: false });
      }
      const PRIVATE_KEY_IN_PEM = `-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEII0qPPByHBzW3znAladzC0uQDi6vhgctF/r6NYlN4ftmoAoGCCqGSM49\nAwEHoUQDQgAE4zghgXLQRJWd56Fe282IVNChD+oa8cNdSAZ6DaELdExs2lKmjXeS\nxU/A8YCNg1GqgfrrLcx3eHnI+Qm6+ppgng==\n-----END EC PRIVATE KEY-----\n`;

      const GATEWAY_MERCHANT_ID = '9e2dab64-e2bb-4837-9b85-d855dd878d2b';
      const client = new SantimpaySdk(GATEWAY_MERCHANT_ID, PRIVATE_KEY_IN_PEM);
      const successRedirectUrl = 'https://santimpay.com/success';
      const failureRedirectUrl = 'https://santimpay.com/failure';

      // backend url to receive a status update (webhook)
      // const notifyUrl = "https://santimpay.com";

      // custom ID used by merchant to identify the payment
      const id = Math.floor(Math.random() * 1000000000).toString();

      const notifyUrl = `https://liq.bisry.me/api/santim/${id}`;
      client
        .generatePaymentUrl(
          id,
          10,
          'Payment for a coffee',
          successRedirectUrl,
          failureRedirectUrl,
          notifyUrl,
          '+251925698349'
        )
        .then((url) => {
          // redirect user to url to process payment
          console.log('Payment URL: ', url);
          console.log('id: ', id);
        })
        .catch((error) => {
          console.error(error);
        });
      res.status(200).json({ success: true, data: url });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
