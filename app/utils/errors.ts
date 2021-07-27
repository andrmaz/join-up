import {AxiosError} from 'axios'

function handleAxiosError(error: AxiosError): void {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('Error Data', error.response.data)
    console.log('Error Status', error.response.status)
    console.log('Error Headers', error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('Error Request', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error Messgae', error.message)
  }
}

function handleUnexpectedError(error: AxiosError): void {
  console.log('Error Config', error.config)
}

export {handleAxiosError, handleUnexpectedError}
