import React, { useState, useEffect, useContext } from 'react'
import Context from '../context'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'


function Home({ history }) {

    const [spaces, setSpaces] = useState()
    const { spaceId, setSpaceId } = useContext(Context)

    useEffect(() => {
        
        (async () =>{
          try {
            const spaces = await logic.retrieveAllSpaces()
            setSpaces(spaces)
          } catch(error) {
            console.log(error.message)
          }
        })()
    },[])

    function handleAddSpace(event) {
        event.preventDefault()

        history.push('/space-register')
    }

    function handleGoToSpace(spaceId) {
        setSpaceId(spaceId)

        history.push(`/spaces/${spaceId}`)
    }

    return <>
        <main class="main"> 
            <section class="home">
                <h1 class="home__title"><span class="main__e">e-</span>cohabitat</h1>
                <h2 class="home__subtitle">Sharing spaces, building communities</h2>

                <div class="home__square">
                    <h3 class="home__space">SPACES</h3>
                    <p class="home__space-add" onClick={handleAddSpace}><i class="fas fa-plus-circle"></i> Add a space</p>
                    

                    {spaces ?
                    <ul class="home__spaces">
                        {spaces.map(space=> {
                        return<>
                            <li id="mySpace" class="home__space-image" data-id={space.id} onClick={() => handleGoToSpace(space.id)} >
                                    <div class="home__space-reveal">
                                        <h4 class="home__space-title">{space.title}</h4>
                                        <p class="home__space-subtitle">Type: {space.type}</p>   
                                        <p class="home__space-address">{space.address}</p>                                     
                                    </div>                  
                                    <figure class="home__space-figure">
                                        <img class="home__space-img" alt="kitchen image" src={space.picture}/>
                                    </figure>          
                            </li>
                        </>
                        }
                        )} 
                    </ul> 
                    :
                    <p class="home__space-message">You haven't registered any spaces yet</p>
                    }
                </div>
            </section>
        </main>
    </>
}

export default withRouter(Home)