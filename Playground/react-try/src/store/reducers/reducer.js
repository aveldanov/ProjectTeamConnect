const initialStsate = {
  names: [{
    name: 'Anton1'
  },
  { name: 'Ivan1' }],
  value: 'new1'
}


const reducer = (state = initialStsate, action) => {

  switch (action.type) {
    case 'ADD_NAME':
      console.log('ADDED NAME');

      return state;
    case 'DELETE_NAME':
      console.log('DELETED NAME');

      return state
    default:
      return state
  }


}

export default reducer
