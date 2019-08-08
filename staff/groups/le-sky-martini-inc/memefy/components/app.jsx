const { Component } = React

class App extends Component {
    constructor() {
        super()

        let credentials
        const { id, token } = sessionStorage
        id && token && (credentials = { id, token })


        this.state = { view: 'landing', credentials, error: undefined }


        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleGoToRegisterOrLogin = this.handleGoToRegisterOrLogin.bind(this)
        this.handleGoToUserSettings = this.handleGoToUserSettings.bind(this)
        this.handleUserSettings = this.handleUserSettings.bind(this)
        this.handleUserDelete = this.handleUserDelete.bind(this)
    }

    handleUserSettings(name, surname, email, password, id, token) {
        try {
            logic.changesUser(name, surname, email, password, id, token)
                .then(() => this.setState({ view: 'landing' }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleUserDelete (email, password, id, token) {
        try {
            console.log("hellooooo")
            logic.deleteUser(email, password, id, token)
                .then(() => this.setState({ view: 'landing' }))
                .then(console.log("hellooooo2"))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoToUserSettings() {
        this.setState({ view: 'user-settings' })
    }

    handleGoToRegisterOrLogin() {
         this.setState({ view: 'register-or-login' })
     }
 
    handleGoToRegister() {
        this.setState({ view: 'register' })
    }

    handleBackToLanding() {
        this.setState({ view: 'landing' })
    }

    handleRegister(name, surname, email, password, repassword) {
        try {
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => this.setState({ view: 'register-success' }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }

    handleLogin(email, password) {
        try {
            logic.authenticateUser(email, password)
                .then(credentials => {
                    sessionStorage.id = credentials.id
                    sessionStorage.token = credentials.token

                    this.setState({ view: 'landing', credentials })
                })
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogout() {
        delete sessionStorage.id
        delete sessionStorage.token

        this.setState({ credentials: undefined })
    }

    render() {
        const { state: { view, credentials, error }, handleGoToRegister, handleRegister, handleBackToLanding, handleGoToLogin, handleLogin, handleLogout, handleGoToRegisterOrLogin, handleGoToUserSettings, handleUserSettings, handleUserDelete } = this

        return <>
            {view === 'user-settings' && <UserSettings onChanges={handleUserSettings} onDelete={handleUserDelete} onBack={handleBackToLanding} />}

            {view === 'landing' && <Landing onRegister={handleGoToRegister} onRegisterOrLogin={handleGoToRegisterOrLogin} onUserSettings={handleGoToUserSettings} onLogin={handleGoToLogin} credentials={credentials} onLogout={handleLogout} />}
            
            {view === 'register' && <Register onBack={handleBackToLanding} onRegister={handleRegister} error={error} />}

            {view === 'register-success' && <RegisterSuccess onLogin={handleGoToLogin} />}

            {view === 'register-or-login' && <RegisterOrLogin onLogin={handleGoToLogin} onRegister={handleGoToRegister} onBack={handleBackToLanding} />}

            {view === 'login' && <Login onBack={handleBackToLanding} onLogin={handleLogin} error={error} />}
        </>
    }
}


