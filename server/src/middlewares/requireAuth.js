module.exports.requireAuth = (req, res, next) => {
    if(req.cookies.token){
        return next();
    }else{
        res.status(401);
        res.json({
            error: "Not Authorized",
            data: null
        })
    }
}