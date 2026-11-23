class ApiError extends Error {
    constructor(/* constructor vaneko chai class ko instance create
         garda call huney function ho,
        yelse class ko properties 
        haru initialize 
        garna use huney ho. */
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack/* The stack property of an error object 
            contains a string representation of the point in the code at which 
            the error was instantiated. It provides information about the sequence of
             function calls that led to the error, 
             which can be useful for debugging purposes. */
        } else {
            Error.captureStackTrace(this, this.constructor)/* Error.captureStackTrace() 
            is a method that creates a stack trace for the error object. It captures the 
            current stack trace and assigns it to the error object's stack property. This allows developers to see where
             the error occurred in the code when debugging. */
        }

    }
}


export { ApiError }

