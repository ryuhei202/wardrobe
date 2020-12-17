import DetailItemTableRowData from "./DetailItemTableRowData";

export default interface DetailItemTableData {
  readonly columns: string[];
  readonly rows: DetailItemTableRowData[];
}
