<<<<<<< HEAD
import express from "express"
import { register, login } from "../controllers/authController.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

=======
import express from "express"
import { register, login } from "../controllers/authController.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

>>>>>>> 20a41d8cbec901779cd33f66c1299dd7445aa4da
export default router