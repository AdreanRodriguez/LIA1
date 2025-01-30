import { gameOver } from "../utils/gameOver";
import { startGame } from "../utils/startGame";
import { positions } from "../utils/positions";
import { useState, useEffect, useRef } from "react";
import { CharacterType } from "../types/characterType";
import { preloadImages } from "../utils/preloadImages";

export function useGameLogic(
  maxCharacters: number,
  spawnInterval: number,
  isGameStarted: boolean,
  goodCharacterProbability: number
) {
  const activeTimeouts = useRef<number[]>([]); // Behåller värden över renders
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameReady, setIsGameReady] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImages();
        setIsGameReady(true);
        console.log("Bilderna har laddat färdigt!");

        // Vänta tills "window.ClubHouseGame" är redo och kalla gameLoaded()
        // if (window.ClubHouseGame?.gameLoaded) {
        //   console.log("ClubHouseGame found, calling gameLoaded...");
        //   window.ClubHouseGame.gameLoaded({ hideInGame: true });
        // } else {
        //   console.warn("ClubHouseGame not available.");
        // }
      } catch (err) {
        console.error("Fel vid laddning av bilder:", err);
      }
    };

    loadImages();

    return () => {
      activeTimeouts.current.forEach(clearTimeout);
      activeTimeouts.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isGameStarted || isGameOver) {
      updateCharacters(() => []); // Rensar karaktärer när spelet slutar
    }

    if (!isGameStarted) return;
    // Startar spelet och spawnar karaktärer
    const interval = setInterval(spawnRandomCharacter, spawnInterval);

    return () => {
      clearInterval(interval);
      activeTimeouts.current.forEach(clearTimeout);
      activeTimeouts.current = [];
    };
  }, [isGameStarted, isGameOver]);

  function spawnRandomCharacter() {
    if (characters.length >= maxCharacters || isGameOver) return;

    const availablePositions = positions.filter(
      (pos) => !characters.some((char) => char.id && char.id === pos.id)
    );

    if (availablePositions.length === 0) {
      console.warn("No available positions to spawn a character.");
      return;
    }

    const randomPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const randomType = Math.random() < goodCharacterProbability ? "good" : "evil";

    // Tilldela rätt animation baserat på position
    let animation = "";
    if (randomPosition.id.startsWith("window")) {
      animation = "slide-up";
    } else if (randomPosition.id === "under-bus") {
      animation = "slide-under-bus";
    } else if (randomPosition.id === "bus-left") {
      animation = "slide-right-to-left";
    } else if (randomPosition.id === "bus-right") {
      animation = "slide-left-to-right";
    }

    const newCharacter: CharacterType = {
      animation,
      visible: true,
      type: randomType,
      id: randomPosition.id,
      clickedCharacter: false,
      angle: randomPosition.angle,
      score: randomType === "evil" ? 10 : 0,
    };

    updateCharacters((prev) => [...prev, newCharacter]);

    // Ta bort karaktären efter 1.5 sekunder
    const timeoutId = setTimeout(() => {
      updateCharacters((prev) => prev.filter((char) => char.id !== newCharacter.id));
    }, 1500);
    activeTimeouts.current.push(timeoutId);
  }

  // Kanske göra så att den gode stannar lite längre ?

  function handleCharacterClick(character: CharacterType) {
    // Hindrar dubbelklick
    if (character.clickedCharacter) return;

    updateCharacters((prev) =>
      prev.map((char) => (char.id === character.id ? { ...char, clickedCharacter: true } : char))
    );

    if (character.type === "good") {
      gameOver(score);
      setIsGameOver(true);
    } else if (character.type === "evil") {
      const finalScore = score + character.score;

      console.log("Setting ClubHouseGame score:", finalScore);
      window.ClubHouseGame?.setScore(finalScore);

      // Testa att hämta poängen direkt efter
      setTimeout(() => {
        console.log("ClubHouseGame current score:", window.ClubHouseGame?.getScore());
      }, 1000);

      setScore(finalScore);
    }
  }

  function updateCharacters(characterUpdater: (prev: CharacterType[]) => CharacterType[]) {
    setCharacters((prev) => {
      const updated = characterUpdater(prev);
      // Säkerställ att alla karaktärer har unika ID:n
      const uniqueCharacters = updated.filter(
        (character, index, self) => index === self.findIndex((char) => char.id === character.id)
      );
      return uniqueCharacters;
    });
  }

  // Återställer spelplanen
  function restartGame() {
    startGame();
    setScore(0);
    setIsGameOver(false);
    updateCharacters(() => []); // Rensar karaktärer vid omstart
  }

  return { characters, score, isGameOver, handleCharacterClick, restartGame, isGameReady };
}
