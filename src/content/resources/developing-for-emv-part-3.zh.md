# 開發 EMV Part III

2019 年 1 月 30 日

在本系列的第一篇（Part I）中，我們談到了晶片卡交易與磁條卡交易之間的差異。我們看到，讀卡機與卡片之間會有相當多的來回通訊。不過我們也看到，這些通訊當中有很大一部分是自動處理的——也就是說，不在支付應用程式開發者的控制範圍內——而是由讀卡機的 EMV kernel 來處理。

在第二篇（Part II）中，我們稍微討論了在 EMV 交易過程中你可以預期會收到的各種標籤（或 TLV 資料），以及其中部分標籤的含義。我們也提到，EMV 交易是分階段進行的（名稱例如 Start、Authenticate 和 Complete）。而且我們看到，不同的 TLV 會在不同階段回傳。

VP8300  
VP8300 可以處理晶片卡、磁條卡或非接觸式卡片。

我們也提到，雖然你當然可以透過 USB 或 RS-232 直接向讀卡機發送原始韌體指令來執行 EMV 交易，但通常使用 ID TECH 的 Universal SDK 與讀卡機互動會更容易。

## 為什麼 SDK 比較容易？

首先，它會替你處理與讀卡機之間的序列通訊設定（USB、RS-232 或 Bluetooth）。  
它也讓你不必了解裝置層級的韌體指令與相關的低階通訊協定。  
此外，你還可以使用現成的程式庫來協助進行錯誤碼解析與資料解析。

Universal SDK 的另一個優點是，它隨附範例程式碼，示範如何使用各種函式庫來簡化這些工作。

## 如何開始使用 SDK？

讓我們看看主要步驟。

## Step 1：安裝 SDK

如果你知道將要在哪個作業系統上進行開發，請前往 Knowledge Base 的 Development — Home，並下載對應版本。Windows、Linux、MacOS、iOS 和 Android 都有各自的建置版本。

解壓縮下載的檔案，然後在你慣用的 IDE 中載入範例專案（位於 Source Code 資料夾中）。在插上 ID TECH 讀卡機的情況下，編譯並執行範例應用程式。確認應用程式可以與讀卡機進行通訊。

## Step 2：設定讀卡機

不要期待能夠開箱即直接執行 EMV 交易！如果你沒有花時間先設定讀卡機，第一筆交易將會失敗。至少，你需要將以下內容載入讀卡機：

- Terminal settings
- AIDs
- CAPKs（憑證授權機構公開金鑰）

ID TECH 提供測試用途的範例數值，但你仍然需要執行指令來載入這些範例數值。在你執行這些指令之前，這些數值並不會自動載入！（幸運的是，一旦讀卡機載入了這些項目，就不需要在每次啟動時重新載入。這些設定會被保存。設定是一個一次性的工作。）請查看 SDK 的範例程式碼，以了解如何完成這些設定。

EMV 設定本身是一個相當龐大的主題。本篇文章不會深入探討。如需入門說明，請務必閱讀我們之前關於 Terminal Settings 的文章，以及 EMV 白皮書（PDF，免費下載）中的 Configuration 章節。

## Step 3：執行交易

範例應用程式中包含了執行交易的程式碼。請逐步閱讀程式碼以了解其運作方式。否則，你至少需要設定一個自訂 callback（這是一個在適當時間由 SDK 自動呼叫的函式），然後自行呼叫 `emv_startTransaction()`。

與讀卡機的通訊是非同步進行的，這表示當你呼叫像 `emv_startTransaction()` 這樣的方法時，SDK 會與讀卡機聯繫並啟動一連串事件，但你的程式不會在此過程中被阻塞。相反地，控制權會立即返回給你的應用程式（並附帶成功或錯誤碼）。SDK 會持續監控讀卡機是否有更新。例如，當讀卡機完成 EMV 交易的 Start 階段時，它會透過 USB（通常）向主機電腦發送 TLV 資料。SDK 會攔截這些資料，呼叫你的自訂 callback，並將資料傳遞給該 callback。

