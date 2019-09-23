// FUNCTION THAT LOADS THE STATE
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

// FUNCTION TAHT SAVES THE STATE 
 export const saveState = state => {
   try {
     const serializedState = JSON.stringify(state);
     localStorage.setItem('state', serializedState)
   } catch (err) {
     console.log(err)
   }
 }