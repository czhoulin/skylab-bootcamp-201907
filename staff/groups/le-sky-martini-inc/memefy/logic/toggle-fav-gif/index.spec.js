{
    const { random } = Math

    describe('logic - toggle favorite gif', () => {
        const gifId = '3o6nV5VC6LwwZdDzXO'

        let user, credentials

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)

                    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)

                            credentials = response.data
                        })
                })
        })

        it('should succeed on correct gif id', () =>
            logic.toggleFavGif(credentials.id, credentials.token, gifId)
                .then(() =>
                    call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}`, 'get', { 'authorization': `bearer ${credentials.token}` }, undefined)
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)

                            const user = response.data

                            expect(user.id).toBe(credentials.id)

                            const { favorites } = user
                            expect(favorites).toBeDefined()
                            expect(favorites.length).toBe(1)

                            const [favorite] = favorites
                            expect(favorite).toBe(gifId)
                        })
                )
        )

        // TODO refactor
        // it('should fail on non existing id', () => {
        //     expect(() => logic.toggleFavGif('invalid-id', data.token, id, () => {}))
        //         .toThrowError(Error, `user with username ${username} not found`)
        // })

        // TODO refactor
        // it('should fail non existing gif id', () => {
        //     const id = '5c3853aebd1bde8520e66ff9'

        //     logic.toggleFavGif(username, id, error => {
        //         expect(error).toBeDefined()

        //         const { message } = error
        //         expect(message).toBe(`cannot retrieve gif with id ${id}`)

        //         done()
        //     })
        // })

        // TODO test more cases

        describe('when gif already in favorites', () => {
            const gifId = 'GpyS1lJXJYupG'

            let credentials

            beforeEach(() => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: [gifId]
                }

                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)

                        return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)

                                credentials = response.data
                            })
                    })
            })

            it('should succeed on correct gif id', () =>
                logic.toggleFavGif(credentials.id, credentials.token, gifId)
                    .then(() =>
                        call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}`, 'get', { 'authorization': `bearer ${credentials.token}` }, undefined)
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)

                                const user = response.data

                                expect(user.id).toBe(credentials.id)

                                const { favorites } = user
                                expect(favorites).toBeDefined()
                                expect(favorites.length).toBe(0)
                            })
                    )
            )

            // TODO test more cases
        })
    })
}