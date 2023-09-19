/**
 * This file is where we do "rehydration" of your RootStore from AsyncStorage.
 * This lets you persist your state between app launches.
 *
 * Navigation state persistence is handled in navigationUtilities.tsx.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import { applySnapshot, IDisposer } from "mobx-state-tree"
import { RootStore, RootStoreSnapshot } from "../RootStore"

/**
 * The key we'll be saving our state as within async storage.
 */

/**
 * Setup the root state.
 */
let _disposer: IDisposer
export async function setupRootStore(rootStore: RootStore) {
  let restoredState: RootStoreSnapshot | undefined | null

  try {
    // load the last known state from AsyncStorage
    applySnapshot(rootStore, restoredState)
  } catch (e) {
    // if there's any problems loading, then inform the dev what happened
    if (__DEV__) {
      console.tron.error(e.message, null)
    }
  }

  // stop tracking state changes if we've already setup

  const unsubscribe = () => {}

  return { rootStore, restoredState, unsubscribe }
}
