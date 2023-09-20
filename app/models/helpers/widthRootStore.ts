import { getRoot, IStateTreeNode } from "mobx-state-tree"
import { RootStore, RootStoreModel } from "../RootStore"

export const withRootStore = (self: IStateTreeNode) => ({
  views: {
    /**
     * The root store.
     */
    get rootStore(): RootStore {
      return getRoot<typeof RootStoreModel>(self)
    },
  },
})
