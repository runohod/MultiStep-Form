import { useFormStore } from '@/05_entities/store/useFormStore';
import clsx from 'clsx';
import { Development } from '@/06_shared/icons';
import { WebDesign } from '@/06_shared/icons';
import { Marketing } from '@/06_shared/icons';
import { BrandStrategy } from '@/06_shared/icons';
import { Optimization } from '@/06_shared/icons';
import { Other } from '@/06_shared/icons';
import styles from './multiFormStep-2.module.scss';

const services = [
    { id: 'development', label: 'Development', icon: <Development /> },
    { id: 'design', label: 'Web Design', icon: <WebDesign /> },
    { id: 'marketing', label: 'Marketing', icon: <Marketing /> },
    { id: 'brand', label: 'Brand Strategy', icon: <BrandStrategy /> },
    { id: 'optimization', label: 'Optimization', icon: <Optimization /> },
    { id: 'other', label: 'Other', icon: <Other /> },
];

const MultiFormStep2 = () => {
    const { formData, setFormData } = useFormStore();
    const handleSelect = (serviceLabel: string) => {
        setFormData({ service: serviceLabel });
    };

    return (
        <div className={styles.mainContainer}>
            {services.map((service) => (
                <div 
                    key={service.id} 
                    className={clsx(styles.stepItem, {
                    [styles.active]: formData.service === service.label
                    })}
                    onClick={() => handleSelect(service.label)}
                >
                <div className={styles.imgItem}>{service.icon}</div>
                <div className={styles.nameItem}>{service.label}</div>
                </div>
            ))}
        </div>
    );
};

export {MultiFormStep2}