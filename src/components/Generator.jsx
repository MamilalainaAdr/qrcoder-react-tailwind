import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSync } from '@fortawesome/free-solid-svg-icons';

export const Generator = () => {
  const [text, setText] = useState('');
  const [qrText, setQrText] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState(false);
  const textInputRef = useRef(null);

  const handleGenerate = () => {
    if (text.trim() === '') {
      setError(true);
      return;
    }
    setQrText(text);
    setShowQR(true);
    setError(false);
  };

  const handleDownloadQR = () => {
    if (!qrText) {
      setError(true);
      return;
    }
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setError(false);
  };

  const handleReload = () => {
    setText('');
    setQrText('');
    setShowQR(false);
    setError(false);
  };

  return (
    <div className='flex flex-col items-center gap-4 p-8'>
      <h1 className='text-2xl md:text-3xl font-bold text-primary-100 fade-in'>
        Générer un Code QR :
      </h1>
      <p className='text-sm md:text-sm  text-black'>
        <span className='text-red-600'>* </span>
        Veuillez entrer le texte dans le champ pour générer le code
      </p>

      <div className='flex flex-col items-center gap-4'>
        <div className={`border-4 ${showQR ? 'border-primary-300' : 'border-primary-300 bg-gray-100'} rounded-lg p-4 flex items-center justify-center w-72 h-72`}>
          {showQR ? (
            <QRCode id='qrcode' value={qrText} size={256} />
          ) : (
            <div className='w-full h-full border border-gray-100 bg-gray-100 rounded-lg'></div>
          )}
        </div>
        <input
          ref={textInputRef}
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Entrez du texte ici...'
          className='p-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100 w-full'
        />
        <div className='flex gap-4'>
          <button
            onClick={handleGenerate}
            className='px-4 py-2 bg-primary-300 text-white rounded-md hover:bg-primary-900 transition-all duration-300'>
            Générer maintenant
          </button>
          <button
            onClick={handleDownloadQR}
            className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900 transition-all duration-300 flex items-center justify-center'>
            <FontAwesomeIcon icon={faDownload} />
          </button>
          <button
            onClick={handleReload}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-900 transition-all duration-300 flex items-center justify-center'>
            <FontAwesomeIcon icon={faSync} />
          </button>
        </div>
      </div>
      {error && (
        <p className='text-red-500 mt-2'>
          {showQR ? 'Vous pouvez télécharger maintenant.' : 'Entrez du texte pour générer un QR Code.'}
        </p>
      )}
    </div>
  );
};

export default Generator;
