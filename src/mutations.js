export default {
  changeActive (state, active) {
    state.active = active
    try {
      localStorage.active = active
    } catch (e) {
      console.log(e)
    } finally {}
  }
}
