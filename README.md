# ローカル

```bash
cd path/to/project
yarn install
yarn start
```

# デプロイ

```bash
cd path/to/project
yarn install
yarn build
firebase deploy
```

# 本番ビルドのローカルチェック

まずこちらをインストール
※ローカルでホスティングサーバーを立てるために使うツール

https://github.com/http-party/http-server

以下の流れで起動。
※APIの向きは本番環境になっているので注意。

```bash
cd path/to/project
yarn install
yarn build
cd build
http-server -p 3001
```

