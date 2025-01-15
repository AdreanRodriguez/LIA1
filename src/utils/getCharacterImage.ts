import EvilBackLeft from "../assets/Characters/EvilBackLeft.png";
import EvilBackRight from "../assets/Characters/EvilBackRight.png";
import EvilWindow1 from "../assets/Characters/EvilWindow1.png";
import EvilWindow2 from "../assets/Characters/EvilWindow2.png";
import EvilBushLeft from "../assets/Characters/EvilBushLeft.png";
import EvilBushRight from "../assets/Characters/EvilBushRight.png";

import GoodBackLeft from "../assets/Characters/GoodBackLeft.png";
import GoodBackRight from "../assets/Characters/GoodBackRight.png";
import GoodWindow1 from "../assets/Characters/GoodWindow1.png";
import GoodWindow2 from "../assets/Characters/GoodWindow2.png";
import GoodBushLeft from "../assets/Characters/GoodBushLeft.png";
import GoodBushRight from "../assets/Characters/GoodBushRight.png";

const CharacterImages = {
  "back-left": {
    good: GoodBackLeft,
    evil: EvilBackLeft,
  },
  "back-right": {
    good: GoodBackRight,
    evil: EvilBackRight,
  },
  "window-1": {
    good: GoodWindow1,
    evil: EvilWindow1,
  },
  "window-2": {
    good: GoodWindow2,
    evil: EvilWindow2,
  },
  "bush-left": {
    good: GoodBushLeft,
    evil: EvilBushLeft,
  },
  "bush-right": {
    good: GoodBushRight,
    evil: EvilBushRight,
  },
};

export function getCharacterImage(id: keyof typeof CharacterImages, type: "good" | "evil"): string {
  return CharacterImages[id][type];
}
