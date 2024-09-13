import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


const Banner = () => {

    return (
        <div className='categories-list pt-2'>
            <Container>
                <ul className="categories-list">
                    <li>
                        <img src="./iphone.png" alt="apple-logo" />
                    </li>
                    <li>
                        <img src="./samsung.png" alt="samsung-logo" />
                    </li>
                    <li>
                        <img src="./redmi.jpg" alt="xiaomi-logo" />
                    </li>
                    <li>
                        <img src="./infinix.png" alt="infinix-logo" />
                    </li>
                    <li>
                        <img src="./techno.jpg" alt="techno-logo" />
                    </li>
                    <li>
                        <img src="./realme.jpg" alt="realme-logo" />
                    </li>
                    <li>
                        <img src="./oppo.png" alt="oppo-logo" />
                    </li>
                    <li>
                        <img src="./vivo.png" alt="vivo-logo" />
                    </li>
                    <li>
                        <img src="./oneplus.png" alt="oneplus-logo" />
                    </li>
                </ul>
            </Container>
        </div>
    );
};

export default Banner;