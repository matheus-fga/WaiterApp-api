import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { registerUser } from './app/useCases/users/registerUser';
import { authenticate } from './app/useCases/auth/authenticate';

import authMiddleware from './app/middlewares/authMiddleware';

import { Roles } from './app/models/User';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get('/categories', authMiddleware(), listCategories);

// Create category
router.post('/categories', authMiddleware(Roles.ADMIN), createCategory);

// List products
router.get('/products', authMiddleware(), listProducts);

// Create product
router.post('/products', authMiddleware(Roles.ADMIN), upload.single('image'), createProduct);

// Get products by category
router.get('/categories/:categoryId/products', authMiddleware(), listProductsByCategory);

// List orders
router.get('/orders', authMiddleware(), listOrders);

// Create order
router.post('/orders', authMiddleware(), createOrder);

// Change order status
router.patch('/orders/:orderId', authMiddleware(), changeOrderStatus);

// Cancel order
router.delete('/orders/:orderId', authMiddleware(), cancelOrder);

// Register user
router.post('/users', authMiddleware(Roles.ADMIN), registerUser);

// Authenticate
router.post('/auth', authenticate);
