import { DetailItemTableRowData } from "./DetailItemTableRowData";

export interface DetailItemTableData {
  readonly columns: string[];
  readonly rows: DetailItemTableRowData[];
}
