const app = new Vue({
    el: '#app',
    data: {
        //
        //
        // userData:{
        //     id:null,
        //     login:null,
        //     password:null,
        // },
        //
        //
        //
        //
        //
        // page: "index",
        // res: {},
        // registrationForm: {
        //     name: "",
        //     login: "",
        //     email: "",
        //     phone: "",
        //     password: "",
        // },
        // api_token: "",
        // registrationResponce: null,
        //
        //
        //
        //
        //
        // page:"index",
        // res:{},
        // categories:{},
        //
        // tovars:{},
        // selectCategory:0,
        // selCategory:0,
        // searchInputTovar:"",
        // selectCategory:"",
        //
        //
        //
        // regResponse: null,
        // message:"",
        // registerForm:{
        //    name:"",
        //    login:"",
        //    email:"",
        //    phone:"",
        //    password:""
        // },
        //
        //    message:"",
        //    loginForm:{
        //        login:null,
        //        password:null
        //
        //    },
        server: "http://127.0.0.1:8000/api/",
        services: [],
        doctors: [],
        selectService: 0,
        doctorsByServ: {},
        page: "index",
        jwt: null,
        registrationForm: {
            name: null,
            email: null,
            password: null
        },
        registrationResponce: {
            status: null,
            body: null,
            error: null
        },
        loginForm: {
            email: null,
            password: null
        },
        loginResponse: {
            data: null,
            status: null,
            error: null
        },
        userData: {
            id: null,
            name: null,
            email: null,
            role: null
        }
    },
    methods: {


        // logout() {
        //     fetch("http://jtdgzmn-m1.wsr.ru/prokats/public/api/logout", {
        //         method: "POST",
        //         body: JSON.stringify({
        //             api_token: this.api_token,
        //         }),
        //         headers: { "Content-Type": "application/json;charset=utf-8" },
        //     })
        //         .then((response) =>
        //             response.json().then((data1) => {
        //                 this.registrationResponce = {
        //                     status: response.status,
        //                     body: data1,
        //                 };
        //                 this.api_token = null;
        //                 this.userData.login = null;
        //                 this.userData.password = null;
        //                 console.log(this.registrationResponce.body.message);
        //             })
        //         )
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // },
        // searchTovar(){
        //     fetch('http://jtdgzmn-m1.wsr.ru/prokats/public/api/search?query='+this.searchInputTovar)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //             this.tovars = data;
        //         })
        // },
        // getTovar() {
        //     console.log(4444);
        //     fetch('http://jtdgzmn-m1.wsr.ru/prokats/public/api/tovar')
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //             this.tovars = data;
        //         })
        // },
        // getCategory(){
        //     fetch('http://jtdgzmn-m1.wsr.ru/prokats/public/api/category')
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //             this.categories = data;
        //         })
        // },
        // getTovarByCategory(){
        //     fetch('http://jtdgzmn-m1.wsr.ru/prokats/public/api/category/'+this.selCategory+'/tovar')
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //             this.tovars = data;
        //         })
        // }
        getServices() {
            this.page = "services"
            fetch(this.server + "service")
                .then(res => res.json())
                .then(data => this.services = data)
        },
        getDoctors() {
            this.page = "doctors"
            fetch(this.server + "doctors")
                .then(res => res.json())
                .then(data => this.doctors = data)
        },
        goToSerch() {
            this.page = "searchByService"
            fetch(this.server + "service")
                .then(res => res.json())
                .then(data => this.services = data)
        },
        getDoctorByService() {
            this.page = "searchByService"
            fetch(this.server + 'service/' + this.selectService + '/doctor')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        this.doctorsByServ = data;
                    } else {
                        throw data.data
                    }

                })
                .catch(e => {
                    this.doctorsByServ = {}
                    alert(e);
                })
        },
        register() {
            this.page = "register"
            fetch(this.server + "register/user", {
                method: "POST",
                body: JSON.stringify({
                    name: this.registrationForm.name,
                    email: this.registrationForm.email,
                    password: this.registrationForm.password,
                }),
                headers: {"Content-Type": "application/json;charset=utf-8"},
            })
                .then(res => res.json())
                .then(data => {
                    this.registrationResponce = {
                        status: data?.success,
                        body: data.data,
                        error: data.errors
                    }
                    if (data.success) {
                        this.registrationForm = {}
                        this.jwt = data.data.token.access_token
                    }
                })
        },
        login() {
            this.page = 'login'
            fetch(this.server + "login/user", {
                method: 'POST',
                body: JSON.stringify({
                    email: this.loginForm.email,
                    password: this.loginForm.password,
                }),
                headers: {"Content-Type": "application/json;charset=utf-8"}
            })
                .then(response => response.json())
                .then((data) => {
                    this.loginResponse = {
                        status: data?.success,
                        body: data.data,
                        error: data.errors
                    }
                    if (data.success) {
                        this.loginForm = {}
                        this.jwt = data.data.token.access_token
                    }
                    this.jwt = this.loginResponse.body.token.access_token;
                    this.userData = this.loginResponse.body.user;
                    this.page = "index"
                })
                .catch(e => {
                    console.log(e)
                })

        },
    }
})