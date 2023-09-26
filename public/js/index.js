const rconClients = []

function openAddServerGui() {
    const gui = document.getElementById('addServerGui');
    gui.style.display = 'block';
}

function closeAddServerGui() {
    const gui = document.getElementById('addServerGui');
    gui.style.display = 'none';
}

function addServer() {
    const adress = document.getElementById('addServerAdressInput').value
    const port = document.getElementById('addServerPortInput').value
    const rcon = new RCON(adress, port)
    rconClients.push(rcon)
    closeAddServerGui()
}