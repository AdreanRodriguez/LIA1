import { preloadFonts } from "./preloadFonts";
import { preloadImages } from "./preloadImages";

export const preloadAssets = async () => {
  try {
    await Promise.all([preloadFonts(), preloadImages()]);
    // console.log("All assets loaded!");
  } catch (error) {
    console.error("Error preloading assets:", error);
  }
};
