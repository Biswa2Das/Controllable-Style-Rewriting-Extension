// Configuration
const LM_STUDIO_URL = 'http://localhost:1234';
const MODEL = 'llama-3.2-1b';

// DOM elements
const inputTextarea = document.getElementById('inputText');
const outputTextarea = document.getElementById('outputText');
const humaniseBtn = document.getElementById('humaniseBtn');
const copyBtn = document.getElementById('copyBtn');
const statusDiv = document.getElementById('status');
const perspectiveSelect = document.getElementById('perspectiveSelect');
const toneSelect = document.getElementById('toneSelect');
const styleSelect = document.getElementById('styleSelect');
const inputCharCount = document.getElementById('inputCharCount');
const outputCharCount = document.getElementById('outputCharCount');
const humanizeOptionsToggle = document.getElementById('humanizeOptionsToggle');
const humanizeOptions = document.getElementById('humanizeOptions');

// ULTRA-ENHANCED PROMPT - Designed to get below 10% AI detection
function buildUltraHumanPrompt(text, perspective, tone, style) {
    const aggressiveRules = `You are a professional writer making AI text completely undetectable. This is CRITICAL - the output MUST pass AI detectors.

MANDATORY HUMANIZATION TECHNIQUES (APPLY ALL):

SENTENCE VARIATION (CRITICAL):
- Mix ultra-short sentences (3-5 words). With medium ones (10-15 words). And occasionally longer, more complex constructions that flow naturally (20-30 words).
- Never use the same sentence structure twice in a row
- Start sentences differently: questions, statements, exclamations, fragments
- Example: "Here's the thing. AI detection is getting smarter, which means we need to be even smarter about how we write. See what I mean?"

VOCABULARY DIVERSITY:
- NEVER use these AI-giveaway words: "delve", "tapestry", "landscape", "realm", "robust", "leverage", "comprehensive", "facilitate", "utilize", "implement", "transformative", "revolutionary", "unprecedented", "Moreover", "Furthermore", "In conclusion"
- Replace formal words with natural alternatives
- Use contractions everywhere: don't, can't, won't, it's, you're, we're, they're
- Add filler words naturally: "actually", "basically", "honestly", "you know", "I mean", "kind of", "sort of", "pretty much"

HUMAN IMPERFECTIONS (CRITICAL):
- Add slight tangents or side thoughts in parentheses
- Use em dashes for interruption — like this — to break flow
- Include rhetorical questions: "But here's what really matters - does it work?"
- Start sentences with coordinating conjunctions: And, But, So, Or
- Use incomplete thoughts occasionally. Like this.
- Add conversational asides: "and let me tell you", "trust me on this", "here's the kicker"

ELIMINATE AI PATTERNS:
- NO three-item lists with oxford commas (X, Y, and Z)
- NO "First, Second, Third" enumeration
- NO perfect five-paragraph structure
- NO balanced, symmetrical arguments
- NO correlative conjunctions (neither/nor, either/or, whether/or)
- NO extended metaphors or flowery language
- Avoid starting consecutive sentences the same way

ADD PERSONALITY:
- Include personal pronouns (I, you, we) even in third-person
- Show emotion: excitement, frustration, doubt, surprise
- Use casual interjections: "honestly", "seriously", "listen", "look"
- Add conversational transitions: "anyway", "moving on", "now here's the thing"
- Include hedging: "probably", "maybe", "I think", "seems like"

STRUCTURE CHAOS:
- Vary paragraph lengths dramatically (some 1-2 sentences, others 5-6)
- Don't make every paragraph transition smoothly - humans jump topics
- Use unexpected line breaks for emphasis

When you write for ${perspective} perspective with ${tone} tone and ${style} style, don't just switch words - completely reimagine how a REAL PERSON would say this naturally.`;

    let specificGuidance = '';
    
    if (perspective === 'first-person') {
        specificGuidance += `Write as "I" or "we". Share opinions openly. Use phrases like: "In my experience", "I've found that", "Here's what I think", "From where I'm sitting". Be subjective and personal. `;
    } else if (perspective === 'second-person') {
        specificGuidance += `Talk directly to "you". Be conversational. Ask questions: "Ever noticed how...?", "You know what's interesting?", "Think about it for a second". Make it feel like a one-on-one chat. `;
    } else {
        specificGuidance += `Use third-person but keep it lively. Don't be academic and boring. Real people write third-person too, just with personality. `;
    }

    if (tone === 'casual') {
        specificGuidance += `Super relaxed. Contractions everywhere. Slang is fine. Write like texting a friend. Drop formal language completely. `;
    } else if (tone === 'professional') {
        specificGuidance += `Professional but human. Not corporate robot speak. Think: smart colleague explaining over lunch, not a press release. `;
    } else if (tone === 'academic') {
        specificGuidance += `Scholarly but NOT robotic. Real academics have voice and personality. Vary your rhythm. Use complex ideas but express them naturally. `;
    } else if (tone === 'friendly') {
        specificGuidance += `Warm and approachable. Like a helpful friend. Use encouraging language and keep it light. `;
    }

    if (style === 'concise') {
        specificGuidance += `Brief but punchy. Short doesn't mean boring. Pack personality into fewer words.`;
    } else if (style === 'descriptive') {
        specificGuidance += `Rich details but NOT flowery AI language. Use concrete specifics, not vague metaphors.`;
    } else if (style === 'persuasive') {
        specificGuidance += `Convincing but authentic. Real arguments, not just rhetoric. Show conviction.`;
    } else if (style === 'explanatory') {
        specificGuidance += `Clear teaching style. Use real examples. Break things down like explaining to a smart friend.`;
    }

    return `${aggressiveRules}

${specificGuidance}

ORIGINAL TEXT TO COMPLETELY REWRITE:
${text}

YOUR HUMANIZED VERSION (must apply EVERY technique above - AI detectors will check this):`;
}

