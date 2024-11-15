import React from 'react';
import Card from './Card';

export default function Home() {
    const climbs = [
        { username: 'user1', caption: 'asdfsd', likes: 5 },
        { username: 'user2', caption: 'asdfasdfaf', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', likes: 10 }
      ];

      return (
        <div id="home" className="container">
          <div className="row">
            {climbs.map((climb, index) => (
              <div className="col-md-4" key={index}>
                <Card username={climb.username} caption={climb.caption} likes={climb.likes} />
              </div>
            ))}
          </div>
        </div>
      );
}