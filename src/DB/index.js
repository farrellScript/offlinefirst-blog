import idb from 'idb'

var dbPromise = idb.open('news',2,function(upgradeDb){
    switch(upgradeDb.oldVersion){
        case 0:
            var store = upgradeDb.createObjectStore('news',{
                keyPath:'id'
            })
            store.createIndex('date','date')
        case 1:
            var store = upgradeDb.transaction.objectStore('news')
            store.createIndex('slug','slug')
    }
})