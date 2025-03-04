export const preloadFonts = async (): Promise<void> => {
  const fontList = [
    { family: "krita", src: "/fonts/chawp.otf" },
    { family: "DosisBold", src: "/fonts/dosis-v18-latin-700.woff2" },
    { family: "DosisSemiBold", src: "/fonts/dosis-v18-latin-600.woff2" },
    { family: "DosisExtraBold", src: "/fonts/dosis-v18-latin-800.woff2" },
    { family: "DosisRegular", src: "/fonts/dosis-v18-latin-regular.woff2" },
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
