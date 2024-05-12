const mineflayer = require('mineflayer');
const { v4: uuidv4 } = require('uuid');

let bot;

// Bot oluşturma ve bağlanma
setTimeout(connectToServer, 5000); // 5 saniye sonra bağlan

function connectToServer() {
  bot = mineflayer.createBot({
    host: '_imstevEmIq.aternos.me', // Minecraft sunucusunun IP adresini buraya girin
    port: 35188, // Sunucunun bağlantı noktası
    username: generateRandomName() // Rastgele kullanıcı adı oluşturma
  });

  // Bağlandığında
  bot.on('login', () => {
    console.log('Bot sunucuya bağlandı!');
  });

  // Sunucudan atılma (kick) durumunda
  bot.on('kicked', (reason, loggedIn) => {
    console.log(`Bot sunucudan atıldı: ${reason}`);
    // Botun adını rastgele değiştirme ve yeniden bağlanma
    bot.username = generateRandomName();
    setTimeout(connectToServer, 5000); // 5 saniye sonra yeniden bağlan
  });

  // Ban durumunda
  bot.on('end', () => {
    console.log('Bot banlandı!');
    // Botun adını rastgele değiştirme ve yeniden bağlanma
    bot.username = generateRandomName();
    setTimeout(connectToServer, 5000); // 5 saniye sonra yeniden bağlan
  });

  // Bot mesaj aldığında
  bot.on('message', (message) => {
    console.log(`Sunucudan mesaj alındı: ${message}`);
    // Örnek olarak "Merhaba" mesajına yanıt verme
    if (message.toString().includes('Merhaba')) {
      bot.chat('Merhaba!');
    }
  });
}

// Rastgele kullanıcı adı oluşturma fonksiyonu
function generateRandomName() {
  return `im_${uuidv4().split('-')[0]}`;
}

// Anti-ban için sürekli hareket etme
setInterval(() => {
  if (bot && bot.entity) {
    bot.setControlState('forward', true); // Sürekli olarak ileri git
    setTimeout(() => {
      bot.setControlState('forward', false); // Hareketi durdur
    }, 1000); // 1 saniye sonra dur
  }
}, 5000); // Her 5 saniyede bir hareket et
