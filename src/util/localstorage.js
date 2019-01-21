/**
 * 设置本地存储内容
 * 
 */
const set = (key, value) => {
    if (window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    return false;
}

/**
 * 获取本地存储里的内容
 * 
 */
const get = (key) => {
    if (window.localStorage) {
        const data = localStorage.getItem(key);
        if (typeof data === 'string' && data.includes('{')) {
            return JSON.parse(data);
        }
        return data;
    }
    return '';
}

/**
 * 移除本地存储里的内容
 * 
 */
const remove = (key) => {
    if (window.localStorage) {
        localStorage.removeItem(key);
        return true;
    }
    return false;
}

const clear = () => {
    if (window.localStorage) {
        localStorage.clear();
        return true;
    }
    return false;
}

export default {
    get,
    set,
    remove,
    clear
}