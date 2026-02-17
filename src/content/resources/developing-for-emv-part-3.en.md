# Developing for EMV, Part III

January 30, 2019

In Part I of this series, we covered key differences between chip-card and magnetic-stripe transactions. We saw that there is a significant amount of back-and-forth communication between the reader and the card. The good news is that a large portion of that communication is handled automatically by the reader's EMV kernel, not directly by your payment application.

In Part II, we discussed common tags (TLV data) returned during EMV transactions, what some of those values mean, and why EMV is phase-based (Start, Authenticate, and Complete). We also highlighted that different TLVs may appear at different phases.

VP8300 can process chip, magstripe, and contactless cards.

You can run EMV transactions by sending raw firmware commands over USB or RS-232, but in most implementations it is much easier to use ID TECH Universal SDK. It reduces low-level complexity and helps teams ship faster.

## Why Is the SDK Easier?

It handles reader connection setup for USB, RS-232, and Bluetooth.  
It removes the need to work directly with device-level firmware command details.  
It also provides utility libraries for parsing response data and interpreting error codes.

Another advantage is that Universal SDK includes sample code that demonstrates real transaction flows and callback handling patterns.

## How to Get Started with the SDK

The implementation path is straightforward:

## Step 1: Install the SDK

Download the package for your target platform (Windows, Linux, macOS, iOS, or Android), extract it, and open the sample project in your IDE. Connect an ID TECH reader, build the sample, and verify host-to-reader communication first.

## Step 2: Configure the Reader

Do not expect EMV to work out of the box without configuration. At minimum, load:

- Terminal settings
- AIDs
- CAPKs

ID TECH provides sample values for testing, but they still must be explicitly loaded into the reader. Once loaded, these settings are persisted and usually do not need to be reloaded on every startup.

## Step 3: Run a Transaction

Sample applications already include working transaction code. Review that flow first. At minimum, define a callback and call `emv_startTransaction()`.

Reader communication is asynchronous. When you call `emv_startTransaction()`, the SDK initiates the process and immediately returns control to your app with a status code. Later, when transaction-state data becomes available, the SDK invokes your callback and passes back TLV payloads.

In short, if you want to receive transaction data reliably, callback wiring is required.

## What Does a Callback Look Like?

In the Windows Universal SDK, a callback can look like this:

```csharp
private void MessageCallBack(IDTechSDK.IDT_DEVICE_Types type,
                             DeviceState state,
                             byte[] data,
                             IDTTransactionData cardData,
                             EMV_Callback emvCallback,
                             RETURN_CODE transactionResultCode)
```

Register it at runtime:

```csharp
IDT_VP3300.setCallback(MessageCallBack);
```

## What Does Start Transaction Code Look Like?

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

Calling `emv_startTransaction()` sends a request to the reader, performs ATR, and starts kernel processing.

If Start succeeds and callback registration is done correctly, your callback should fire shortly after, and your state switch can handle the returned transaction data. In production flows, this is typically where your app pauses for online authorization, then passes issuer response values (for example Tag 8A and related fields) into `emv_completeTransaction()`.

## Need Help?

Universal SDK comes with documentation in HTML and PDF formats. If you still have integration questions, contact ID TECH support for technical guidance.
