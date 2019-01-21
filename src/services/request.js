import axios from "axios";
import domains from "../util/domain";

const request = {
    get: (url, success, fail) => {
        axios({
            method: 'get',
            url: domains.category + url,
            timeout: 60 * 1000,
        }).then((response) => {
            if (response.data && response.data.code === 0) {
                success && success(response.data.data);
            }
        }).catch((err) => {
            fail && fail(err);
        });
    },
    post: (url, data, success, fail) => {
        axios({
            method: 'post',
            url: domains.category + url,
            data,
            timeout: 60 * 1000,
        }).then((response) => {
            if (response.data && response.data.code === 0) {
                success && success(response.data.data);
            }
        }).catch((err) => {
            fail && fail(err);
        });
    }
};

export default request;