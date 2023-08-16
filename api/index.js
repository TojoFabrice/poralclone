const express = require('express')
const app = express()
const cors = require('cors')

//middleware
app.use(express.json()); //req.body
app.use(cors());

//ROUTE


//register and login routes for candidat
app.use('/candidat', require("./routes/jwtAuth"))

//register routes for recruteur
app.use('/recruteur', require("./routes/jwtAuth"))

//Update info candidat
app.use('/candidat-info', require("./routes/candidatInfo"))

//Route add CV
app.use('/api', require('./routes/uploadfile'))

//register and login routes for recruteur
// app.use('/recruteur', require("./routes/jwtAuthRecruteur"))

//route dashboard
app.use('/dashboard', require("./routes/dashboard"))

app.listen(5000, () => {
    console.log("server is running on port 5000");
})