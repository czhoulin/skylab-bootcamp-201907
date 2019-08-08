function DeleteProfile({ onDelete, error }){
    return <>
    <h3>Delete Account</h3>
    <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onDelete(email, password)
            }}>
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>

            <button>Confirm Delete</button>
    </form>
    {error && <Feedback message={error} />}
    </>
}