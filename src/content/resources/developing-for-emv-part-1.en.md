# Developing for EMV, Part I

September 4, 2018

ID TECH builds and ships many payment devices, and today most of them support chip cards. A chip-card payment is usually called a contact EMV transaction. EMV comes from Europay, MasterCard, and Visa.

In practice, an EMV transaction means a transaction aligned with EMVCo specifications. The full spec is deep, so most teams should start with transaction flow fundamentals and required data handling points before diving into edge cases.

## EMV: Where Should You Start?

Developer backgrounds vary. Some teams are strong in MSR systems, others have partial EMV experience, and some are completely new.

A good starting point is an EMV flow guide from your device vendor. Learn the event boundaries, data return timing, and host authorization checkpoints first. This pays off during certification and debugging.

## Communicating with the Reader

Two common approaches:

- Direct device communication through firmware commands (USB / RS-232).
- SDK-based integration using higher-level APIs.

SDK integration is usually faster to learn. Direct command integration gives maximum flexibility but requires more low-level implementation effort.

A typical contact EMV flow has three phases:

- Start Transaction
- Authenticate Transaction
- Complete Transaction

The kernel may return control between these phases. Data availability can differ by stage, so capture TLV values when they are provided.

## Cryptograms in EMV

One of the most critical values is Tag 9F26 (Application Cryptogram). In contact transactions, cryptograms are typically generated during Gen AC events.

These values provide strong evidence that a genuine chip card participated in the transaction and that transaction data was processed securely. This is a core reason EMV is far more resilient than magnetic-stripe data.