// Multi-pass humanization with random variation injection
async function performMultiPassHumanization(text, perspective, tone, style) {
    const passes = 2; // Two-pass system for better results
    let currentText = text;
    
    for (let i = 0; i < passes; i++) {
        const prompt = buildUltraHumanPrompt(currentText, perspective, tone, style);
        
        const response = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert at making AI text completely undetectable by AI detectors. You write naturally with variation, personality, and human imperfections. You never sound robotic.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.95, // Maximum variation
                max_tokens: 2500,
                top_p: 0.98, // Very high for maximum diversity
                frequency_penalty: 0.8, // Strong penalty against repetition
                presence_penalty: 0.7, // Encourage new topics/words
                top_k: 100, // Sample from top 100 tokens for variety
            }),
            signal: AbortSignal.timeout(120000)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data?.choices?.[0]?.message?.content) {
            currentText = data.choices[0].message.content.trim();
        } else {
            throw new Error('Invalid response from LM Studio');
        }
        
        // First pass complete, second pass will further humanize
        if (i === 0) {
            statusDiv.textContent = 'First pass complete, refining...';
        }
    }
    
    return currentText;
}

// Post-processing to add final humanization touches
function addFinalHumanTouches(text) {
    let processed = text;
    
    // Remove any remaining AI phrases that slipped through
    const aiPhrases = {
        'it is important to note': 'worth mentioning',
        'it should be noted': 'keep in mind',
        'in order to': 'to',
        'due to the fact that': 'because',
        'in the event that': 'if',
        'at this point in time': 'now',
        'for the purpose of': 'for',
        'in spite of the fact that': 'although',
        'on the other hand': 'but',
        'with regard to': 'about'
    };
    
    Object.entries(aiPhrases).forEach(([aiPhrase, human]) => {
        const regex = new RegExp(aiPhrase, 'gi');
        processed = processed.replace(regex, human);
    });
    
    // Add random variation to sentence endings (occasionally)
    // This mimics human inconsistency
    
    return processed;
}

