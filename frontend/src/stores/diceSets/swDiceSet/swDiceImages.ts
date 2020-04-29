// export * as advantage from '../../../assets/images/dice/sw/A.png';
// export * as ability from '../../../assets/images/dice/sw/ability.png';
// export * as abilityA from '../../../assets/images/dice/sw/abilityA.png';
// export * as abilityAA from '../../../assets/images/dice/sw/abilityAA.png';
// export * as abilityBlank from '../../../assets/images/dice/sw/abilityBlank.png';
// export * as abilityS from '../../../assets/images/dice/sw/abilityS.png';
// export * as abilitySA from '../../../assets/images/dice/sw/abilitySA.png';
// export * as abilitySS from '../../../assets/images/dice/sw/abilitySS.png';
// export * as boost from '../../../assets/images/dice/sw/boost.png';
// export * as boostA from '../../../assets/images/dice/sw/boostA.png';
// export * as boostAA from '../../../assets/images/dice/sw/boostAA.png';
// export * as boostBlank from '../../../assets/images/dice/sw/boostBlank.png';
// export * as boostS from '../../../assets/images/dice/sw/boostS.png';
// export * as boostSA from '../../../assets/images/dice/sw/boostSA.png';
// export * as challenge from '../../../assets/images/dice/sw/challenge.png';
// export * as challengeBlank from '../../../assets/images/dice/sw/challengeBlank.png';
// export * as challengeDespair from '../../../assets/images/dice/sw/challengeDespair.png';
// export * as challenge from '../../../assets/images/dice/sw/challenge.png';
// export * as challenge from '../../../assets/images/dice/sw/challenge.png';
// export * as challenge from '../../../assets/images/dice/sw/challenge.png';
// export * as challenge from '../../../assets/images/dice/sw/challenge.png';
// export * as challenge from '../../../assets/images/dice/sw/challenge.png';

/**
 * Notes: Make sure @types/webpack-env is installed.
 */
type RequireContext = __WebpackModuleApi.RequireContext;

/**
 * Defines what the collection of images looks like.
 */
type ImagesRecord = Record<string, string>;

/**
 * Uses webpack's require.context to get all image files.
 */
function getImageContext(): RequireContext {
  return require.context('../../../assets/images/dice/sw', false, /^.+\.png$/);
}

/**
 * Inject all the images from images/* folders using Webpack magic (require.context).
 * We are doing this in lieu of importing each image and manually doing an Object.assign().
 */
function getImages(): ImagesRecord {
  const imageModules = getImageContext();

  const allImages: ImagesRecord = {};

  imageModules.keys().forEach((modulePath) => {
    const imagePath: string = imageModules(modulePath);

    const fileNameMatch = imagePath.match(/\/([^/]+)\.png/);
    if (!fileNameMatch || fileNameMatch.length < 2) {
      return;
    }

    const imageName = fileNameMatch[1];

    allImages[imageName] = imagePath;
  });

  return allImages;
}

// Inject all the images from the folder using Webpack magic (require.context).
export default getImages();
