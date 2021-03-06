const _ = require('lodash')

const watchChain = (cli, chainInterface) => {
  let prevManifest = {}

  chainInterface.subscribe(() => {
    const rootState = chainInterface.getState()
    if (isManifestUpdated(rootState, prevManifest)) {
      const currManifest = getManifestFromState(rootState)
      applyManifestUpdates(cli, prevManifest, currManifest)
      prevManifest = currManifest
    }
  })
}

const isManifestUpdated = (rootState, prevManifest) => {
  const manifest = getManifestFromState(rootState)
  return manifest.deepEqual(prevManifest)
}

const getManifestFromState = rootState => rootState.manifest

const applyManifestUpdates = (cli, prevManifest, currManifest) => {
  const difference = diffManifest(prevManifest, currManifest)

  applyCovenantChanges(cli, difference)
  applyJoinChanges(cli, difference)
  applyRemovedChains(cli, difference)
  applyNewChains(cli, difference)
  applyChildChanges(cli, difference)
}

const diffManifest = (prevManifest, currManifest) => {
  const changes = (object, base) =>
    _.transform(object, (result, value, key) => {
      if (!_.isEqual(value, base[key])) {
        // eslint-disable-next-line
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value
      }
    })
  return changes(currManifest, prevManifest)
}

const applyCovenantChanges = (cli, difference) => {
  const isCovenantDifferent = difference.covenants
  if (isCovenantDifferent) {
    // For each changed covenant...
    // - Deploy the packed covenant ?
    // - Put it in the file layer but only if we're root?
    //
    // Blocked on cascading deployment spec #258
    //
    // I suspect that the thing to do is apply a rootWatcher for
    // thing watches that are cli specific (ie. deployCovenant, updating
    // static apps, root chain stuff) and a watcher for each child chain
    // to apply the changes from the root.
  }
}

const applyJoinChanges = (cli, difference) => {
  // TODO: Actually use the specified chainInterfaces
  const rootState = cli.getState()
  const MY_CHAIN_ID = rootState.interbit.chainId
  const isJoinsDifferent = difference.manifest[MY_CHAIN_ID].joins
  if (isJoinsDifferent) {
    // Re: Blocked on #258
    // This one to me is DEFINITELY in the camp of chain specific watcher...
    // This differentiation of the watcher types stems from the manifest
    // structure not being repeated exactly.
    //
    // The root of the manifest contains extra information that is not useful
    // to child chains such as file locations of covenants (for loading into
    // the file layer/deploying) and genesis blocks (for creating new chains)
    //
    // These root level manifest changes are ONLY in the root chain (hah)
    // As such, the interbit-core-buffer needs to be able to tell it is the root chain
    // and pass itself it's own portion of the manifest tree to watch.
  }
}

const applyRemovedChains = (cli, difference) => {
  // TODO: This is not included in the diffing function hmmmm...
  //
  // Re: Blocked on #258
  // This belongs in the root cli watcher
}

const applyNewChains = (cli, difference) => {
  // Re: Blocked on #258
  // This belongs in the root cli watcher
}

const applyChildChanges = (cli, difference) => {
  // Dispatch SET_MANIFEST with subset of manifest to each child specified in manifest
  //
  // Re: Blocked on #258
  // This belongs to the chain specific watcher
}

module.exports = {
  watchChain,
  diffManifest
}