// Main humanization function
async function humanizeText() {
    const text = inputTextarea.value.trim();
    
    if (!text) {
        showStatus('Please enter text to humanize', 'error');
        return;
    }

    const perspective = perspectiveSelect.value;
    const tone = toneSelect.value;
    const style = styleSelect.value;

    humaniseBtn.disabled = true;
    humaniseBtn.textContent = 'Humanizing (2-pass)...';
    outputTextarea.value = '';
    showStatus('Running advanced humanization...', 'info');

    try {
        // Multi-pass humanization
        let humanizedText = await performMultiPassHumanization(text, perspective, tone, style);
        
        // Final touches
        humanizedText = addFinalHumanTouches(humanizedText);
        
        outputTextarea.value = humanizedText;
        updateCharCount(outputTextarea, outputCharCount);
        showStatus('✓ Ultra-humanized! Test with AI detector now', 'success');

    } catch (error) {
        let errorMessage = 'Humanization failed. ';
        
        if (error.name === 'AbortError' || error.name === 'TimeoutError') {
            errorMessage += 'Timeout - try shorter text or check LM Studio.';
        } else if (error.message.includes('fetch')) {
            errorMessage += 'Cannot connect to LM Studio. Ensure it\'s running on localhost:1234';
        } else {
            errorMessage += error.message;
        }
        
        showStatus(errorMessage, 'error');
        console.error('Error:', error);
    } finally {
        humaniseBtn.disabled = false;
        humaniseBtn.textContent = 'Humanize Text';
    }
}

// Helper functions
function updateCharCount(textarea, countElement) {
    const count = textarea.value.length;
    const maxCount = textarea.getAttribute('maxlength') || '∞';
    countElement.textContent = `${count} / ${maxCount}`;
}

function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

function copyToClipboard() {
    const text = outputTextarea.value;
    
    if (!text) {
        showStatus('Nothing to copy', 'error');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        showStatus('✓ Copied to clipboard', 'success');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Output';
        }, 2000);
    }).catch(err => {
        showStatus('Copy failed', 'error');
        console.error(err);
    });
}

function saveToStorage() {
    chrome.storage.local.set({
        inputText: inputTextarea.value,
        perspective: perspectiveSelect.value,
        tone: toneSelect.value,
        style: styleSelect.value
    });
}

function clearAll() {
    inputTextarea.value = '';
    outputTextarea.value = '';
    updateCharCount(inputTextarea, inputCharCount);
    updateCharCount(outputTextarea, outputCharCount);
    saveToStorage();
    statusDiv.style.display = 'none';
}

// Event listeners
inputTextarea.addEventListener('input', () => {
    updateCharCount(inputTextarea, inputCharCount);
    saveToStorage();
});

outputTextarea.addEventListener('input', () => {
    updateCharCount(outputTextarea, outputCharCount);
});

humanizeOptionsToggle.addEventListener('click', () => {
    humanizeOptions.classList.toggle('collapsed');
    const icon = humanizeOptionsToggle.querySelector('.toggle-icon');
    if (icon) icon.textContent = humanizeOptions.classList.contains('collapsed') ? '▼' : '▲';
});

perspectiveSelect.addEventListener('change', saveToStorage);
toneSelect.addEventListener('change', saveToStorage);
styleSelect.addEventListener('change', saveToStorage);

humaniseBtn.addEventListener('click', humanizeText);
copyBtn.addEventListener('click', copyToClipboard);

const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
}

inputTextarea.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        humanizeText();
    }
});

// Load saved data
chrome.storage.local.get(['inputText', 'perspective', 'tone', 'style'], (result) => {
    if (result.inputText) inputTextarea.value = result.inputText;
    if (result.perspective) perspectiveSelect.value = result.perspective;
    if (result.tone) toneSelect.value = result.tone;
    if (result.style) styleSelect.value = result.style;
    
    updateCharCount(inputTextarea, inputCharCount);
});

// Initialize
updateCharCount(inputTextarea, inputCharCount);
updateCharCount(outputTextarea, outputCharCount);
