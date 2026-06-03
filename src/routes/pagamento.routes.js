import { Router } from 'express';
import { criarCheckoutPagBank } from '../controllers/pagamento.controller.js';

const router = Router();

router.post('/checkout', criarCheckoutPagBank);

export default router;