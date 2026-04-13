import { Development } from '@/06_shared/icons';
import { WebDesign } from '@/06_shared/icons';
import { Marketing } from '@/06_shared/icons';
import { BrandStrategy } from '@/06_shared/icons';
import { Optimization } from '@/06_shared/icons';
import { Other } from '@/06_shared/icons';
import styles from './multiFormStep-2.module.scss';

const MultiFormStep2 = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.stepItem}>
                <div className={styles.imgItem}><Development /></div>
                <div className={styles.nameItem}>Development</div>
            </div>

            <div className={styles.stepItem}>
                <div className={styles.imgItem}><WebDesign /></div>
                <div className={styles.nameItem}>Web Design</div>
            </div>

            <div className={styles.stepItem}>
                <div className={styles.imgItem}><Marketing /></div>
                <div className={styles.nameItem}>Marketing</div>
            </div>

            <div className={styles.stepItem}>
                <div className={styles.imgItem}><BrandStrategy /></div>
                <div className={styles.nameItem}>Brand Strategy</div>
            </div>

            <div className={styles.stepItem}>
                <div className={styles.imgItem}><Optimization /></div>
                <div className={styles.nameItem}>Optimization</div>
            </div>

            <div className={styles.stepItem}>
                <div className={styles.imgItem}><Other /></div>
                <div className={styles.nameItem}>Other</div>
            </div>
        </div>
    )
};

export {MultiFormStep2}