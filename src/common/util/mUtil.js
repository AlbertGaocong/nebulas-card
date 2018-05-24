/*
* 存储localStorage
*/
const setStore = ( key, value) => {
    if( !key) return ;
    if( typeof value !== 'string'){
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key,value);
}
/**
 * 获取localStorage
 */
const getStore = (name) => {
    if ( !name ) return ;
    return window.localStorage.getItem(name);
}
/**
 * 删除localStorage
 */
const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}


export default {setStore , getStore , removeStore}