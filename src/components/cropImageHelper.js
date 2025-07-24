export default function getCroppedImg(imageSrc, cropPixels) {
  const canvas = document.createElement("canvas");
  const image = new Image();

  const targetWidth = 150;
  const targetHeight = 150;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        cropPixels.x,
        cropPixels.y,
        cropPixels.width,
        cropPixels.height,
        0,
        0,
        targetWidth,
        targetHeight
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      }, "image/jpeg");
    };

    image.onerror = reject;
    image.src = imageSrc;
  });
}
