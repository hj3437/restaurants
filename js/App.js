import RestaurantListPage from '/js/RestaurantListPage.js'
import RestaurantDetailPage from '/js/RestaurantDetailPage.js'
import SearchInput from '/js/SearchInput.js'
import SearchResult from '/js/SearchResult.js'
import LogInPage from '/js/LogInPage.js'
import { initClickEvent } from "/js/clickListener.js"

export default function App({ $app, $header }) {
    this.state = {
        searchResult: [],
        searchKeyword: ""
    }

    const searchInput = new SearchInput({
        $header,
        initState: {
            result: []
        },
        onSearch: async (inputText) => {
            this.setState({ ...this.state, searchKeyword: inputText })
            const BASE_URL = 'http://localhost:8989/api/restaurants/search/'
            const fullUrl = `${BASE_URL}${inputText ? inputText : ''}`
            try {
                const response = await fetch(fullUrl)
                if (response.ok) {
                    const json = await response.json()
                    this.setState({ ...this.state, searchResult: json })
                } else {
                    throw new Error('Network error')
                }
            } catch (e) {
                console.log(e.message);
            }
        }
    })

    const searchResult = new SearchResult({ $header, initState: { currentPage: 1 }, onSearch: {} })

    this.setState = (nextState) => {
        this.state = nextState
        searchResult.setState({ ...this.state, currentPage: 1, searchResult: this.state.searchResult, searchKeyword: this.state.searchKeyword })
    }

    this.router = () => {
        const { pathname } = location

        if (pathname === '/') {
            new RestaurantListPage({ $app })
        } else if (pathname.indexOf('/restaurants/') === 0) {
            const [, , restaurantId] = pathname.split('/')
            new RestaurantDetailPage({
                $app, initialState: {
                    restaurantId: restaurantId
                }
            })
        } else {
            new RestaurantListPage({ $app })
        }
    }

    initClickEvent(this.router)

    this.router()

    window.addEventListener('popstate', this.router)

    $header.addEventListener('click', (e) => {
        if (e.target.closest('.header-login')) {
            new LogInPage({ $app, display: true })
        }
    })
}