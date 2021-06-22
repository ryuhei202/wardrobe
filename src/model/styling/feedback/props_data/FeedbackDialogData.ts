export default interface FeedbackDialogData {
  readonly isOpen: boolean;
  readonly items: {
    readonly itemId: number;
    readonly locationName: string;
    readonly imagePath: string;
  }[];
}
