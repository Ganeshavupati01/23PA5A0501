import React, { useState, useContext } from 'react';
import { UrlContext } from '../context/UrlContext';
import { generateShortcode } from '../utils/shortener';
import { useNavigate } from 'react-router-dom';
import logger from '../utils/loggerMiddleware';

const URLForm = () => {
  const [inputs, setInputs]= useState([{ longUrl: '', validity: '', customCode: '' }]);
  const { urlData, setUrlData } = useContext(UrlContext);
  const navigate = useNavigate();

  const handleChange =(i, e) => {
    const newInputs =[...inputs];
    newInputs[i][e.target.name]= e.target.value;
    setInputs(newInputs);
  };

  const handleAddField = () => {
    if (inputs.length < 5) setInputs([...inputs,{ longUrl: '', validity: '', customCode: '' }]);
  };

  const isValidUrl = (url) => /^https?:\/\/.+\..+/.test(url);

  const handleSubmit = () => {
    const newData = [];
    for (const { longUrl, validity, customCode } of inputs) {
      if (!isValidUrl(longUrl)) {
        alert('Invalid URL format.');
        return;
      }
      let code = customCode || generateShortcode();
      if (urlData.find((u) => u.code === code)) {
        alert('Shortcode already exists.');
        return;
      }
      const createdAt = Date.now();
      const expireAt = createdAt + ((parseInt(validity) || 30) * 60000);
      newData.push({ code, longUrl, createdAt, expireAt, clicks: [] });
    }
    logger('Shortened URLs created');
    setUrlData([...urlData, ...newData]);
    setInputs([{ longUrl: '', validity: '', customCode: '' }]);
  };

  return (
    <div>
      <h2 style={{textAlign: 'center', color: '#4f46e5', marginBottom: 24}}>Shorten URLs</h2>
      <form className="url-form" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        {inputs.map((input, idx) => (
          <div key={idx} style={{display: 'flex', gap: 8, marginBottom: 10}}>
            <input name="longUrl" value={input.longUrl} onChange={(e)=> handleChange(idx, e)} placeholder="Long URL" type="url" required />
            <input name="validity" value={input.validity} onChange={(e) =>handleChange(idx, e)} placeholder="Validity (min)" type="number" min="1" />
            <input name="customCode" value={input.customCode} onChange={(e)=> handleChange(idx, e)} placeholder="Custom Code (opt)" />
          </div>
        ))}
        <div style={{display: 'flex', gap: 10, marginTop: 10}}>
          <button type="button" onClick={handleAddField}>Add More</button>
          <button type="submit">Shorten</button>
          <button type="button" onClick={() => navigate('/stats')}>View Stats</button>
        </div>
      </form>
    </div>
  );
};

export default URLForm;