import {
  Divider,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { TMemberBasicSizes } from "../../model/memberSize/MemberSizeTypes";
import { memberBasicSizeHandler } from "./MemberBasicSizeHandler";
import { memberBasicSizePresenter } from "./MemberBasicSizePresenter";
import { MemberSizeNumberInput } from "./input/MemberSizeNumberInput";
import { MemberSizeSizeSelect } from "./input/MemberSizeSizeSelect";
import { MemberSizeSizeChoiceResponse } from "../../model/api/response/styling/member_size/MemberSizeSizeChoiceResponse";

type TProps = {
  editingSizes: TMemberBasicSizes;
  fetchedSizes: TMemberBasicSizes;
  sizeChoiceResponse: MemberSizeSizeChoiceResponse;
  onChangeEditingSizes: (editingSizes: TMemberBasicSizes) => void;
  onSubmit: () => void;
  style?: React.CSSProperties;
};

const EmphasizedText = (props: TypographyProps) => {
  return <Typography {...props} fontWeight={"bold"} variant="subtitle2" />;
};

const StackColumn = (props: StackProps) => {
  return <Stack {...props} direction={"row"} spacing={2} alignItems="center" />;
};

const StackRow = (props: StackProps) => {
  return <Stack {...props} direction={"row"} spacing={4} />;
};

export const MemberBasicSize = ({
  editingSizes,
  fetchedSizes,
  sizeChoiceResponse,
  onChangeEditingSizes,
  onSubmit,
  style,
}: TProps) => {
  const handler = memberBasicSizeHandler({
    editingSizes,
    onChangeEditingSizes,
  });
  const presenter = memberBasicSizePresenter({
    editingSizes,
    fetchedSizes,
    sizeChoiceResponse,
    handleChangeSize: handler.handleChangeSize,
  });

  return (
    <div style={style}>
      <StackRow>
        <StackColumn>
          <EmphasizedText>BMI</EmphasizedText>
          <Typography>{editingSizes.bmi}</Typography>
        </StackColumn>
        <StackColumn>
          <EmphasizedText>身長</EmphasizedText>
          <MemberSizeNumberInput
            {...presenter.heightInputProps}
            onKeyDownEnter={onSubmit}
          />
        </StackColumn>
        <StackColumn>
          <EmphasizedText>体重</EmphasizedText>
          <MemberSizeNumberInput
            {...presenter.weightInputProps}
            adornment="kg"
            onKeyDownEnter={onSubmit}
          />
        </StackColumn>
      </StackRow>

      <Divider style={{ margin: "16px 0" }} />

      <Stack spacing={4}>
        <StackRow>
          <StackColumn>
            <EmphasizedText>トップス</EmphasizedText>
          </StackColumn>
          <StackColumn>
            <Typography>本人</Typography>
            <EmphasizedText>{presenter.tops}</EmphasizedText>
          </StackColumn>
          <StackColumn>
            <Typography>管理</Typography>
            <MemberSizeSizeSelect {...presenter.topsAdminSelectProps} />
          </StackColumn>
        </StackRow>

        <StackRow>
          <StackColumn>
            <EmphasizedText>ウエスト</EmphasizedText>
          </StackColumn>
          <StackColumn>
            <Stack>
              <StackColumn>
                <Typography>本人</Typography>
                <EmphasizedText>{presenter.bottoms}</EmphasizedText>
              </StackColumn>
              <StackColumn>
                <Typography>管理</Typography>
                <EmphasizedText>{presenter.bottomsAdmin}</EmphasizedText>
              </StackColumn>
            </Stack>
          </StackColumn>
        </StackRow>

        <StackRow>
          <StackColumn>
            <EmphasizedText>ジャケット</EmphasizedText>
          </StackColumn>
          <StackColumn>
            <Stack>
              <StackRow>
                <StackColumn>
                  <MemberSizeSizeSelect {...presenter.jucketAdminSelectProps} />
                </StackColumn>
                <StackColumn>
                  <Typography>ドロップサイズ</Typography>
                  <MemberSizeSizeSelect
                    {...presenter.dropSizeAdminSelectProps}
                  />
                </StackColumn>
              </StackRow>
              <StackColumn>
                <Typography>参考サイズ</Typography>
                <Typography
                  fontWeight="bold"
                  variant="subtitle2"
                  dangerouslySetInnerHTML={{
                    __html: presenter.referenceJacketSize,
                  }}
                />
              </StackColumn>
            </Stack>
          </StackColumn>
        </StackRow>
      </Stack>
    </div>
  );
};
