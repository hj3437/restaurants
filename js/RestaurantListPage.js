import { request } from '/js/api.js'
import { onClick } from "/js/clickListener.js"
import RestaurantListEdit from '/js/RestaurantListEdit.js'
import RestaurantListAdd from '/js/RestaurantListAdd.js'

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
            <span class="store-add">스토어 추가</span>
            <ul>
                ${restaurants.map(restaurant => {                    
                    return `                
                            <li data-restaurant-id="${restaurant.id}">
                            <img src="${restaurant.imageUrl.indexOf('http') === 0 ? restaurant.imageUrl : 'https://via.placeholder.com/210x120'}">                                                    
                            <div class="store-wrapper">
                                <div>                           
                                    <h4>${restaurant.name}</h4>
                                    <span>${restaurant.address}</span>
                                </div>
                                <div>
                                    <span class="store-edit">편집</span>
                                    <span class="store-delete">삭제</span>
                                </div>
                            </div>
                        </li>
                    `
                }).join('')}                                    
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

        if (li) {
            const { restaurantId } = li.dataset

            if (e.target.closest('.store-edit')) {
                console.log('EDIT', restaurantId);
                new RestaurantListEdit({ $app, initialState: { restaurantId: restaurantId } })
                return
            }

            if (e.target.closest('.store-delete')) {
                console.log('DELETE', restaurantId);

                const result = confirm('메뉴를 삭제하시겠습니까?')
                if (result) {
                    fetchStoreDelete(restaurantId)
                }
                return
            }

            if (restaurantId) {
                onClick(`/restaurants/${restaurantId}`)
            }
        }

        if (e.target.closest('.store-add')) {
            console.log('Add');
            new RestaurantListAdd({ $app })
        }
    })

    const fetchStoreDelete = async (storeId) => {
        // const BASE_URL = 'http://localhost:8989/api/restaurants'
        const BASE_URL = 'https://dosorme.ga/api/restaurants'
        try {
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            }
            const response = await fetch(`${BASE_URL}/${storeId}`, options)
            if (response.ok) {
                location.reload()
                return response
            }
            throw new Error('Network Error')
        } catch (e) {
            console.error(e.message);
        }
    }
}