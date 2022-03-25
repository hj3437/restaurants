import { request } from '/js/api.js'
import { onClick } from "/js/clickListener.js"

export default function RestaurantDetailPage({ $app, initialState }) {
    $app.innerHTML = ''

    this.state = initialState

    const $page = document.createElement('div')
    $page.className = 'StoreDetailPage'
    $app.appendChild($page)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        // console.log(this.state);
        const { store } = this.state
        if (store) {
            $page.innerHTML = `
            <div class="StoreDetailTitle">
                <a href="/restaurants/${store.storeId}">
                    <img src="${store.storeImageUrl ? store.storeImageUrl : 'https://via.placeholder.com/48x48'}">  
                    <h3>${store.storeName} 메뉴</h1>
                </a>
            </div>
            <ul>
                ${store.items.map(item=>`
                <li data-item-id="${item.id}">
                    <img src="${item.imageUrl ? item.imageUrl : 'https://via.placeholder.com/140x120'}"> 
                    <div class="item-info">                        
                        <div>                            
                            <p>${item.name}</p>
                            <p><i>${item.price.toLocaleString('ko-KR')}</i> 원</p>
                        </div>                        
                        <div class="edit-menu">
                            <a href=""><span>편집</span></a>
                            <a href=""><span>삭제</span></a>                        
                        </div>
                    </div>                  
                </li>
                `).join('')}        
            </ul>
        `
        }
    }

    this.fetchRestaurantItem = async () => {
        if (this.state.restaurantId) {
            const store = await request(this.state.restaurantId, 'items')
            this.setState({ ...this.state, store: store })
        }

    }
    if (this.state.restaurantId) {
        this.fetchRestaurantItem()
    }


    this.render()
}