總之，如果你希望收到讀卡機回傳的資料，你必須設定一個自訂 callback！

## Callback 看起來是什麼樣子？

在 Windows 版本的 Universal SDK 中，你的自訂 callback 應該具有類似以下的 C# 函式簽名：

```csharp
private void MessageCallBack(IDTechSDK.IDT_DEVICE_Types type,
                             DeviceState state,
                             byte[] data,
                             IDTTransactionData cardData,
                             EMV_Callback emvCallback,
                             RETURN_CODE transactionResultCode)
```

為了確保你的 callback 會被使用，你需要在執行時向 SDK 註冊它，如下所示：

```csharp
IDT_VP3300.setCallback(MessageCallBack);
```

這個範例假設你使用的是 VP3300 讀卡機，但 SDK 會支援你所使用的任何 ID TECH 支付讀卡機。畢竟，這是一個 Universal SDK。

## 交易程式碼長什麼樣子？

當你想要開始一筆交易時，需要執行類似以下的程式碼：

```csharp
RETURN_CODE rt = IDT_VP3300.SharedController.emv_startTransaction(1.00, 0,2, 0, 30, null, false);
if (rt == RETURN_CODE.RETURN_CODE_DO_SUCCESS)
{
    tbOutput.AppendText("Start EMV Successful\r\n");
}
else
{
    tbOutput.AppendText("Start EMV failed Error Code: " + "0x" +
        String.Format("{0:X}", (ushort)rt) + ": " +
        IDTechSDK.errorCode.getErrorString(rt) + "\r\n");
}
```

呼叫 `emv_startTransaction()` 會導致一個請求（透過 USB 或序列連線）被發送到讀卡機。讀卡機會進行 ATR（也就是與卡片晶片接觸），並啟動 EMV kernel。

假設 Start Transaction 成功（沒有逾時或發生錯誤），而且你已經註冊了 callback（如前所述），那麼在一到兩秒後，你的 callback 就會被執行。你的 callback 程式碼應該包含一個相當大的 `switch` 判斷式，用來處理各種可能的結果。當然，你希望的結果是成功的 EMV 交易並回傳 TLV 資料。因此，你可能會在 callback 中寫出類似以下的程式碼，並在 Start 階段結束時執行：

```csharp
[ switch statement ... ]
case DeviceState.TransactionData:
   //Transaction data is being returned in IDTTransactionData cardData
   SetOutputText("Callback: TransactionData\n");
   if (cardData.emv_resultCode == EMV_RESULT_CODE.EMV_RESULT_CODE_GO_ONLINE)
   {
       // We will auto-complete. Normally, a host response is required here.
       SetOutputText("Online request. Auto Complete EMV Transaction.\n");
       byte[] responseCode = new byte[] { 0x30, 0x30 };
       byte[] iad = null;
       RETURN_CODE rt = IDT_VP3300.SharedController.emv_completeTransaction(false, responseCode, iad, null,null);
       return;
   }
```

這段程式碼假設你已將偏好設定為自動執行 Authenticate Transaction 階段，因此可以直接從 Start 進入 Complete。（當然，不一定要這樣做，一切取決於你的需求。）在實際的支付應用程式中，你的應用程式會在這個 `case` 中暫停，並向閘道或收單機構進行線上授權。然後你會將 Tag 8A（以及可能的其他標籤）傳遞給 `emv_completeTransaction()`。

若要查看如何解析每個交易階段回傳的 TLV（交易資料），請在範例程式碼中搜尋 “displayCardData(IDTTransactionData cardData)”。你會看到多種解析資料的範例。

## 有問題嗎？

當你開始使用 SDK 時，可能會有疑問。請記住，SDK 隨附大量文件（包含 HTML 和 PDF 格式）。但如果你的問題仍需要進一步解答，我們隨時為你服務！請聯絡我們的專家。
