import express from 'express';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import cartRoutes from './cart.routes';
import favoriteRoutes from './favorite.routes';
import orderRoutes from './order.routes';
import reviewRoutes from './review.routes';

const usersRoutes = express.Router();

usersRoutes.use('/user', userRoutes);
usersRoutes.use('/product', productRoutes);
usersRoutes.use('/cart', cartRoutes);
usersRoutes.use('/favorite', favoriteRoutes);
usersRoutes.use('/order', orderRoutes);
usersRoutes.use('/review', reviewRoutes);

export default usersRoutes;