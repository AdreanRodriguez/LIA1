import { positions } from "../utils/positions";
import { useState, useEffect, useRef } from "react";
import { CharacterType } from "../types/characterType";
import { preloadImages } from "../utils/preloadImages";
import { updateGameState, GameState } from "../utils/gameLogic";

export function useGameLogic(maxCharacters: number, isGameStarted: boolean) {
  const activeTimeouts = useRef<number[]>([]);

  // Spelets tillstånd
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    timeLeft: 15, // Startar med 15 sekunder
    isGameOver: false,
    spawnInterval: 1000, // sekund mellan varje spawn
    animationDuration: 3.5, // Börja med 3.5 sekunder
    goodCharacterProbability: 0.2, // Börja med 20% sannolikhet för goda karaktärer
  });

  // const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [isGameReady, setIsGameReady] = useState<boolean>(false);
  const [activeCharacters, setActiveCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImages();
        setIsGameReady(true);
        console.log("GAMELOAD", window.ClubHouseGame.gameLoaded);
      } catch (err) {
        console.error("Fel vid laddning av bilder:", err);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!isGameStarted || gameState.isGameOver) {
      setActiveCharacters([]);
      return;
    }

    // Spawnar en karaktär varje spawnInterval
    const spawnInterval = setInterval(spawnRandomCharacter, gameState.spawnInterval);

    // Timer som räknar ner varje sekund
    const timerInterval = setInterval(() => {
      setGameState((prev) => {
        const newTime = prev.timeLeft - 1;
        if (newTime <= 0) {
          return { ...prev, timeLeft: 0, isGameOver: true };
        }
        return { ...prev, timeLeft: newTime };
      });
    }, 1000);

    // Rensa timers när spelet avslutas eller startas om
    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);

      // Rensa alla sparade timeouts för att undvika buggar
      activeTimeouts.current.forEach(clearTimeout);
      activeTimeouts.current = [];
    };
  }, [isGameStarted, gameState.isGameOver, gameState.spawnInterval, gameState.animationDuration]);

  function spawnRandomCharacter() {
    if (activeCharacters.length >= maxCharacters || gameState.isGameOver) {
      return;
    }

    // Skapa en lista över lediga platser
    const occupiedPositions = new Set(activeCharacters.map((char) => char.id));
    const availablePositions = positions.filter((pos) => !occupiedPositions.has(pos.id));

    // Finns inga lediga platser, avsluta.
    if (availablePositions.length === 0) {
      return;
    }

    // Välj en slumpmässig ledig position
    const randomPositionIndex = Math.floor(Math.random() * availablePositions.length);
    const randomPosition = availablePositions[randomPositionIndex];

    // Dynamiskt bestämma om karaktären är god eller ond
    const randomType = Math.random() < gameState.goodCharacterProbability ? "good" : "evil";

    // Välj rätt animation
    let animation = "";
    if (
      randomPosition.id.startsWith("window") ||
      randomPosition.id === "bush-right" ||
      randomPosition.id === "bush-left"
    ) {
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
      animationDuration: gameState.animationDuration,
    };

    setActiveCharacters((prev) => [...prev, newCharacter]);

    // Ta bort karaktären efter animationens längd
    setTimeout(() => {
      setActiveCharacters((prev) => prev.filter((char) => char.id !== newCharacter.id));
    }, newCharacter.animationDuration * 1000);
  }

  function handleCharacterClick(character: CharacterType) {
    if (!character.visible) return;
    // förhindra dubbelklick
    if (character.clickedCharacter) return;

    setTimeout(() => {
      setActiveCharacters((prev) =>
        prev.map((char) => (char.id === character.id ? { ...char, clickedCharacter: true } : char))
      );
    });

    setGameState((prev) => {
      const newState = updateGameState(prev, character.type);
      console.log("Nytt gameState:", newState);
      return newState;
    });

    // Ta bort karaktären efter en kort tid så att "poff" syns
    setTimeout(() => {
      setActiveCharacters((prev) => prev.filter((char) => char.id !== character.id));
    }, character.animationDuration * 1000);
  }

  function restartGame() {
    setGameState({
      score: 0,
      timeLeft: 15,
      isGameOver: false,
      spawnInterval: 1000,
      animationDuration: 3.5,
      goodCharacterProbability: 0.2,
    });
    setActiveCharacters([]);
  }

  return { activeCharacters, gameState, handleCharacterClick, restartGame, isGameReady };
}
