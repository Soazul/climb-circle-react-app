import Card from '../Home/Card';

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
        <div id="home" className="py-4" style={{ padding: '15px' }}> 
        <h1>PROFILE page</h1>
            <div className="row mb-4">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                    <div className="input-group px-2">
                        <img src="../images/icon.png" alt="" height="40px" width="40px"/>
                        <input className="form-control rounded ms-3"  placeholder="Search" />
                    </div>
                </div>
            </div>

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