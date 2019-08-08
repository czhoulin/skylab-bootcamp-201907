{
    const { random } = Math

    fdescribe('logic - changes user', () => {
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

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)
                    else return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                })
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)

                    credentials = response.data
                    console.log("hola" + response.data.name)
                })
        })

        // DOING A MANUAL RETRIEVE CHECKS IF USER EXISTS OR NOT !!!!!!


        it('should succeed on correct changes JAAAAAAAAAAAASMINE!!!', () =>
        logic.registerUser(user.name, user.surname, user.username, user.password, user.password)
            .then(() => call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password }))
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)
                else {
                    data = response.data
                    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'authorization': `bearer ${token}`, 'content-type': 'application/json' }, { name, surname, username, password })
                }
            })
            .then(response => {

                const _user = response.data
                expect(_user.name).toBe(user.name)
                expect(_user.surname).toBe(user.surname)
                expect(_user.username).toBe(user.username)
                expect(_user.password).toBeUndefined()
                expect(_user.id).toBe(data.id)
                expect(_user.favorites).toBeDefined()
                expect(_user.favorites).toEqual(user.favorites)

            })
    )


        it('should succeed on change name and surname', () => {
        return logic.changesUser("changed-name", "changed-surname", user.username, user.password, credentials.id, credentials.token)
        .then(() => call('https://skylabcoders.herokuapp.com/api/user', 'get', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
        .then(response => {
            expect(response.data.name).toBe("changed-name")
            expect(response.data.surname).toBe("changed-name")
        })
        )
        })

        xit('should succeed on matching user with username', () =>
        logic.retrieveUser(credentials.id, credentials.token)
            .then(_user => {
                const { id, name, surname, username, password } = _user

                expect(id).toBe(credentials.id)
                expect(name).toBe(user.name)
                expect(surname).toBe(user.surname)
                expect(username).toBe(user.username)
                expect(password).toBeUndefined()
            })
    )
        


        xit('should succeed on new password', () =>
        logic.changesUser(username, user.password, credentials.id, credentials.token)
        .then(() => call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}`, 'put', {
                'authorization': `bearer ${credentials.token}` }, undefined)
            .then(response =>
                expect(response.status).toBe(`OK`)
            )
            )
        )

    })
}
