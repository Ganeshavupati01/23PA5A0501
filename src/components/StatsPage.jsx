import React, { useContext } from 'react';
import { UrlContext } from '../context/UrlContext';

const StatsPage =() =>{
  const { urlData }= useContext(UrlContext);
  const now = Date.now();

  return (
    <div className="stats-container">
      <h2 style={{textAlign: 'center', color: '#4f46e5', marginBottom: 24}}>URL Statistics</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Created</th>
            <th>Expires</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urlData.map(({ code, longUrl, createdAt, expireAt, clicks }) => {
            const isExpired = now > expireAt;
            return (
              <tr key={code} style={isExpired ? {opacity: 0.5} : {}}>
                <td>
                  {isExpired ? (
                    <span style={{ color: 'red' }}>/{code} (Expired)</span>
                  ) : (
                    <a href={`/${code}`} style={{color: '#4f46e5'}} target="_blank" rel="noopener noreferrer">/{code}</a>
                  )}
                </td>
                <td style={{maxWidth: 180, overflowWrap: 'anywhere'}}>
                  {isExpired ? (
                    <span style={{ color: 'red' }}>{longUrl} (Expired)</span>
                  ) : (
                    <a href={longUrl} target="_blank" rel="noopener noreferrer">{longUrl}</a>
                  )}
                </td>
                <td>{new Date(createdAt).toLocaleString()}</td>
                <td>{new Date(expireAt).toLocaleString()}</td>
                <td>{clicks.length}
                  {clicks.length > 0 && (
                    <details>
                      <summary style={{cursor:'pointer'}}>Details</summary>
                      <ul style={{margin:0, paddingLeft:16}}>
                        {clicks.map((click,i) => (
                          <li key={i} style={{fontSize:'0.95em'}}>
                            {new Date(click.time).toLocaleString()} - {click.referrer} - {click.location}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatsPage;
