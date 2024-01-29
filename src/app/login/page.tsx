import styles from './styles.module.css';
import LoginPage from '../../components/forms/login/LoginPage';

const page = () => {
  return (
    <div className={styles.login_container}>
      <LoginPage />
    </div>
  );
};

export default page;
