# wardrobe

leeap スタイリング web アプリ

## 実行可能コマンド

### `yarn install`

プロジェクトに必要なパッケージをインストール

### `yarn start`

development モードでアプリケーションを実行
ブラウザで[http://localhost:3001](http://localhost:3001)を開いて確認

### git-hooks

以下のコマンドで.git/hooks を更新し、コミットメッセージにブランチ名をつけるようにする

```
cp git-hooks/* .git/hooks/
chmod +x .git/hooks/*
```
