import { Box, Typography } from "@mui/material";
import { StylingReferenceText } from "../../model/hearing/StylingReferenceText";
import { HearingForm } from "./HearingForm";

type Props = {
  readonly response: StylingReferenceText[];
};
export const HearingLayout = ({ response }: Props) => {
  //現在ヒアリングしているカテゴリ
  const ACTIVE_CATEGORIES = [
    { id: 1, title: "意識する相手(補足)" },
    { id: 7, title: "コーデイメージ" },
    { id: 8, title: "その他" },
  ];
  return (
    <>
      <Typography variant="body1" fontWeight="bold" m={2}>
        ヒアリング
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
        noValidate
        autoComplete="off"
      >
        {ACTIVE_CATEGORIES.map((category) => (
          <HearingForm
            category={category}
            initialText={
              response.find((r) => category.id === r.categoryId)?.text ?? ""
            }
          />
        ))}
      </Box>
    </>
  );
};
