export const toAbsoluteUrl = pathname => (process.env.PUBLIC_URL + pathname)

export const setupAxios = (axios, store) => {

    let token = localStorage.getItem("auth_token");
    axios.defaults.headers.language = `en`;
    axios.defaults.headers.web_app_version = `1.0.0`;
    axios.defaults.headers.auth_token = '@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#';
    if (token) {
        axios.defaults.headers.auth_token = token;
    }
    axios.interceptors.response.use(null, (err) => {
        if (err.response) {
            if (err.response.status === 401) {
                // store.dispatch(doLogout())
                window.location.href ='/signin'
                localStorage.clear()
                return Promise.reject(err);
            } else return Promise.reject(err);
        } else if (err.request) {
            return Promise.reject({
                response: {
                    data: {
                        message: "Something went wrong, Please try again later!!!"
                    }
                }
            });
        }
    });
}