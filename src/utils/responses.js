export const fulfilled = (response) => {
    return {
        data: response.data.data,
        status: response.data.statusCode,
        message: response.data.message
    }
}

export const rejected = (err) => {
    return {
        code: err.timestamp || null,
        status: err.status || "unknown",
        message: err.message || err.error || 'An error occurred while processing the request',
        name: err.details || err.name || "NUll"
    }
}