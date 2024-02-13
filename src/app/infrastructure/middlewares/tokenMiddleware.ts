import express from "express";

const jwt = require('jsonwebtoken')
const config = {
    secret: 'secretTokenString',
    tokenLife: 'secretRefreshTokenString',
    refreshTokenSecret: "900",
    refreshTokenLife: "86400",
}

export function TokenMiddleware() {
    return(req: express.Request, res: express.Response, next: express.NextFunction) => {
        const token = req.headers['authorization'].split(" ")[1]
        // decode token

        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ "message": 'Unauthorized access.' });
                }
                next();
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                "message": 'No token provided.'
            });
        }
    }

}