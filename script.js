class Authentication {
    constructor() {
        this.user = new Map()
        this.init()
    }
    init() {
        this.user.set('sushant@gmail.com', '123456')
        this.user.set('alex@gmail.com', '123')
        this.user.set('arjun@gmail.com', 'password')
    }
    submitHandler() {
        const username = this.documentHelper('username').value
        const password = this.documentHelper('password').value
        if (username.length == 0 || password.length == 0) {
            alert('No input provided')
            return;
        } else if (username.length > 0 && password.length > 0) {
            const type = this.documentHelper('submit_btn').getAttribute('data-actionType')
            if (type == 1)
                this.onLogin({
                    username,
                    password
                })
            else if (type == 2) {
                this.onRegister({
                    username,
                    password
                })
            }
        }

    }
    onLogin(payload) {
        const validUser = this.user.has(payload.username)
        if (!validUser) {
            alert('User does not exist')
        } else {
            if (this.user.get(payload.username) == payload.password) {
                alert('Welcome User')
            } else
                alert('Wrong Credentials')
        }
    }
    onRegister(payload) {
        if (this.user.has(payload.username)) {
            alert('User already exists')
        } else {
            this.user.set(payload.username, payload.password)
            alert('User Registered')
        }
    }
    switchHandler() {
        const type = document.getElementById('submit_btn').getAttribute('data-actionType')
        if (type == 1) {
            this.documentHelper('submit_btn').setAttribute('data-actionType', 2)
            this.documentHelper('submit_btn').innerText = 'REGISTER'
            this.documentHelper('switch_action').innerText = 'Sign in'
            this.documentHelper('header_text').innerText = this.documentHelper('submit_btn').innerText
        } else if (type == 2) {
            this.documentHelper('submit_btn').setAttribute('data-actionType', 1)
            this.documentHelper('submit_btn').innerText = 'SIGN IN'
            this.documentHelper('switch_action').innerText = 'Register'
        }
        this.documentHelper('header_text').innerText = this.documentHelper('submit_btn').innerText
    }
    documentHelper(arg) {
        return document.getElementById(arg);
    }
}



const authHandler = new Authentication()
const authSwitch = () => authHandler.switchHandler()
const submit = () => authHandler.submitHandler()