import styles from './multiFormStep-3.module.scss';

function MultiFormStep3() {
    return (
    <div className={styles.formPay}>
        <div className={styles.formCost}>
            <div className={styles.result}>Итог к оплате:</div>
            <div className={styles.money}>898₽</div>
        </div>

        <div className={styles.formContainer}>
            <button className={styles.card}>Выбрать карту</button>
        </div>

        {/* <div className={styles.formContainer}>
            <button className={styles.toPay}>Оплатить</button>
        </div> */}
    </div>
    )
};

export {MultiFormStep3}