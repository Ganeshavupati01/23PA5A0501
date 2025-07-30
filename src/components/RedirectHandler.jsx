import React, { useContext, useEffect, useRef } from 'react';
import '../styles/classic.css';
import { useParams } from 'react-router-dom';
import { UrlContext } from '../context/UrlContext';

const RedirectHandler = () => {
  const { shortcode }= useParams();
  const { urlData, setUrlData }= useContext(UrlContext);
  const redirectedRef= useRef(false); 

  useEffect(() => {
    if (redirectedRef.current)return;

    const index = urlData.findIndex(item => item.code === shortcode);
    if (index === -1) {
      alert('Invalid shortcode!');
      return;
    }

    const urlEntry =urlData[index];
    const now =Date.now();

    if (now > urlEntry.expireAt) {
      alert('This link has expired!');
      return;
    }

    redirectedRef.current = true;

    const click = {
      time: now,
      referrer:document.referrer || 'direct',
      location: 'unknown'
    };

    const updatedEntry= {
      ...urlEntry,
      clicks: [...urlEntry.clicks, click]
    };

    const updatedData = [...urlData];
    updatedData[index] = updatedEntry;

    setUrlData(updatedData);
    localStorage.setItem('urlData', JSON.stringify(updatedData));

    window.location.href= urlEntry.longUrl;
  }, [shortcode, urlData,setUrlData]);

  return (
    <div className="redirect-container">
      <p>Redirecting...</p>
    </div>
  );
};

export default RedirectHandler;
