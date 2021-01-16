export let fetchHeaders = {
    'content-type': 'application/json',
    accepts: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
}