import idb from 'idb'
import axios from 'axios'
import {
    UPDATE_PRODUCT_STORE,UPDATE_STORE,POPULATE_STORE,GET_BY_SLUG,SEND_ROUTER_PROPS, GET_LATEST_POST,UPDATE_CURRENT
} from './types'

export const getBySlug = (slug) => {
    return (dispatch) => {
        console.log('slug',slug)
        var dbPromise = idb.open('news')
        dbPromise.then(function(db){
            var tx = db.transaction('news','readwrite')
            var store = tx.objectStore('news')
            var articleIndex = store.index('slug');
            return articleIndex.get(slug)
        }).then(function(item){
            setCurrent(dispatch,item)
        })
    }
}

export const populateStore = (page) => {
    return (dispatch) => {
        var dbPromise = idb.open('news')
        dbPromise.then(function(db){
            var tx = db.transaction('news','readwrite')
            var store = tx.objectStore('news')
            var dateIndex = store.index('date')
            dateIndex.getAll().then((res)=>{
                console.log('populate store res',res)
                updateStore(dispatch,res,res.length);
            })
        })
    }
}

export const updateProductStore = (page) => {
    return (dispatch) => {
        axios.get('/newsitem.json').then((response)=>{
            console.log('axios response',response.data.data)
            idb.open('news').then((db)=>{
                var tx = db.transaction('news','readwrite')
                var store = tx.objectStore('news')
                var dateIndex = store.index('date')
                response.data.data.forEach(function(item){
                    store.put(item)
                })
                dateIndex.getAll().then((res)=>{
                    console.log('dateindex',res)
                    updateStore(dispatch,res,res.length);
                })      
            })
        })

      };    
}

export const getLatestPost = (slug) => {
    return (dispatch) => {
        axios.get(`/newsitem/${slug}.json`).then((response)=>{
            idb.open('news').then((db)=>{
                var tx = db.transaction('news','readwrite')
                var store = tx.objectStore('news')
                store.put(response.data)
                store.get(response.data.id).then((res)=>{
                    updateCurrent(dispatch,res);
                })      
            })
        })

      };    
}

export const sendRouterProps = (item) =>{
    return{
        type: SEND_ROUTER_PROPS,
        payload: {
            id: item.id,
            date: item.date,
            title: item.title,
            body: item.body,
            url: item.url,
            slug: item.slug
        }
    }
}

const updateCurrent = (dispatch,item) => {
    dispatch({
        type: UPDATE_CURRENT,
        payload: item
    })
}

const setCurrent = (dispatch,item) => {
    dispatch({
        type: GET_BY_SLUG,
        payload:item
    })
}

const updateStore = (dispatch,values) => {
    dispatch({
        type: UPDATE_STORE,
        payload:values
    })
}