const imageUploadInput = document.querySelector('#imageUpload');
const convertButton = document.querySelector('#convertGrayscale');
const uploadedImage = document.querySelector('#uploadedImage');
const grayscaleCanvas = document.querySelector('#grayscaleImage');


imageUploadInput.addEventListener('change', (event) => {
  if (imageUploadInput.files && imageUploadInput.files[0]) {
    const file = imageUploadInput.files[0];

    // Sprawdzenie, czy plik jest obrazem
    if (!file.type.startsWith('image/')) {
      alert('Prosze przeslac plik graficzny');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      uploadedImage.src = e.target.result;
    };

    reader.readAsDataURL(file); //asynchroniczne odczytywanie zawartości pliku.
  }
});


convertButton.addEventListener('click', () => {

  if (!uploadedImage.src) {
    alert('Prosze najpierw wybrac obraz.');
    return;
  }

  const canvas = grayscaleCanvas;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Nie udalo się uzyskac kontekstu 2D dla canvas.');
    return;
  }

  // Ustawienie rozmiaru canvas zgodnie z rozmiarem obrazu
  canvas.width = uploadedImage.naturalWidth;
  canvas.height = uploadedImage.naturalHeight;

  // Narysowanie obrazu na canvasie
  ctx.drawImage(uploadedImage, 0, 0);

  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Przeksztalcenie pikseli na odcienie szarosci
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    // Obliczenie jasnosci piksela
    const grayscale = red * 0.3 + green * 0.59 + blue * 0.11;

    data[i] = data[i + 1] = data[i + 2] = grayscale;
    // data[i + 3] to kanał alfa (przezroczystosc) - pozostawiamy bez zmian
  }

  // Zaktualizowanie obrazu na canvasie
  ctx.putImageData(imageData, 0, 0);
});