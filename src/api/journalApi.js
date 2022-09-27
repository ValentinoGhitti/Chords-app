import axios from 'axios'

const journalApi = axios.create({
  baseURL: 'https://journal-app-e6c9e-default-rtdb.firebaseio.com'
})

export default journalApi