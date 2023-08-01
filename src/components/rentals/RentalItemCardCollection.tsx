import { ItemCardResponse } from "../../model/api/response/styling/browse/ItemCardResponse";
import { ItemCardData } from "../../model/selecting/browse/props_data/ItemCardData";
import { ItemCard } from "../selecting/browse/ItemCard";
import { ItemCardCallback } from "../selecting/browse/callback/ItemCardCallback";
import { useItemCardCollectionStyle } from "../selecting/browse/style/UseItemCardCollectionStyle";

type TProps = {
  items: ItemCardResponse[];
  onClickItemCard: (id: number) => void;
};
export const RentalItemCardCollection = ({
  items,
  onClickItemCard,
}: TProps) => {
  const classes = useItemCardCollectionStyle();
  const convertItemCards = (): ItemCardData[] => {
    return items.map((item) => {
      return {
        mainColorImagePath: item.mainColorImagePath,
        subColorImagePath: item.subColorImagePath,
        seriesName: item.seriesName ?? "",
        seriesFeature: item.seriesFeature ?? "",
        categoryName: item.categoryName,
        brandName: item.brandName,
        imagePath: item.imagePath,
        isMarriage: item.isMarriage,
        formalRank: item.formalRank,
      };
    });
  };

  const itemCardCallback = (index: number): ItemCardCallback => {
    return {
      onClick: () => {
        onClickItemCard(items[index].id);
      },
    };
  };

  return (
    <div className={classes.cardCollection}>
      {convertItemCards().map((itemCard, index) => {
        return (
          <ItemCard
            data={itemCard}
            callback={itemCardCallback(index)}
            key={index}
          />
        );
      })}
    </div>
  );
};
