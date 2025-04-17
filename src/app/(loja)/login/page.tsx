import LoginPage from '@/src/components/compartilhado/login/LoginPage';
import styles from './styles.module.css';

const Page = () => {
  return (
    <div className={styles.login_container}>
      <LoginPage />
    </div>
  );
};

export default Page;
