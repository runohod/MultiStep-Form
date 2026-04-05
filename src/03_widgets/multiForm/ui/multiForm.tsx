import { LineRounded } from '@/06_shared/icons';
 
const MultiForm = () => {
    return (
        <div className="form">
            <div className="breadCrumbs">
                <svg>Personal Info</svg>
                <LineRounded/>
                <svg>Our services</svg>
                <LineRounded/>
                <svg>Payment</svg>
            </div>
        </div>
    )
}

export default MultiForm