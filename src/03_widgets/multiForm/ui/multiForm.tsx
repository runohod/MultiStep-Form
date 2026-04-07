// import { LineRounded } from '@/06_shared/icons';
import styles from './multiForm.module.scss';

interface MultiFormProps { 
    title: string;
    subTitle: string;
    children: React.ReactNode;
    stepNumber: number
}

const MultiForm: React.FC<MultiFormProps> = ({ title, subTitle, children, stepNumber }) => {
    return (
        <div className={styles.formContainer}>
            <div className={styles.breadCrumbs}>{stepNumber}</div>
            <div className="formHeader">
                <h1>{title}</h1>
                <p>{subTitle}</p>
            </div>
            <main className="formContent">
                {children}
            </main>
            <footer className={styles.formFooter}>
                <button className={styles.backButton}>Back</button>
                <button className={styles.continueButton}>Continue</button>
            </footer>
        </div>
    );
};

export default MultiForm


