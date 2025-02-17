export const preloadImages = async (): Promise<void> => {
  const imageList = [
    "/assets/poof.png",
    "/assets/cloud.png",
    "/assets/background.png",
    "/assets/rotateDevice.svg",

    "/images/logo.png",
    "/images/spinner.svg",

    // Eventuellt ta bort i framtiden
    "/assets/instagramLogo.svg",

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

  await Promise.all(
    imageList.map(
      (url) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = (err) => {
            console.error(`Failed to load image: ${url}`, err);
            reject(err);
          };
        })
    )
  );

  // console.log("All images loaded");
};
