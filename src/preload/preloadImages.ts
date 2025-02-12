export const preloadImages = async (): Promise<void> => {
  const imageList = [
    "/assets/poof.png",
    "/images/logo.png",
    "/assets/cloud.png",
    "/images/spinner.svg",
    "/assets/background.png",

    "/assets/bush/bush.png",
    "/assets/bush/evilFlower.png",
    "/assets/bush/goodFlower.png",

    "/assets/bus/busInside.png",
    "/assets/bus/busOutside.png",

    "/assets/goodCharacters/good.png",
    "/assets/evilCharacters/evil.png",
    "/assets/goodCharacters/goodPeace.png",
    "/assets/evilCharacters/evilPeace.png",
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
