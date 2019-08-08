function UserSettings({ onChanges, onDelete, onBack, error }) {
    return <>
    <h1>UserSettingsPanel</h1>
    <EditProfile onChanges={onChanges} error={error}/>
    <EditPassword onChanges={onChanges} error={error}/>
    <DeleteProfile onDelete={onDelete} error={error}/>

    
            <a href="" onClick={event => {
                event.preventDefault()
                onBack()     // Hacer que sea -> Go back to results. Go back genuino.
            }}>Go Home</a>
    </>
}
