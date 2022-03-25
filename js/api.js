const BASE_URL = 'https://dosorme.ga/api/restaurants'

export const request = async (restaurantId, itemsId) => {
    try {
        const restaurantUrl = restaurantId ? `/${restaurantId}` : ''        
        let itemUrl = ''        
        if (restaurantUrl) {
            itemUrl = itemsId ? `/${itemsId}` : ''
        }        
        const requestUrl = `${BASE_URL}${restaurantUrl}${itemUrl}`                    
        const response = await fetch(requestUrl)
        if (response.ok) {
            return response.json()
        }
        throw new Error('Network error')
    } catch (e) {
        alert(e.message)
    }
}