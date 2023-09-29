const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}


const getItem = (key) => {
    try {
        const value = JSON.parse(localStorage.getItem(key));

        if (value) { 
            return value;
        } else {
            return null;
        }
    } catch (err) {
        return null
    }
    
}

const removeItem = (key) => {
    const value = localStorage.removeItem(key);
}

export default {
    setItem, 
    getItem,
    removeItem
}