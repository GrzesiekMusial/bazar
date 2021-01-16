import Img from "../common/imageLoader";

const Card = ({ card }) => {
    return (
        <div className="cards__card">
            <div className="cards__card__image">
                <Img image={card.images ? card.images[0] : card.images} />
            </div>
            <div>
                <h2 className="cards__card__title">{card.title}</h2>
                {card.price !== 0 && (
                    <div className="cards__card__price">
                        <span>{card.price} zł</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
