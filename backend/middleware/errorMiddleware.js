const notFound = (req, res, next)=>{
    const error = new Error(`Not found - ${req.originUrl}`);
    res.status(404);
    next(error);
}

const errorhandler = (err, req, res, next)=>{
    let statusCode = res.statusCode === 200 ? 500 :res.statusCode;
    let message = err.message;

    //Check for Mongoose bad ObjectId
    if(err.name === "CastError" && err.kind === 'ObjectId'){
        message = `resource not found`;
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production'?" ":err.stack,
    });

};

module.exports = {notFound, errorhandler};
