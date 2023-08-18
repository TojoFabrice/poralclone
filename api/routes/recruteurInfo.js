const router = require("express").Router();
const pool = require("../db")
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenarator')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')

router.get('/get-one-recruteur/:userId', authorization, async (req, res) => {
    const user_id = req.params.userId
    try {

        const query = "SELECT u.*, r.* FROM users u LEFT JOIN recruteurs r ON u.user_id = r.user_recruteur_id WHERE u.user_id = $1";

        const result = await pool.query(query, [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Recruteur non trouvé' });
        }

        const userData = result.rows[0];

        const data_reseaux_sociaux_json = userData.reseaux_sociaux;
        const data_reseaux_sociaux = JSON.parse(data_reseaux_sociaux_json);

        const final_data = {
            user_id: userData?.userId,
            user_name: userData?.user_name,
            user_email: userData?.user_email,
            user_role: userData?.user_role,
            user_password: userData?.user_password,
            recruteur_id: userData?.recruteur_id,
            user_recruteur_id: userData?.user_recruteur_id,
            site_web: userData?.site_web,
            siege_social: userData?.siege_social,
            effectif: userData?.effectif,
            secteur: userData?.secteur,
            apropos: userData?.apropos,
            reseaux_sociaux: data_reseaux_sociaux
        }

        return res.status(200).json(final_data);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

router.put('/update-recruteur/:userId', async (req, res) => {
    const user_id = req.params.userId
    try {
        const updatedUserData = req.body.userData;
        const updatedRecruteurData = req.body.recruteurData;

        ///////////////////////UPDATE USERS/////////////////////

        const updateUserQuery = 'UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING *'

        const { name, email } = updatedUserData

        // const user = await pool.query('SELECT * FROM users WHERE user_email = $1 AND user_id != $2', [email,user_id]);

        // if (user.rows.length !== 0) {
        //     return res.status(401).send('user already exist')
        // }

        const updatedUserResult = await pool.query(updateUserQuery, [name, email, user_id]);
        const updatedUsers = updatedUserResult.rows[0]

        ////////////////////////END UPDATE USERS//////////////////////

        if (updatedRecruteurData) {
            //CHECK CANDIDAT
            const checkRecruteurResult = await pool.query("SELECT recruteur_id FROM recruteurs WHERE user_recruteur_id = $1", [user_id]);
            const recruteurExists = checkRecruteurResult.rows.length > 0;

            const { site_web, siege_social, effectif, secteur, apropos, reseaux_sociaux } = updatedRecruteurData

            const data_reseaux_sociaux = {
                facebook: reseaux_sociaux?.facebook,
                linkedin: reseaux_sociaux?.linkedin,
                twitter: reseaux_sociaux?.twitter,
            }

            const data_reseaux_sociaux_json = JSON.stringify(data_reseaux_sociaux)

            if (recruteurExists) {
                const updateRecruteurQuery = 'UPDATE recruteurs SET user_recruteur_id = $1, site_web = $2, siege_social = $3, effectif = $4, secteur = $5, apropos = $6, reseaux_sociaux = $7 WHERE user_recruteur_id = $1 RETURNING *'

                const updatedRecruteurResult = await pool.query(updateRecruteurQuery, [user_id, site_web, siege_social, effectif, secteur, apropos, data_reseaux_sociaux_json]);

                const updatedRecruteur = updatedRecruteurResult.rows[0];

                return res.status(200).json({ user: updatedUsers, candidate: updatedRecruteur });
            } else {
                const insertRecruteurQuery = "INSERT INTO recruteurs (user_recruteur_id, site_web, siege_social, effectif, secteur, apropos, reseaux_sociaux) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"

                const insertedRecruteurResult = await pool.query(
                    insertRecruteurQuery,
                    [user_id, site_web, siege_social, effectif, secteur, apropos, data_reseaux_sociaux_json ]
                );

                const insertedRecruteur = insertedRecruteurResult.rows[0];

                return res.status(200).json({ user: updatedUsers, candidate: insertedRecruteur });
            }
        } else {
            return res.status(200).json({ user: updatedUsers });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour et de l\'insertion des données' });
    }
})

module.exports = router