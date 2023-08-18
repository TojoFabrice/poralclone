const router = require("express").Router();
const pool = require("../db")
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenarator')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')

router.get('/get-one-candidat/:userId', authorization, async (req, res) => {
    const user_id = req.params.userId
    try {

        const query = "SELECT u.*, c.* FROM users u LEFT JOIN candidats c ON u.user_id = c.user_id WHERE u.user_id = $1";

        const result = await pool.query(query, [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const userData = result.rows[0];


        // const candidateData = userData.user_id ? {
        //     user_id: userData.user_id,
        //     first_name: userData.first_name,
        //     last_name: userData.last_name,
        //     email: userData.email
        // } : null;

        return res.status(200).json(userData);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

router.put('/update-candidat/:userId', async (req, res) => {
    const user_id = req.params.userId
    try {
        const updatedUserData = req.body.userData;
        const updatedCandidateData = req.body.candidateData;

        ///////////////////////UPDATE USERS/////////////////////

        const updateUserQuery = 'UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING *'

        const { name, email } = updatedUserData

        // check if  user exist (if user exist throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1 AND user_id != $2', [email,user_id]);

        if (user.rows.length !== 0) {
            return res.status(401).json({ status: false, message: "E-mail existe déjà !" })
        }

        const updatedUserResult = await pool.query(updateUserQuery, [name, email, user_id]);
        const updatedUsers = updatedUserResult.rows[0]
        


        ////////////////////////END UPDATE USERS//////////////////////

        if (updatedCandidateData) {
            //CHECK CANDIDAT
            const checkCandidateResult = await pool.query("SELECT candidat_id FROM candidats WHERE user_id = $1", [user_id]);
            const candidateExists = checkCandidateResult.rows.length > 0;

            const { adresse, phone, ville, codepostale, civilite } = updatedCandidateData

            if (candidateExists) {
                const updateCandidateQuery = 'UPDATE candidats SET user_id = $1, adresse = $2, phone_number = $3, ville = $4, codepostale = $5, civilite = $6 WHERE user_id = $1 RETURNING *'

                const updatedCandidateResult = await pool.query(updateCandidateQuery, [user_id, adresse, phone, ville, codepostale, civilite]);

                const updatedCandidate = updatedCandidateResult.rows[0];

                return res.status(200).json({ user: updatedUsers, candidate: updatedCandidate });
            } else {
                const insertCandidateQuery = "INSERT INTO candidats (user_id, adresse, phone_number, ville, codepostale, civilite) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"

                const insertedCandidateResult = await pool.query(
                    insertCandidateQuery,
                    [user_id, adresse, phone, ville, codepostale, civilite]
                );

                const insertedCandidate = insertedCandidateResult.rows[0];

                return res.status(200).json({ user: updatedUsers, candidate: insertedCandidate });
            }
        } else {
            return res.status(200).json({ user: updatedUsers });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour et de l\'insertion des données' });
    }
})

//UPDATE PASSWORD CANDIDAT
router.put('/update-password/:userid', async (req, res) => {
    const user_id = req.params.userid
    const  {newpassword}  = req.body
    console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        const updateQuery = "UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING user_id"

        const updatePasswordValues = [hashedPassword, user_id];

        const result = await pool.query(updateQuery, updatePasswordValues);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        return res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour' });
    }
})

module.exports = router