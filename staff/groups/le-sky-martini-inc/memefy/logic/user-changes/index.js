logic.changesUser = function (name, surname, username, password, id, token) {


    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.email(username, 'username')
    validate.string(password, 'password')
    validate.string(id, 'id')
    validate.string(token, 'token')

    // if (password !== user.password ) throw new Error('passwords do not match')
 
return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'authorization': `bearer ${token}`, 'content-type': 'application/json' }, { name, surname, username, password })
// .then(response => {
//     if (response.status === 'OK') throw new Error(response.error)
// })
.then(response => {
    if (response.status === 'KO') throw new Error(response.error)
})
}



// HEADERS SEND TOKEN AND CONTENT TYPE!!!!!!!!!!!!


