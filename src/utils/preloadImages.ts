export const preloadImages = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 🔥 Dynamiskt importera alla bilder i assets-mappen (PNG, JPG, WEBP, SVG)
    const imageModules = import.meta.glob("../assets/**/*.{png,webp,svg}", { eager: true });

    const imageList = Object.values(imageModules).map((module: any) => module.default);

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
        console.error(`❌ Fel vid laddning av bild: ${url}`, err);
        reject(err);
      };
    });
  });
};
