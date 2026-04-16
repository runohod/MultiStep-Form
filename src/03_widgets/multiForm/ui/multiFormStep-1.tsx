import styles from './multiFormStep-1.module.scss';

function MultiFormStep1() {
    return (
    <form className={styles.formGroup}>
        <div className={styles.formHolder}>
            <label htmlFor="username" className={styles.formName}>Имя пользователя</label>
            <input type="text" id="username" placeholder="name" required />
        </div>

        <div className={styles.formHolder}>
            <label htmlFor="email" className={styles.formName}>Электронная почта</label>
            <input type="email" id="email" placeholder="example@mail.com" required />
        </div>

        <div className={styles.formHolder}>
            <label htmlFor="password" className={styles.formName}>Пароль</label>
            <input type="password" id="password" placeholder="qwerty" required />
        </div>
    </form>
    )
};

export {MultiFormStep1} 