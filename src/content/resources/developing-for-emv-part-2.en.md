# Developing for EMV, Part II

December 17, 2018

Part I established the EMV fundamentals: staged transaction flow, kernel-managed card communication, TLV-based payloads, and the role of Tag 9F26 cryptograms.  
Part II focuses on implementation behavior: what to collect, when to send online authorization, and how to interpret cryptogram outcomes correctly.

## Online Authorization and the Complete Stage

In a typical integration, your application first collects transaction TLVs (including the first cryptogram) and sends required fields to the host processor for online authorization.

The authorization response may return values such as Tag 89, 8A, 91, and optionally 71/72. These values are then passed into the completion API. After completion, callback data commonly includes a second Tag 9F26 cryptogram.

## Interpreting Cryptogram Outcomes

Tag 9F26 alone is not enough to determine transaction state. In practice, it should be interpreted together with Tag 9F27 (Cryptogram Information Data).

Common outcomes can be summarized as:

- ARQC: card requests online authorization.
- TC: card indicates approval-ready state.
- AAC: card indicates decline-oriented/offline-fail state.

Important: these are card-level outcomes and not always the final settlement decision. The online host still makes the final authorization result.

The following table is a practical quick-reference for interpreting CID (Tag 9F27) bit patterns:

| b8 | b7 | b6 | b5 | b4 | b3 | b2 | b1 | Meaning                     |
| -- | -- | -- | -- | -- | -- | -- | -- | --------------------------- |
| 0  | 0  |    |    |    |    |    |    | AAC                         |
| 0  | 1  |    |    |    |    |    |    | TC                          |
| 1  | 0  |    |    |    |    |    |    | ARQC                        |
| 1  | 1  |    |    |    |    |    |    | AAR                         |
| x  | x  |    |    |    |    |    |    | Payment-system cryptogram   |
| 0  |    |    |    |    |    |    |    | No advice required          |
| 1  |    |    |    |    |    |    |    | Advice required             |
| x  | x  | x  |    |    |    |    |    | Reason/advice/referral code |
| 0  | 0  | 0  |    |    |    |    |    | No information              |
| 0  | 0  | 1  |    |    |    |    |    | Service not allowed         |
| 0  | 1  | 0  |    |    |    |    |    | PIN tries exceeded          |
| 0  | 1  | 1  |    |    |    |    |    | Issuer authentication failed |
| 1  | x  | x  |    |    |    |    |    | Other (RFU reserved)        |

Reference: [ID TECH Products](https://idtechproducts.com/technical-post/developing-for-emv-part-ii/)

## TLV Capture Pitfalls

A frequent mistake is assuming all required tags arrive at the last stage. EMV returns data across different stages. If a value is not captured at the right stage, it may not appear later.

Recommended practice:

- Capture TLVs at each phase (Start / Authenticate / Complete).
- Maintain a processor-specific required-tag checklist by phase.
- Store phase-tag snapshots for easier debugging and audit traceability.

## Encrypted Tags in Production

When keys are injected and encryption is enabled, sensitive card data fields are usually returned in encrypted form. In production environments, route sensitive data securely to your backend processor and avoid unnecessary client-side handling.

## Summary

Part II highlights three practical rules:

- EMV data is stage-dependent.
- Cryptogram interpretation should include Tag 9F27 context.
- Final transaction outcomes are determined by online authorization, not card indication alone.
