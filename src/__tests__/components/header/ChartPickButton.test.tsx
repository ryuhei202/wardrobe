import { render, screen } from "@testing-library/react";
import { ChartPickButton } from "../../../components/header/ChartPickButton";

test("ChartPickButtonの表示がされる", () => {
  render(<ChartPickButton onClick={() => {}} />);

  const button = screen.getByText("カルテピック");
  expect(button).toBeInTheDocument;
});
