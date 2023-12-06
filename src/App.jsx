import { useEffect, useState } from "react";
import "./App.css";
import Pikachu from "./assets/pikachu.png";
import Charizard from "./assets/charizard.png";
import Squirtle from "./assets/squirtle.png";
import Bulbasaur from "./assets/bulbasaur.png";
import Pokemon from "./assets/pokemon.png";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";

function App() {
  const { width, height } = useWindowSize();
  const INITIAL_TILES = [
    {
      name: "A",
      isOpen: false,
      isMatched: false,
      id: 1,
      img: Pikachu,
    },
    {
      name: "B",
      isOpen: false,
      isMatched: false,
      id: 2,
      img: Bulbasaur,
    },
    {
      name: "C",
      isOpen: false,
      isMatched: false,
      id: 3,
      img: Squirtle,
    },
    {
      name: "A",
      isOpen: false,
      isMatched: false,
      id: 4,
      img: Pikachu,
    },
    {
      name: "D",
      isOpen: false,
      isMatched: false,
      id: 7,
      img: Charizard,
    },
    {
      name: "C",
      isOpen: false,
      isMatched: false,
      id: 5,
      img: Squirtle,
    },
    {
      name: "B",
      isOpen: false,
      isMatched: false,
      id: 6,
      img: Bulbasaur,
    },
    {
      name: "D",
      isOpen: false,
      isMatched: false,
      id: 8,
      img: Charizard,
    },
  ];

  useEffect(() => {
    shuffleTiles();
  }, []);

  const [tiles, setTiles] = useState(null);
  const [tries, setTries] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const compareTiles = (selectedTile, openTile) => {
    setTries((old) => old + 1);
    if (selectedTile?.name === openTile?.name) {
      let tempTiles = [...tiles];
      tempTiles.forEach((element) => {
        if (element?.name === selectedTile?.name) {
          element.isMatched = true;
          element.isOpen = true;
        }
      });
      setTiles([...tempTiles]);
      return;
    } else {
      openSelectedTile(selectedTile);
      openSelectedTile(openTile);

      setTimeout(() => {
        let tempTiles = [...tiles];
        tempTiles.forEach((element) => {
          if (
            element?.id === selectedTile?.id ||
            element?.id === openTile?.id
          ) {
            element.isOpen = false;
          }
        });
        setTiles([...tempTiles]);
      }, 1000);
    }
  };

  const checkIfGameComplete = () => {
    return tiles?.every((tile) => tile.isOpen && tile.isMatched);
  };

  useEffect(() => {
    if (checkIfGameComplete()) {
      setIsGameComplete(true);
    }
  }, [tiles]);

  const openSelectedTile = (selectedTile) => {
    const tempTiles = [...tiles];
    tempTiles.forEach((item) => {
      if (item?.id === selectedTile?.id) {
        item.isOpen = true;
      }
    });
    setTiles([...tempTiles]);
  };

  const handleTileClick = (selectedTile) => {
    if (selectedTile?.isOpen) {
      return;
    }
    let isTileOpen = false;
    let openTile = null;
    tiles.forEach((element) => {
      if (!element?.isMatched && element?.isOpen) {
        isTileOpen = true;
        openTile = element;
      }
    });

    if (isTileOpen) {
      compareTiles(selectedTile, openTile);
    } else {
      openSelectedTile(selectedTile);
    }
  };

  const resetGame = () => {
    shuffleTiles();
    setTries(0);
    setIsGameComplete(false);
  };

  const shuffleTiles = () => {
    const shuffledTiles = INITIAL_TILES.sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
  };

  return (
    <div className="parentContainer">
      <Fade bottom>
        <div className="title">Match The Pok&eacute;mon !!</div>
      </Fade>
      <Zoom top>
        <div className={`card-holder ${isGameComplete ? "scale" : ""}`}>
          {tiles?.map((tile, index) => {
            return (
              <div
                key={index}
                className="tile"
                onClick={() => handleTileClick(tile)}
              >
                {tile?.isOpen ? (
                  <img
                    alt={tile?.name}
                    src={tile?.img}
                    height={100}
                    width={100}
                  />
                ) : (
                  <img alt={"Pokemon"} src={Pokemon} height={100} width={100} />
                )}
              </div>
            );
          })}
        </div>
      </Zoom>
      <Fade bottom>
        <div className="tries">Tries: {tries}</div>
        <button className="resetButton" onClick={resetGame}>
          Reset Game
        </button>
      </Fade>
      {isGameComplete ? <Confetti width={width} height={height} /> : ""}
    </div>
  );
}

export default App;
