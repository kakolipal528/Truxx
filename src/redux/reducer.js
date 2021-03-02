/*eslint-disable*/
const initialState = {
  auth:false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'loggedin':
      return { auth :true }

    default:
      return { auth :false}
  }
}

export default reducer
