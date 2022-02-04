export default function GameCard() {
  return (
    <div className="game-card">
      <img
        src="https://upload.wikimedia.org/wikipedia/ru/3/33/Overwatch_Origins_Edition_PC_cover.jpg"
        alt="overwatch"
        className="game-card__cover"
      />
      <div className="game-card__info">
        <span className="game-card__title">OverWatch</span>
        <span className="game-card__price">Price 24.99</span>
      </div>
      <div className="game-card__rating">
        <img
          src="https://www.pngplay.com/wp-content/uploads/8/5-Stars-PNG-HD-Quality.png"
          alt=""
          className="game-card__stars"
        />
      </div>
    </div>
  );
}
