const WEBHOOK_URL = "https://n8n.srv1117365.hstgr.cloud/webhook/54060dba-c8e1-4b78-8e41-23b57ff40cc4/chat";

async function handleSend() {
    const input = document.getElementById('user-input');
    const text = input.value;
    if (!text) return;

    addMessage('user', text);
    input.value = '';

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "sendMessage", // این فیلد برای نود Chat ضروری است
                chatInput: text,
                sessionId: "test_session_" + Math.random() // یک شناسه تصادفی برای حافظه چت
            })
        });

        const data = await response.json();
        
        // در نودهای Chat، پاسخ معمولاً در فیلد output قرار دارد
        const botReply = data.output || "پاسخی دریافت نشد.";
        addMessage('bot', botReply);

    } catch (error) {
        console.error("Error:", error);
        addMessage('bot', "خطا: لطفاً مطمئن شوید Workflow در n8n فعال (Active) است.");
    }
}

function addMessage(role, text) {
    const win = document.getElementById('chat-window');
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerHTML = role === 'bot' ? marked.parse(text) : text;
    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
}