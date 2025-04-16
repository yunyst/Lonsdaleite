export default {
  onTabItemTap(e) {
    // console.log("e", e)
    this.$store.commit('navigation/UPDATE_LAST_TAB', e.index);
  }
};