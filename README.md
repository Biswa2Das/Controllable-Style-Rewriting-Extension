# Controllable Style Rewriting Extension

A lightweight **Chrome MV3 extension** that rewrites text with customizable **Perspective**, **Tone**, and **Style** using a **local LLM** running on your machine.  
It’s privacy-friendly, easy to use, and ideal for experimenting with controllable text rewriting directly in your browser.

---

## ✨ Features
- Customizable rewriting controls: *Perspective*, *Tone*, *Style*
- Multi-pass rewriting via a local LLM endpoint
- Live character counters and persistent settings
- Copy / Clear buttons with collapsible advanced options
- 100% local processing — no data leaves your device

---

## 🧩 Installation

1. **Clone** or **download** this repository.  
2. Open Chrome and navigate to:
```

chrome://extensions/

````
3. Enable **Developer Mode** (toggle in the top right).  
4. Click **Load unpacked** and select the project folder (where `manifest.json` is located).  
5. Start your local model (default: [LM Studio](https://lmstudio.ai/) at `http://localhost:1234`).  

---

## 🚀 Usage

1. Open the extension popup.  
2. Paste or type your text into the input box.  
3. Select your preferred **Perspective**, **Tone**, and **Style**.  
4. Click **Humanize Text** (or press **Ctrl + Enter**).  
5. Copy or review the rewritten text once complete.

---

## ⚙️ Configuration

You can customize the local model settings inside `popup.js`:

```js
const LM_STUDIO_URL = "http://localhost:1234";
const MODEL = "llama-3.2-1b";
````

You can also modify parameters like `temperature`, `top_p`, and `penalties` directly in the script to fine-tune the rewriting behavior.

---

## 📂 Folder Structure

```
├── manifest.json   # Chrome extension manifest (MV3)
├── popup.html      # Popup UI
├── popup.js        # Main logic, rewrite flow, config
├── icons/          # (Optional) Extension icons
```

---

## 🧭 Ethical Use

This tool is intended for:

* Improving clarity, tone, and accessibility
* Personalizing writing style and perspective
* Local, privacy-preserving text experimentation

**Not intended for:**

* AI detection evasion
* Academic dishonesty
* Content manipulation or misrepresentation

---

## 📄 License

MIT License © 2025
You are free to modify, reuse, and extend this project with attribution.

---

## 👤 Author

Developed as part of a **Research & Systems Capstone** on *Controllable Rewriting and Personalization*.

```
