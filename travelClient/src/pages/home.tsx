import axios from 'axios';
import React, { useEffect } from 'react';
import SingUp from '../Forms/singUp';

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Home = () => {

    useEffect(() => {
        signup()
        console.log("check check");
    }, [])

    const signup = () => {
        axios
            .post<any>("http://localhost:3000/signup", {
                userName: "test user",
                userEmail: "sangrg226@gmail.com",
                password: "user",
                role: "user",
                active: false
            })
            .then(data => console.log(data.data))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <SingUp />
            {/* <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel> */}
        </div>
    )
}

export default Home