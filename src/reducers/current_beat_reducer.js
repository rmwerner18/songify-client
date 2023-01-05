export const currentBeatReducer = (state = -1, action) => {
 switch (action.type) {
  case 'SET_CURRENT_BEAT':
   return action.beat
  case 'CLEAR_CURRENT_BEAT':
   return -1
  default: 
   return state
 }
}