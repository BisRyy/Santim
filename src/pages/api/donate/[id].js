import SantimpaySdk from '../../../lib';
import Donation from '../../../models/donation';
import connectMongo from '../../../lib/dbConnect';
const ObjectId = require('mongodb').ObjectId;

const objectId = new ObjectId('649cf143d3d1d860d9fc23e3');
const id = objectId.toString();

export default async function handler(req, res) {
  await connectMongo();
  const { method } = req;
  const { name, email, amount, phone } = req.body;
  const { id } = req.query;

  console.log(id);

  if (req.method == 'POST') {
    try {
      const donations = await Donation.find();
      let data;
      for (let i = 0; i < donations.length; i++) {
        let newid = new String(donations[i]._id);
        cont = 0;
        for (i = 0; i < newid.length; i++) {
          if (newid[i] === id[i]) {
            cont++;
          }
        }
      }
      console.log('data: ', data);
      if (!donations) {
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
          amount,
          'Donation',
          successRedirectUrl,
          failureRedirectUrl,
          notifyUrl,
          phone
        )
        .then((url) => {
          // redirect user to url to process payment
          console.log('Payment URL: ', url);
          console.log('id: ', id);
          res.status(200).json({ success: true, data: url });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
