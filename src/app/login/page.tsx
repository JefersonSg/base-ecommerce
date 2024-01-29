import styles from './styles.module.css';
import Login from '../../components/forms/login/Login';

const page = () => {
  return (
    <div className={styles.login_container}>
      <Login />
    </div>
  );
};

export default page;
