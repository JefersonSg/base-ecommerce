import { type UserInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './ProfileContainer.module.css';
import ProfileUSuario from './Usuario';
import ProfileNAvBUttons from './NavButtons';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { Titulo } from '../../compartilhado/textos/Titulo';

const ProfileContainer = ({ userData }: { userData: UserInterface }) => {
  return (
    <div className={styles.profile_container}>
      <Breadcrumb texto1="Minha conta" />
      <Titulo titulo="Minha conta" />
      <div className={styles.user_infos}>
        <ProfileUSuario userData={userData} />
        <ProfileNAvBUttons />
      </div>
    </div>
  );
};

export default ProfileContainer;
