const BASE_URL = 'https://dosorme.ga/api/restaurants'

export const request = async (productId) => {
    try {
        const requestUrl = `${BASE_URL}${productId ? `/${productId}` : ''}`
        const response = await fetch(requestUrl)
        if (response.ok) {
            return response.json()
        }
        throw new Error('Network error')
    } catch (e) {
        alert(e.message)
    }
}