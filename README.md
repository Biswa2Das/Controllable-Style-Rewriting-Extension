# Controllable Style Rewriting Extension

A simple Chrome MV3 extension that rewrites text with customizable **perspective**, **tone**, and **style** using a **local LLM** running on your machine. It’s privacy-friendly, easy to use, and ideal for experimenting with controllable rewriting right in your browser.

---

## Features
- Controllable style rewriting (Perspective, Tone, Style)
- Multi-pass rewriting using local LLM endpoint
- Live character counters and persistent settings
- Copy/Clear buttons and collapsible advanced options
- Privacy-first: all processing happens locally

---

## Installation
1. Clone or download this repository.
2. Open **Chrome** and go to:
chrome://extensions/

text
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked** and select the project folder (where `manifest.json` is located).
5. Start your local model (default: LM Studio on `http://localhost:1234`).

---

## Usage
1. Open the extension popup.
2. Paste your text in the input box.
3. Choose **Perspective**, **Tone**, and **Style**.
4. Click **Humanize Text** or use **Ctrl + Enter**.
5. Copy the rewritten version when done.

---

## Configuration
You can edit the local model configuration inside `popup.js`:
const LM_STUDIO_URL = "http://localhost:1234";
const MODEL = "llama-3.2-1b";

text

Modify temperature, top_p, penalties, and other parameters directly in the code as needed.

---

## Folder Structure
├── manifest.json # Chrome extension manifest (MV3)
├── popup.html # Main popup UI
├── popup.js # Logic, multi-pass rewrite, config
├── icons/ # (Optional) Extension icons

text

---

## Ethical Use
This tool is designed for:
- Accessibility and readability enhancement
- Tone matching for communication
- Privacy-preserving local rewriting

**Not intended** for AI detector evasion, academic dishonesty, or content manipulation.

---

## License
MIT License © 2025  
You are free to modify, reuse, and extend this project with attribution.

---

## Author
Developed as part of a research-and-systems capstone on **controllable rewriting and personalization**