import {RegisterOptions} from 'react-hook-form'

const usernameRegisterOptions: RegisterOptions = {
  required: 'Username is required',
  minLength: {
    value: 3,
    message: 'Username must be at least 3 characters long',
  },
  maxLength: {
    value: 20,
    message: 'Username must be at most 20 characters long',
  },
}

const emailRegisterOptions: RegisterOptions = {
  required: 'Email is required',
  pattern: {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: 'Please enter a valid email address',
  },
}

const passwordRegisterOptions: RegisterOptions = {
  required: 'password is required',
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: 'Please enter a valid password',
  },
}

const urlRegisterOptions: RegisterOptions = {
  pattern: {
    value:
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
    message: 'Please enter a valid URL',
  },
}

const titleRegisterOptions: RegisterOptions = {
  required: 'Title is required',
  minLength: {
    value: 3,
    message: 'Please provide a longer title',
  },
  maxLength: 255,
}

const descriptionRegisterOptions: RegisterOptions = {
  required: `Description is required`,
  minLength: {
    value: 10,
    message: `Please provide a longer description`,
  },
  maxLength: 65535,
}

export {
  usernameRegisterOptions,
  emailRegisterOptions,
  passwordRegisterOptions,
  urlRegisterOptions,
  titleRegisterOptions,
  descriptionRegisterOptions,
}
