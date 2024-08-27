import express from 'express';
import {
    createCard,
    updateCard,
    getCard,
    getAllCards,
    deleteCard,
    battleCards,
    identifyWeaknessesAndResistances
} from '../controllers/cardController';

const router = express.Router();

router.post('/cards', createCard);
router.put('/cards/:id', updateCard);
router.get('/cards/:id', getCard);
router.get('/cards', getAllCards);
router.delete('/cards/:id', deleteCard);
router.post('/battle', battleCards);
router.get('/cards/:id/weaknesses-resistances', identifyWeaknessesAndResistances);

export default router;