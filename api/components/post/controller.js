const TABLE = 'post';

module.exports = function(injectedStore) {

    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    function listPosts() {
        return store.list(TABLE);
    }

    function addPost(post) {
        return store.upsert(TABLE, post);
    }

    function getPost(id) {
        return store.get(TABLE, id);
    }
    
    return {
        listPosts,
        getPost,
        addPost
    };
}

