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
  return require.context('../../assets/images/dice/sw', false, /^.+\.png$/);
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
