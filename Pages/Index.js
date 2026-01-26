<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Supers IA – LEGADO</title>
  <style>
    body { margin: 0; background: #288BE4; font-family: sans-serif; }
    #landing { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; }
    #app { display: none; padding: 20px; }
    .chat { background: white; height: 70vh; padding: 15px; overflow-y: auto; border-radius: 10px; margin-bottom: 10px; }
    .input-area { display: flex; gap: 10px; }
    .input-area input { flex: 1; padding: 10px; font-size: 16px; }
    .input-area button { padding: 10px 20px; background: #f42547; color: white; border: none; cursor: pointer; }
    .msg { padding: 8px; margin: 5px 0; border-radius: 8px; max-width: 80%; word-break: break-word; }
    .user { background: #ffecec; margin-left: auto; text-align: right; }
    .bot { background: #e3f2fd; }
  </style>
</head>
<body>

<div id="landing">
  <h1>Supers IA – LEGADO</h1>
  <button onclick="enterApp()">Entrar</button>
</div>

<div id="app">
  <div class="chat" id="chatBox"></div>
  <div class="input-area">
    <input type="text" id="userInput" placeholder="Escribe tu mensaje..." onkeypress="if(event.key==='Enter') sendMessage()" />
    <button onclick="sendMessage()">Enviar</button>
  </div>
</div>

<script>
function enterApp() {
  document.getElementById("landing").style.display = "none";
  document.getElementById("app").style.display = "block";
  addMessage("¿Cuál es el nombre de tu personaje?");
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;
  addMessage(msg, true);
  input.value = "";

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    addMessage(data.reply || "La IA no respondió.");
  } catch (e) {
    addMessage("Error al conectar con la IA.");
  }
}

function addMessage(text, isUser = false) {
  const box = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "msg " + (isUser ? "user" : "bot");
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
</script>

</body>
</html>
