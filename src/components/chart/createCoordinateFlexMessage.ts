import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";

type TArgs = {
  coordinateDescription: string;
  coordinateItems: TCoordinateItem[];
  isFirstTransmit: boolean;
};

export const createCoordinateFlexMessage = ({
  coordinateDescription,
  coordinateItems,
  isFirstTransmit,
}: TArgs) => {
  const flexMessage: any[] = [
    {
      type: "text",
      text: isFirstTransmit
        ? "診断フォームにご回答いただきありがとうございます！\nフォームの回答内容を元に早速コーデをお作りしましたのでご確認お願いします！"
        : "再度コーデをお作りしましたのでご確認お願いします！",
      sender: true,
    },
  ];

  flexMessage.push({
    type: "flex",
    altText: "test",
    contents: {
      type: "carousel",
      contents: coordinateItems.map((item) => {
        return {
          type: "bubble",
          hero: {
            type: "image",
            url: item.itemInfo.imagePath.large,
            aspectRatio: "2:3",
            size: "full",
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: `${item.itemInfo.categoryName} / ${item.itemInfo.mainColorName}`,
                size: "md",
                color: "#4C5257",
                weight: "bold",
                align: "center",
              },
            ],
            paddingAll: "md",
            backgroundColor: "#E8E7DF",
          },
        };
      }),
    },
  });

  flexMessage.push({
    type: "text",
    text: `${coordinateDescription}\n\n私としては今回の利用シーンと印象で、このようなコーデを考えていますがいかがでしょうか？`,
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "message",
            label: "こちらのコーデでお願いします！",
            text: "＞こちらのコーデでお願いします！",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "コーデの変更を依頼したいです！",
            text: "＞コーデの変更を依頼したいです！",
          },
        },
      ],
    },
  });

  return JSON.stringify(flexMessage);
};
