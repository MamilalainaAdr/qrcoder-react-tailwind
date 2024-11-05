import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import jsQR from 'jsqr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faCopy } from '@fortawesome/free-solid-svg-icons';

export const Scanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setError(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(scanResult);
    alert('Texte copié dans le presse-papiers');
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const code = jsQR(imageData, canvas.width, canvas.height);
        if (code) {
          setScanResult(code.data);
          setError(false);
        } else {
          setScanResult('Aucun QR Code trouvé.');
          setError(true);
        }
      };
    };
    setImageFile(file);
  };

  return (
    <div className='flex flex-col items-center gap-4 p-8'>
      <h1 className='text-2xl md:text-3xl font-bold text-primary-100 fade-in'>
        Scanner un Code QR :
      </h1>
      <p className='text-sm md:text-sm  text-black'>
        <span className='text-red-600'>* </span>
        Veuillez placer votre code en face de la caméra pour le scanner
      </p>

      <div className='w-full max-w-lg'>
        <div className='w-72 h-72 mx-auto mb-4 border-4 border-primary-300 rounded-lg bg-gray-100 overflow-hidden'>
          <QrReader
            delay={300}
            onError={handleError}
            onResult={handleScan}
            style={{ width: '100%', height: '100%' }}
            className='rounded-lg'
          />
        </div>
        <div className='flex items-center w-4/59 max-w-lg'>
          <label htmlFor='fileInput'>
            <input
              type='file'
              id='fileInput'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button
              className='whitespace-nowrap px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-900 transition-all duration-300'
              onClick={() => document.getElementById('fileInput').click()}
            >
              Scanner à partir d'un fichier
            </button>
          </label>
          <input
            type='text'
            value={imageFile ? imageFile.name : ''}
            readOnly
            placeholder='Sélectionnez un fichier ...'
            className='ml-2 p-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100 flex-grow'
          />
        </div>
      </div>
      <div className='flex items-center w-full max-w-lg'>
        <textarea
          value={scanResult}
          readOnly
          placeholder='Le texte scanné apparaîtra ici...'
          rows={2}
          className='flex-grow p-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100 w-4/5 max-w-lg resize-none'
        />
        <div className='flex gap-4 ml-6'>
          <button
            onClick={handleCopy}
            className='px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition-all duration-300'
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
          <button
            onClick={handleReload}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-900 transition-all duration-300'
          >
            <FontAwesomeIcon icon={faSync} />
          </button>
      </div>
      
      </div>
      {error && (
        <p className='text-red-500 mt-2'>
          Une erreur est survenue lors de l'utilisation de la caméra ou du traitement du fichier.
        </p>
      )}
    </div>
  );
};

export default Scanner;
