const router = require('express').Router()
const pool = require('../db')
const authorization = require('../middleware/authorization')

router.get('/', authorization, async (req,res) => {
    try {
        // console.log(">>>>>>>>>>>>>>>>>>>>",req);
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.user])
        res.json(user.rows[0])
    } catch (error) {
        res.status(500).json('sever error')
    }
})

module.exports = router