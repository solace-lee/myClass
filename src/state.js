let defaultActive = 0
try {
  if (localStorage.active) {
    defaultActive = localStorage.activ
  }
} catch (e) {}

export default {
  active: defaultActive
}
