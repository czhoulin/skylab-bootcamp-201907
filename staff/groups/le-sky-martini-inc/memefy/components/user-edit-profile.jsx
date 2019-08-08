function EditProfile(props, {error}){
    return <>
    <h3>Edit Profile</h3>
    <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event

            props.onChanges(name, surname, email, password, repassword)
        }}>
            <label>Name<input type="text" name="name" /></label>
            <label>Surname<input type="text" name="surname" /></label>
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>

            <button>Confirm</button>
    </form>
    {error && <Feedback message={error} />}
    </>
}