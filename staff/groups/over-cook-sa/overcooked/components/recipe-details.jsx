function RecipeDetails({ meal: { idMeal, strMeal, strInstructions, strYoutube, strMealThumb, favorite }, onBack, onToggle }) {
    return <div className='wrapper'>
        <h3 className="wrapper__title">{strMeal}</h3> 
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />
        <img className='wrapper__img' src={strMealThumb}/>
        <p className='descText'>{strInstructions}</p>
        <a className='btnGo' href={strYoutube} target="_blank" >VIDEO</a>

        <a className='backButton' href="#" onClick={ event => {
            event.preventDefault()
            onBack()
        }} >Go Back</a>
    </div>
}