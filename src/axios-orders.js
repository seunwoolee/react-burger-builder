import axios from 'axios'

const instace =  axios.create({
    baseURL: 'https://react-burger-builder-ab747.firebaseio.com/'
})

export default instace
