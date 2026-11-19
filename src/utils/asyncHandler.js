const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err)). /* Promise.resolve() is used to ensure that the requestHandler is always treated as a promise, even if it is not an async function. This allows us to catch any errors that may occur during the execution of the requestHandler and pass them to the next middleware for error handling. */
            catch((err) => next(err))/* The catch() method is used to handle any errors that may occur during the execution of the requestHandler. If an error occurs, it is passed to the next middleware using next(err), which allows for centralized error handling in the Express application. */

    }
}


export { asyncHandler }




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }