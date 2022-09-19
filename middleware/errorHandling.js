
const Handler = {
    CastError: (response) => {
        response.status(400).send({
            error: 'id is malformed'
        })
    },
    ValidationError: (response, error) => {
        response.status(409).send({
            error: error.message
        })
    },
    defaultError: (response) => {
        response.status(500).end()
    }
}

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, response, next) => {
    const handler = Handler[error.name] || Handler.defaultError

    handler(response, error)
}
