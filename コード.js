/**
 * 送信数が100件以上、かつ開封数が10件以上、かつ、開封率が5%以上の名前に色を付けます。
 */
function colorCellsByPerformance() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  // ヘッダーから列のインデックスを取得
  const nameIdx = headers.indexOf("リクルーター名");
  const sentIdx = headers.indexOf("送信数");
  const openCountIdx = headers.indexOf("開封数");
  const openRateIdx = headers.indexOf("開封率");

  if (nameIdx === -1 || sentIdx === -1 || openCountIdx === -1 || openRateIdx === -1) {
    Logger.log("必要なヘッダーが見つかりませんでした。");
    return;
  }

  // 2行目から順にデータをチェック
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const sent = row[sentIdx];
    const openCount = row[openCountIdx];
    const openRate = row[openRateIdx];

    // 条件判定: 送信数 >= 100 且つ 開封数 >= 10 且つ 開封率 >= 5% (0.05)
    if (sent >= 100 && openCount >= 10 && openRate >= 0.05) {
      // 条件を満たす場合、名前のセルを赤色にする
      sheet.getRange(i + 1, nameIdx + 1).setBackground("#ff0000");
    } else {
      // 条件を満たさない場合は背景色をリセット（必要に応じて）
      sheet.getRange(i + 1, nameIdx + 1).setBackground(null);
    }
  }
}

