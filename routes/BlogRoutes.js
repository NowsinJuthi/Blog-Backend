const express = require('express')
const auth = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/',auth, createBlog);
router.get('/',auth, getBlog);
router.put('/:id', auth , updateBlog);
router.delete('/:id', auth, deleteBlog)

export default router;