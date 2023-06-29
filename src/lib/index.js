import axios from "axios";
import { signES256 } from "./utils/cryptography.js";
import { PRODUCTION_BASE_URL, TEST_BASE_URL } from "./utils/constants.js";
export class SantimpaySdk {
  constructor(merchantId, privateKey, testBed = false) {
    this.privateKey = privateKey;
    this.merchantId = merchantId;
    this.baseUrl = PRODUCTION_BASE_URL;
    this.token = "";
    if (testBed) {
      this.baseUrl = TEST_BASE_URL;
    }
  }
  generateSignedTokenForInitiatePayment(amount, paymentReason) {
    const time = Math.floor(Date.now() / 1000);
    const payload = {
      amount,
      paymentReason,
      merchantId: this.merchantId,
      generated: time,
    };
    return signES256(payload, this.privateKey);
  }
  async generatePaymentUrl(
    id,
    amount,
    paymentReason,
    successRedirectUrl,
    failureRedirectUrl,
    notifyUrl,
    phoneNumber = ""
  ) {
    try {
      this.token = this.generateSignedTokenForInitiatePayment(
        amount,
        paymentReason
      );
      const payload = {
        id,
        amount,
        reason: paymentReason,
        merchantId: this.merchantId,
        signedToken: this.token,
        successRedirectUrl,
        failureRedirectUrl,
        notifyUrl,
      };
      if (phoneNumber && phoneNumber.length > 0) {
        payload.phoneNumber = phoneNumber;
      }
      console.log("Token: ", this.token);
      console.log("Payload: ", payload);
      const response = await axios.post(
        `${this.baseUrl}/initiate-payment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      console.log("URL response: ", response.data);

      if (response.status === 200) {
        return response.data.url;
      } else {
        throw new Error("Failed to initiate payment");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  }
  checkTransactionStatus(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${this.baseUrl}/hi/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        console.log("Check response: ", response.data);

        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Failed to check transaction status"));
        }
      } catch (error) {
        if (error.response && error.response.data) {
          reject(error.response.data);
        }
        reject(error);
      }
    });
  }
}
export default SantimpaySdk;
