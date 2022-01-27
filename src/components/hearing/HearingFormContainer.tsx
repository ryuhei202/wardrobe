import { CircularProgress, Typography } from "@mui/material";
import { useLatestStylingReferencesShow } from "../../hooks/api/UseLatestStylingReferencesShow";
import { StylingReferenceText } from "../../model/hearing/StylingReferenceText";
import { HearingForm } from "./HearingForm";

export const HearingFormContainer = () => {
  const { data, error } = useLatestStylingReferencesShow();
  let referenceTexts: StylingReferenceText[] = [];
  if (data) {
    data.forEach((stylingReference) => {
      referenceTexts.push({
        categoryId: stylingReference.id,
        text: stylingReference.texts.join(),
      });
    });
  }

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;

  return <HearingForm response={referenceTexts} />;
};
