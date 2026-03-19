# Platform Architecture Summary

This document outlines a three-phase integration system anchored by a fundamental principle: **Business Central receives only confirmed, clean order writes—nothing else.**

## Core Design Principle

The architecture enforces strict separation of concerns. As stated in the document: "BC receives only confirmed, clean order writes. Nothing else." All interaction context, ML signals, and behavioral data bypass the ERP system entirely, keeping it clean as a financial ledger.

## Dual Write Pattern

User actions trigger simultaneous writes to two systems:
- **Business Central** via `/orders` endpoint (confirmed order data only)
- **Azure SQL** via `/interactions` endpoint (suggested vs. actual quantities, actor details, timestamps)

The delta between suggested and actual quantities becomes the machine learning training signal.

## Technology Stack

The system flows through Azure infrastructure: Business Central → Azure Data Factory → Azure SQL, with Phase 2 introducing Microsoft Fabric for semantic modeling and Power BI analytics. Phase 3 adds nightly ML batch scoring to generate suggestions back to client applications.

## AI Layer

Complex financial reasoning routes to Claude API (handling multi-entity scenarios), while routine queries go to Copilot Studio. Knowledge lives in markdown files with YAML frontmatter, stored in Azure AI Search or Fabric's native vector store.
