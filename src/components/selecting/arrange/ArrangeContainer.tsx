import { SyntheticEvent, useState } from "react";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";

import { useCoordinatesIndex } from "../../../hooks/api/UseCoordinatesIndex";
import { ArrangeData } from "../../../model/selecting/arrange/props_data/ArrangeData";
import { ChartIdContext } from "../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../context/UseContextDefinedState";
import { Arrange } from "./Arrange";
import { ArrangeCallback } from "./callback/ArrangeCallback";
import { ArrowBack } from "@mui/icons-material";

export interface ArrangeContainerProps {
  data: ArrangeData;
  callback: ArrangeCallback;
}

export const ArrangeContainer = ({ data, callback }: ArrangeContainerProps) => {
  const chartId = useContextDefinedState(ChartIdContext);
  const {
    data: response,
    error,
    isFetching,
  } = useCoordinatesIndex({ chartId });

  const [selectedTabIndex, setSelectedTabIndex] = useState<string>("0");
  const handleChange = (event: SyntheticEvent, newTabIndex: string) => {
    setSelectedTabIndex(newTabIndex);
  };

  if (!response || isFetching) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;

  return (
    <>
      <IconButton onClick={() => callback.onClickBackButton()} size="large">
        <ArrowBack />
      </IconButton>
      <br />
      <Typography display="inline" variant="h6" paragraph>
        着こなしアドバイス
      </Typography>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <TabContext value={selectedTabIndex}>
          <Box sx={{ width: "10%" }}>
            <TabList onChange={handleChange} orientation="vertical">
              {response.coordinates.map((_, index) => (
                <Tab label={`コーデ${index + 1}`} value={`${index}`} />
              ))}
            </TabList>
          </Box>
          <Box sx={{ width: "90%" }}>
            {response.coordinates.map((coordinate, index) => (
              <TabPanel value={`${index}`}>
                <Arrange data={data} coordinateId={coordinate.id} />
              </TabPanel>
            ))}
          </Box>
        </TabContext>
      </Box>
    </>
  );
};
