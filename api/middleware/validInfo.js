module.exports = function (req, res, next) {
    const {role, email, name, password } = req.body;

    function validEmail(userEmail){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
    }

    if (req.path === "/register"){
        if(![role, email, name, password].every(Boolean)) {  //valeur email, name, password soit null ou undefined ou falsy
            return res.status(401).json("missing credentials")
        }else if (!validEmail(email)){
            return res.status(401).json('Ivalid email')
        }
    }
    else if (req.path == '/login'){
        if(![email, password].every(Boolean)) {  //valeur email, name, password soit null ou undefined ou falsy
            return res.status(401).json("missing credentials")
        }else if (!validEmail(email)){
            return res.status(401).json('Ivalid email')
        }
    }

    next();
}