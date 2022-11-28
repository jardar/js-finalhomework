// API for customer
const APIPATH = "jdstore";


//=== API calls =CRUD naming style==============

function apiCreateOrders({ name, tel, email, address, payment }) {
    return axios.post(
        `https://livejs-api.hexschool.io/api/livejs/v1/customer/${APIPATH}/orders`,
        {
            data: {
                user: {
                    name,
                    tel,
                    email,
                    address,
                    payment
                }
            }
        }
    )
        .then(resp => {
            if (!resp.data?.status) {
                return {
                    ok: false,
                    msg: resp.data?.message || "錯誤"
                }
            }
            return {
                ok: true,
                msg: "成功",
                data: resp.data //orders structure
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}

function apiDeleteAllCarts() {
    return axios.delete(
        `https://livejs-api.hexschool.io/api/livejs/v1/customer/${APIPATH}/carts`
    )
        .then(resp => {
            if (!resp.data?.status) {
                return {
                    ok: false,
                    msg: resp.data?.message || "錯誤"
                }
            }
            return {
                ok: true,
                msg: "成功",
                data: resp.data //empty carts structure
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}

function apiDeleteCarts(cartId) {
    return axios.delete(
        `https://livejs-api.hexschool.io/api/livejs/v1/customer/${APIPATH}/carts/${cartId}`
    )
        .then(resp => {
            if (!resp.data?.status) {
                return {
                    ok: false,
                    msg: resp.data?.message || "錯誤"
                }
            }
            return {
                ok: true,
                msg: "成功",
                data: resp.data //carts structure
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}
function apiCreateCarts(productId, quantity = 1) {
    return axios.post(
        `https://livejs-api.hexschool.io/api/livejs/v1/customer/${APIPATH}/carts`,
        {
            data: {
                productId: productId,
                quantity: quantity
            }
        }
    )
        .then(resp => {
            if (!resp.data?.status) {
                return {
                    ok: false,
                    msg: resp.data?.message || "錯誤"
                }
            }
            return {
                ok: true,
                msg: "成功",
                data: resp.data //carts structure
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}
function apiReadCarts() {
    return axios.get(
        `https://livejs-api.hexschool.io/api/livejs/v1/customer/${APIPATH}/carts`
    )
        .then(resp => {
            if (!resp.data?.status) {
                return {
                    ok: false,
                    msg: resp.data?.message || "錯誤"
                }
            }
            return {
                ok: true,
                msg: "成功",
                data: resp.data
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}
function apiReadProducts() {
    return axios.get(
        `https://livejs-api.hexschool.io/api/livejs/v1/customer/${APIPATH}/products`
    )
        .then(resp => {
            if (!resp.data?.status) {
                return {
                    ok: false,
                    msg: resp.data?.message || "錯誤"
                }
            }
            return {
                ok: true,
                msg: "成功",
                data: resp.data.products
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}