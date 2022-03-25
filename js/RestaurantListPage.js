import { request } from '/js/api.js'
import { onClick } from "/js/clickListener.js"

export default function RestaurantListPage({ $app }) {
    $app.innerHTML = ''

    this.state = {}

    const $page = document.createElement('div')
    $page.className = 'StoresPage'
    $app.appendChild($page)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {                
        const { restaurants } = this.state
        if (restaurants) {
            // console.log('레스토랑 목록 렌더링 함수 호출됨');
            // console.log(restaurants);
            $page.innerHTML = `
            <ul>
                ${restaurants.map(restaurant => `                
                    <li data-restaurant-id="${restaurant.id}">
                        <img src="${restaurant.imageUrl ? restaurant.imageUrl : 'https://via.placeholder.com/210x120'}">                        
                        <div>                           
                            <h4>${restaurant.name}</h4>
                            <span>${restaurant.address}</span>
                        </div>
                    </li>
                `).join('')}                                    
            </ul>
            `
        }
    }

    this.fetchRestaurants = async () => {
        try {
            const restaurants = await request()
            this.setState({ ...this.state, restaurants: restaurants })
        } catch (e) {
            console.log(e.message);
        }
    }

    this.fetchRestaurants()
    this.render()

    $page.addEventListener('click', (e) => {
        const li = e.target.closest('li')
        const { restaurantId } = li.dataset
        if (restaurantId) {
            onClick(`/restaurants/${restaurantId}`)
        }
    })
}