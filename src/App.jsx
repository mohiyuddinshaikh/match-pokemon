import { useState } from "react";
import "./App.css";
import Pikachu from "./assets/pikachu.png";
import Charizard from "./assets/charizard.png";
import Squirtle from "./assets/squirtle.png";
import Bulbasaur from "./assets/bulbasaur.png";
import Pokemon from "./assets/pokemon.png";

function App() {
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

  const [tiles, setTiles] = useState(INITIAL_TILES);

  const compareTiles = (selectedTile, openTile) => {
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

  return (
    <div className="parentContainer">
      <div className="title">Match The Pokemons !</div>
      <div className="card-holder">
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
    </div>
  );
}

export default App;
