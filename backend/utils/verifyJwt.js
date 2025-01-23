const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    try {
    
        const authHeader = req.headers["authorization"];
        
     
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Token missing or invalid format" });
        }

       
        const token = authHeader.split(" ")[1];

      
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden: Invalid token" });
            }

         
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = verifyJWT;
