function Search(props) {
    return <>
    
    <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query)
    }}>
        <input type="text" placeholder="SEAAAAARCH" name="query" />
        <button>🔍</button>
    </form>

    
<div>
<ul><li>Option 1</li><li>Option 2</li><li>Option 3</li></ul>
</div>


<div>GiF TV LINK BANNER</div>

</>
}