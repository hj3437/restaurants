import RestaurantListPage from '/js/RestaurantListPage.js'
import RestaurantDetailPage from '/js/RestaurantDetailPage.js'
import { initClickEvent } from "/js/clickListener.js"

export default function App({ $app }) {
    this.router = () => {
        const { pathname } = location
        console.log(pathname);

        if (pathname === '/') {
            new RestaurantListPage({ $app })                                      
        } else if (pathname.indexOf('/restaurants/') === 0) {
            const [, , restaurantId] = pathname.split('/')            
            new RestaurantDetailPage({
                $app, initialState: {
                    restaurantId: restaurantId
                }
            })
        }else {
            new RestaurantListPage({ $app })
        }
    }

    initClickEvent(this.router)

    this.router()

    window.addEventListener('popstate', this.router)
}