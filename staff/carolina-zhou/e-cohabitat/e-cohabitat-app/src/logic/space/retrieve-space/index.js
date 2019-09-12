import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves a space by its id
 * 
 * @param {*} spaceId
 * 
 * @returns {}
*/

export default function(spaceId) {
    
    validate.string(spaceId, 'space id')

    const { id, token } = this.__userCredentials__
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/spaces/${spaceId}`, {
            method: 'get',
            headers: { authorization: `bearer ${token}` }
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { space } = await response.json()
        return space
     })()
}