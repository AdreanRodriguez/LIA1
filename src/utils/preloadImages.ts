export const preloadImages = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const imageList = [
      "/assets/poff.png",
      "/assets/bush.svg",
      "/assets/cloud.png",
      "/assets/background.png",
      "/assets/bus/busInside.png",
      "/assets/bus/busOutside.png",
      "/assets/goodCharacters/good.png",
      "/assets/evilCharacters/evil.png",
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
