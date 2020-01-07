import axios from 'axios'
export default {
  get: (url, params, callback) => {
    axios.get(url, params)
      .then(callback)
      .catch((error) => {
        console.log(error)
      })
      .then(() => {
        console.log('这是会一直执行的')
      })
  },
  post: (url, params, callback, errorHandle) => {
    axios.post(url, params)
      .then(callback)
      .catch(errorHandle)
      .then(() => {
        console.log('这是会一直执行的')
      })
  }
}
