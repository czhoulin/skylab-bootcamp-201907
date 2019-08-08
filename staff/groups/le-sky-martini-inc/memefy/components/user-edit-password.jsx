function EditPassword({onChanges, error }){
    return <>
    <h3>Change Password</h3>
    <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password }, repassword: { value: repassword} } } = event

            onChanges(name, surname, email, password, repassword)
        }}>
            <label>E-mail<input type="email" name="email" /></label>
            <label>Old Password<input type="password" name="password" /></label>
            <label>New Password<input type="password" name="password" /></label>

            <button>Change Password</button>
    </form>
    {error && <Feedback message={error} />}
    </>
}