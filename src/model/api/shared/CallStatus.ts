export enum CallStatus {
  Idle, // 通常の状態
  Prepareing, // APIコールを開始したい場合にこのステータスにする
  Running, // 通信中
}
