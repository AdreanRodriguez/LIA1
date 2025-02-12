export const preloadFonts = async (): Promise<void> => {
  const fontList = [
    { family: "DosisRegular", src: "/assets/fonts/dosis-v18-latin-regular.woff2" },
    { family: "DosisSemiBold", src: "/assets/fonts/dosis-v18-latin-600.woff2" },
    { family: "DosisBold", src: "/assets/fonts/dosis-v18-latin-700.woff2" },
    { family: "DosisExtraBold", src: "/assets/fonts/dosis-v18-latin-800.woff2" },
    { family: "krita", src: "/assets/fonts/chawp.otf" },
  ];

  await Promise.all(
    fontList.map(({ family, src }) => {
      const font = new FontFace(family, `url(${src})`);
      document.fonts.add(font);
      return font.load();
    })
  );
  // console.log("All fonts loaded");
};
