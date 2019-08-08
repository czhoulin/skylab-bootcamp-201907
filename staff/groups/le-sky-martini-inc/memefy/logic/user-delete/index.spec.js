{
    const { random } = Math

    fdescribe('logic - delete user', () => {
        let user
        let credentials

        beforeEach(() => {
            user = {
                name: 'LePink-' + random(),
                surname: 'Martini-' + random(),
                username: 'lepinkmartini-' + random() + '@mail.com',
                password: 'zzz-' + random(),
                favorites: []
            }
            console.log(user.name)
            console.log(user.surname)
            console.log(user.username)
            console.log(user.password)

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)
                    else return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                })
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)

                    credentials = response.data
                })
        })

        // DOING A RETRIEVE CHECKS IF THE USER EXISTS OR NOT.
        it('should succeed on delete user', () =>
        logic.deleteUser(user.username, user.password, credentials.id, credentials.token)
        .then(() => call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}`, 'get', {
                'authorization': `bearer ${credentials.token}` }, undefined)
            .then(response =>
                expect(response.error).toBe(`user with id \"${credentials.id}\" does not exist`)
            )
            )
        )


        it("should fail on ")








    })
}
