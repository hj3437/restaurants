export default function LogInPage({ $app, display }) {
    this.state = display

    const $page = document.createElement('div')
    $page.className = 'LogInPage'
    $app.appendChild($page)

    this.setState = (nextState) => {
        this.state = nextState
        $page.remove()
        this.render()
    }

    this.render = () => {
        console.log(this.state);
        $page.innerHTML = `
        <div class="modal ${!this.state ? 'hidden' : ''}">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <h3>
                    <span class="material-icons-outlined">face</span>
                    스토어 로그인
                </h3>                
                <div>
                    <div>
                        <input id="login-user-id" type ='text' name='id' placeholder='아이디' autocomplete='off' value="admin">                    
                    </div>
                    <div>
                        <input id="login-user-password" type ='password' name='id' placeholder='비밀번호' autocomplete='off' value="admin1232!@#">
                    </div>                    
                </form>
                <div class="login-option-buttons">                    
                    <span class="login-submit">로그인</span>
                    <p class="login-close-button">닫기</p>
                </div>
            </div>
        <div>
        `
    }

    this.render()

    $page.addEventListener('click', (e) => {
        const modal = $page.querySelector('.modal')
        if (e.target.closest('.login-close-button')) {
            modal.classList.add('hidden')
            this.setState(false)
            return
        }

        if (e.target.closest('.modal-overlay')) {
            modal.classList.add('hidden')
            this.setState(false)
            return
        }
    })
}