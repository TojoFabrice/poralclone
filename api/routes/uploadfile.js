const router = require("express").Router();
const multer = require('multer'); // Middleware de gestion des fichiers
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/CV/'); //dossier de sauvegarde
    },
    filename: (req, file, cb) => {
        const userId = req.params.userId;
        const fileName = `cv_${userId}.pdf`;
        cb(null, fileName);
    },
});
const upload = multer({ storage })

//Route pour l'upload CV
router.post('/upload-cv/:userId', upload.single('cv'), async (req, res) => {
    try {
        console.log('Fichier CV reçu :', req.file);
        res.json({ message: 'CV uploaded successfully' });
    } catch (error) {
        console.error('Erreur lors de l\'upload du CV :', error);
        res.status(500).json({ message: 'CV upload failed' });
    }
});

//Route pour recuper CV
router.get('/cv/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const filePath = path.join(__dirname, '..', 'uploads/CV', `cv_${userId}.pdf`);
        const fs = require('fs');
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            console.error('Le fichier CV n\'existe pas');
            res.status(404).json({ message: 'CV not found' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du CV :', error);
        res.status(500).json({ message: 'CV retrieval failed' });
    }
})

module.exports = router