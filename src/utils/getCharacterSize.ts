// // Många olika bilder som ska placeras ut på olika ställen,
// // vill jag kunna bestämma höjd och bredd beroende på vart jag ska ha dom

// export default function getCharacterSize(id: string): { width: string; height: string } {
//   const sizeMap: { [key: string]: { width: string; height: string } } = {
//     "back-left": { width: "50px", height: "50px" },
//     "back-right": { width: "50px", height: "50px" },
//     "bush-left": { width: "50px", height: "50px" },
//     "bush-right": { width: "50px", height: "50px" },
//     "window-1": { width: "50px", height: "50px" },
//     "window-2": { width: "50px", height: "50px" },
//   };

//   return sizeMap[id] || { width: "40px", height: "40px" }; // Standardstorlek om id inte matchar
// }
