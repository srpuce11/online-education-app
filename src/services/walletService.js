import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL_WALLET.concat('/wallets');

const walletService = {
  purchaseItem: async (studentId, itemId, itemType, price) => {
    try {
      const response = await axios.post(`${API_URL}/purchase`, {
        studentId,
        itemId,
        itemType,
        price
      }, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error making purchase:', error);
      throw error;
    }
  },
};

export default walletService;
