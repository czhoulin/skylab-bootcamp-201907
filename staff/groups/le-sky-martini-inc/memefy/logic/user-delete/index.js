logic.deleteUser = function (username, password, id, token) {
    
     validate.email(username, 'username')
     validate.string(password, 'password')
     validate.string(id, 'id')
     validate.string(token, 'token')

     if (password.length == 0) throw new Error('you need to write your password for deleting your account')

     if (password !== user.password) throw new Error('password do not match')


return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'delete', { 'authorization': `bearer ${token}`, 'content-type': 'application/json' }, { username, password })
.then(response => {
    if (response.status === 'KO') throw new Error(response.error)
})

}


// HEADERS SEND TOKEN AND CONTENT TYPE!!!!!!!!!!!!
