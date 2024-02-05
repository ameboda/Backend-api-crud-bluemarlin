import express from "express";



export function StrucutreMiddleware() {
    return (err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {

        if (err instanceof SyntaxError && 'body' in err) {
            res.status(400).json({
                code: 400,
                message: "Revisa la estructura de la petición"
            })
          }
          
          next(err);
    }
}