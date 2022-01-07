import { useState } from "react";
import { StylingReferenceText } from "../../../model/hearing/StylingReferenceText";

type HearingFormHandler = {
  readonly ACTIVE_CATEGORIES: { id: number; title: string }[];
  readonly referenceTexts: StylingReferenceText[];
  readonly changeText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    categoryId: number
  ) => void;
};

export const useHearingFormHandler = (
  response: StylingReferenceText[]
): HearingFormHandler => {
  //現在ヒアリングしているカテゴリ
  const ACTIVE_CATEGORIES = [
    { id: 2, title: "意識する相手(補足)" },
    { id: 7, title: "コーデイメージ" },
    { id: 8, title: "その他" },
  ];

  const [referenceTexts, setReferenceTexts] = useState<StylingReferenceText[]>(
    response.filter((referenceText) =>
      ACTIVE_CATEGORIES.map((category) => category["id"]).includes(
        referenceText.categoryId
      )
    )
  );

  const changeText = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: number
  ) => {
    let newReferenceTexts;
    if (event.target.value) {
      newReferenceTexts = [
        ...referenceTexts.filter((reference) => reference.categoryId !== id),
        { categoryId: id, text: event.target.value },
      ];
    } else {
      newReferenceTexts = [
        ...referenceTexts.filter((reference) => reference.categoryId !== id),
      ];
    }
    setReferenceTexts(newReferenceTexts);
  };

  return {
    ACTIVE_CATEGORIES,
    referenceTexts,
    changeText,
  };
};
