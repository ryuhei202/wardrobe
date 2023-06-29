import { SimplifiedHearingsShowResponse } from "../../model/api/response/styling/simplifiedHearing/SimplifiedHearingsShowResponse";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";

type TArgs = {
  descriptionText: string;
  coordinateItems: TCoordinateItem[];
  simplifiedHearing?: SimplifiedHearingsShowResponse;
};

export const createCoordinateFlexMessage = ({
  descriptionText,
  coordinateItems,
  simplifiedHearing,
}: TArgs) => {
  const flexMessage: any[] = [];

  const simplifiedHearingContent = {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "意識する相手",
              size: "sm",
              color: "#4C5257",
            },
            {
              type: "text",
              text: simplifiedHearing?.target || "未回答",
              size: "md",
              weight: "bold",
              wrap: true,
              color: "#4C5257",
            },
          ],
        },
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "シーン",
              size: "sm",
              color: "#4C5257",
            },
            {
              type: "text",
              text: simplifiedHearing?.scene || "未回答",
              size: "md",
              weight: "bold",
              wrap: true,
              color: "#4C5257",
            },
          ],
        },
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "印象",
              size: "sm",
              color: "#4C5257",
            },
            {
              type: "text",
              text: simplifiedHearing?.impression || "未回答",
              size: "md",
              weight: "bold",
              wrap: true,
              color: "#4C5257",
            },
          ],
        },
      ],
      justifyContent: "space-around",
      alignItems: "flex-start",
    },
    styles: {
      body: {
        backgroundColor: "#E8E7DF",
      },
    },
  };

  flexMessage.push({
    type: "flex",
    altText: "【コーデ写真】",
    contents: {
      type: "carousel",
      contents: [
        simplifiedHearingContent,
        ...coordinateItems.map((item) => {
          const bodyContents = [];
          if (item.isChangeItem) {
            bodyContents.push({
              type: "text",
              text: "[チェンジアイテム]",
              size: "md",
              color: "#4C5257",
              align: "center",
            });
          }
          bodyContents.push({
            type: "text",
            text: `${item.itemInfo.categoryName} / ${item.itemInfo.mainColorName}`,
            size: "md",
            color: "#4C5257",
            weight: "bold",
            align: "center",
          });
          return {
            type: "bubble",
            hero: {
              type: "image",
              url: item.itemInfo.imagePath.large,
              aspectRatio: "2:3",
              size: "xl",
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: bodyContents,
              paddingAll: "md",
              justifyContent: "center",
            },
            styles: {
              hero: {
                backgroundColor: "#E8E7DF",
              },
              body: {
                backgroundColor: "#E8E7DF",
              },
            },
          };
        }),
      ],
    },
  });

  flexMessage.push({
    type: "text",
    text: `${descriptionText}\n\n私としては今回の利用シーンと印象で、このようなコーデを考えていますがいかがでしょうか？`,
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "message",
            label: "こちらのコーデでお願いします！",
            text: "こちらのコーデでお願いします！",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "コーデの変更を依頼したいです！",
            text: "コーデの変更を依頼したいです！",
          },
        },
      ],
    },
  });

  return JSON.stringify(flexMessage);
};
