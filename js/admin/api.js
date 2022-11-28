// API for admin
const APIPATH = "jdstore";
const token = "xGeIZObKKSdw5ssN5Bk7UJJZpD23"

function apiDeleteOrders(orderId) {
    return axios.delete(
        `https://livejs-api.hexschool.io/api/livejs/v1/admin/${APIPATH}/orders/${orderId}`,
        {
            headers: {
                'Authorization': token
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
                msg: resp.data.message || "成功",
                data: resp.data.orders
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}
function apiDeleteAllOrders() {
    return axios.delete(
        `https://livejs-api.hexschool.io/api/livejs/v1/admin/${APIPATH}/orders`,
        {
            headers: {
                'Authorization': token
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
                msg: resp.data.message,
                data: resp.data.orders
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}
function apiUpdateOrders(orderId, paidOrNot) {
    return axios.put(
        `https://livejs-api.hexschool.io/api/livejs/v1/admin/${APIPATH}/orders`,
        {
            data: {
                id: orderId,
                paid: paidOrNot
            }
        },
        {
            headers: {
                'Authorization': token
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
                data: resp.data.orders
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}

function apiReadOrders() {
    return axios.get(
        `https://livejs-api.hexschool.io/api/livejs/v1/admin/${APIPATH}/orders`,
        {
            headers: {
                'Authorization': token
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
                data: resp.data.orders
            }
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.response.data?.message || "錯誤"
            }
        })
}