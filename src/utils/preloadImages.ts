export const preloadImages = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const imageList = [
      "/assets/poff.png",
      "/images/logo.png",
      "/assets/cloud.png",
      "/images/spinner.svg",

      "/assets/bush/bush.svg",
      "/assets/bush/evilFlower.png",
      "/assets/bush/goodFlower.png",

      "/assets/background.png",

      "/assets/bus/busInside.png",
      "/assets/bus/busOutside.png",

      "/assets/goodCharacters/good.png",
      "/assets/evilCharacters/evil.png",
      "/assets/goodCharacters/goodLookToLeft.png",
      "/assets/goodCharacters/goodLookToRight.png",
    ];

    let loadedCount = 0;
    let totalImages = imageList.length;

    if (totalImages === 0) {
      resolve();
      return;
    }

    imageList.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          resolve();
        }
      };
      img.onerror = (err) => {
        console.error(`Fel vid laddning av bild: ${url}`, err);
        reject(err);
      };
    });
  });
};
