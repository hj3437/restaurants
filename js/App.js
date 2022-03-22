import RestaurantListPage from '/js/RestaurantListPage.js'

export default function App({ $app }) {
    this.router = () => {
        const { pathname } = location
        console.log(pathname);

        if (pathname === '/') {
            new RestaurantListPage({ $app })
        }
    }

    this.router()
}