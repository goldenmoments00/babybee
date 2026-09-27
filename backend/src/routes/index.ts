import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth';
import { login, setupSuperAdmin } from '../controllers/authController';
import { createCategory, getCategories, updateCategory, createSubcategory } from '../controllers/categoryController';
import { createProduct, listProducts, getProductDetail, softDeleteProduct } from '../controllers/productController';

const router = Router();

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Auth Routes
router.post('/auth/login', login);
router.post('/auth/setup', setupSuperAdmin); // Secured by SETUP_KEY

// Public Catalog Routes
router.get('/categories', getCategories);
router.get('/products', listProducts);
router.get('/products/:slug', getProductDetail);

// Public AI Route
router.post('/ai/chat', (req, res, next) => require('../controllers/aiController').chatWithBeeBuddy(req, res, next));

// Protected Customer Routes
router.use('/account', authenticate);
router.post('/account/addresses', (req, res, next) => require('../controllers/addressController').createAddress(req, res, next));
router.get('/account/addresses', (req, res, next) => require('../controllers/addressController').getAddresses(req, res, next));
router.delete('/account/addresses/:id', (req, res, next) => require('../controllers/addressController').deleteAddress(req, res, next));

router.post('/orders', authenticate, (req, res, next) => require('../controllers/orderController').createOrder(req, res, next));
router.get('/account/orders', authenticate, (req, res, next) => require('../controllers/orderController').getCustomerOrders(req, res, next));
router.get('/account/orders/:orderNumber', authenticate, (req, res, next) => require('../controllers/orderController').getCustomerOrderDetails(req, res, next));

// Webhook for Payments (Unprotected, verified by signature internally)
router.post('/webhooks/payment', (req, res, next) => require('../controllers/orderController').paymentWebhook(req, res, next));
router.post('/webhooks/shipping', (req, res, next) => require('../controllers/shippingController').shippingWebhook(req, res, next));

// Protected Admin Routes (Require Admin/SuperAdmin)
router.use('/admin', authenticate, requireRole(['ADMIN', 'SUPER_ADMIN']));

router.get('/admin/dashboard', (req, res, next) => require('../controllers/adminController').getDashboardMetrics(req, res, next));
router.get('/admin/customers', (req, res, next) => require('../controllers/adminController').listCustomers(req, res, next));
router.get('/admin/orders', (req, res, next) => require('../controllers/adminController').listOrders(req, res, next));
router.get('/admin/orders/:orderNumber', (req, res, next) => require('../controllers/adminController').getAdminOrderDetail(req, res, next));
router.put('/admin/orders/:orderNumber/status', (req, res, next) => require('../controllers/adminController').updateOrderStatus(req, res, next));
router.post('/admin/orders/:orderNumber/shipment', (req, res, next) => require('../controllers/shippingController').adminCreateShipment(req, res, next));
router.post('/admin/inventory/adjust', (req, res, next) => require('../controllers/adminController').adjustInventory(req, res, next));

// Admin Category Routes
router.post('/admin/categories', createCategory);
router.put('/admin/categories/:id', updateCategory);
router.post('/admin/subcategories', createSubcategory);

// Admin Product Routes
router.post('/admin/products', createProduct);
router.delete('/admin/products/:id', softDeleteProduct);

export default router;
