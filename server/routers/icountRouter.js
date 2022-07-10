import express from 'express';
import axios from 'axios';
const router = express.Router();

router.post('/auth/login', async (req, res) => {
   try {
    const result = await axios.post(
        'https://api.icount.co.il/api/v3.php/auth/login',
        req.body
      );
      res.send(result.data);
   } catch (error) {
    console.log(error);
   }
  
});

router.post('/clients', async (req, res) => {
    try {
        const result = await axios.post(
            'https://api.icount.co.il/api/v3.php/client/get_open_docs',
            req.body
        );
        res.send(result.data);
    } catch (error) {
        console.log(error);
    }
}
);

export default router;
