import Card from '../Home/Card';
import Header from '../Header';

export default function Profile() {
    const climbs = [
        { username: 'username', caption: 'caption', image: '../images/test.png', likes: 5 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/shoe1.png',likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/test.png',likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/shoe.png',likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/test.png',likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf',image: '../images/hoodie1.png', likes: 10 }
    ];

    return (
        <div id="profile" className="py-4" style={{ padding: '15px' }}> 
            <div className="row mb-4">
                <Header/>
            </div>
            <p>Username</p>
            <p>Password</p>
            <p>0 post 0 followers 0 following</p>
            <div className="row g-3">
                {climbs.map((climb, index) => (
                    <div className="col-12 col-md-6 col-lg-4 col-lg-4 mb-2" key={index}>
                        <Card username={climb.username} caption={climb.caption} likes={climb.likes} image={climb.image}/>
                    </div>
                ))}
            </div>
        </div>
    )
}