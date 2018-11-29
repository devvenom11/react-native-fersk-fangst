/** @module src/navigationDispatcher */

const navigator = new WeakMap();

/** Service for dispatching root-level navigation events */
class NavigationDispatcher {
  setNavigator = (navigatorRef) => {
    navigator.set(this, navigatorRef);
  };

  dispatch = (action) => {
    navigator.get(this).dispatch(action);
  };
}

export default new NavigationDispatcher();
