const express = require("express");
const router = express.Router();
const { register, login , forgotPassword , resetPassword} = require("../controllers/authController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);



router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // Option 1: Redirect with token as query parameter
      res.redirect(`https://pangea-tech-frontend.onrender.com/auth/callback?token=${token}`);


      // Option 2: Send JSON response (uncomment if you prefer this approach)
      // res.json({
      //   success: true,
      //   token,
      //   user: {
      //     id: req.user._id,
      //     email: req.user.email
      //   }
      // });
    } catch (error) {
      console.error("Callback Error:", error);
      return res.redirect("https://pangea-tech-frontend.onrender.com/login?error=server_error");
    }
  }
);

module.exports = router;
