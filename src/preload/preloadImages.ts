async function preloadImage(url: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load ${url}`));
  });
}

export const preloadImages = async () => {
  const imageList = [
    "/images/logo.png",
    "/images/spinner.svg",

    "/assets/poof.png",
    "/assets/background.png",
    "/assets/rotateDevice.svg",

    "/assets/bus/busInside.png",
    "/assets/bus/busOutside.png",

    "/assets/bush/bush.png",
    "/assets/bush/evilFlower.png",
    "/assets/bush/goodFlower.png",

    "/assets/evilCharacters/evil.png",
    "/assets/evilCharacters/evilPeace.png",
    "/assets/evilCharacters/horizontalEvil.svg",

    "/assets/goodCharacters/good.png",
    "/assets/goodCharacters/goodPeace.png",
    "/assets/goodCharacters/goodLookToLeft.png",
    "/assets/goodCharacters/goodLookToRight.png",
  ];

  try {
    await Promise.all(imageList.map(preloadImage));
    // console.log("All images preloaded");
  } catch (error) {
    console.error("Error preloading images:", error);
  }
};
