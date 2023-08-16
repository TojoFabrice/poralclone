const router = require("express").Router();
const pool = require("../db")
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenarator')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')


//register route
router.post('/register', validInfo, async (req, res) => {
    try {
        //destructure the req.body (name, email, password)

        const { name, email, role, password } = req.body;

        // check if  user exist (if user exist throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

        if (user.rows.length !== 0) {
            return res.status(401).send('user already exist')
        }

        //Bcrypt the user mdp
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //enter the new user inside our bdd

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_role, user_password) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, role, bcryptPassword]
        );
        res.json(newUser.rows[0])

        // generating our jwt token
        // const token = jwtGenerator(newUser.rows[0].user_id);

        //register info cadidat


        // res.json({ token })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

//login route
router.post('/login', validInfo, async (req, res) => {
    try {
        //1. destructure req.body
        // console.log(req);
        const { email, password } = req.body;

        //2. check if user doesn't exist (if not then we trow error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

        if (user.rows.length === 0) {
            return res.status(401).send("User n'existe pas")
        }

        //3 check if incoming password is the same the database password
        const bcryptPassword = user.rows[0].user_password;

        const validpassword = await bcrypt.compare(password, bcryptPassword)

        if (!validpassword) {
            return res.status(401).send("mot de pass incorrecte")
        }

        //4. generating our jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token })


    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})


//Logout
router.post('/logout', authorization, async (req, res) => {
    try {
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(err.message);
        res.status(500).json({ message: 'An error occurred' });
    }
})

router.get('/is-verify', authorization, async (req, res) => {
    try {
        // console.log(req);
        res.json(true)
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;