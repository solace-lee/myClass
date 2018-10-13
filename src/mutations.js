export default {
  changeActive (state, active) {
    state.active = active
    try {
      localStorage.active = active
    }
    catch (e) {} 
    finally {}
  }
}
