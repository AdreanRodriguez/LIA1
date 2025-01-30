export const preloadImages = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const imageList = [
      "/assets/poff.svg",
      "/assets/bush.svg",
      "/assets/cloud1.svg",
      "/assets/goodAndEvil.svg",
      "/assets/background.webp",
      "/assets/bus/busInside.png",
      "/assets/bus/busOutside.webp",
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
