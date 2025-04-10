export const fulfilled = (response) => {
    return {
        data: response.data,
        status: response.status,
        message: response.message
    }
}

export const rejected = (err) => {
    return {
        code: err.timestamp || null,
        status: err.status || "unknown",
        message: err.message || err.error || 'An error occurred while processing the request',
        name: err.source || err.name || "NUll"
    }
}