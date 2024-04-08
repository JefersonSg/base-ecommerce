import { type UserInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './ProfileContainer.module.css';
import ProfileUSuario from './Usuario_edit';
import Breadcrumb from '../../breadcrumb/Breadcrumb';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';

const ProfileContainerEdit = ({ userData }: { userData: UserInterface }) => {
  return (
    <div className={styles.profile_container}>
      <Breadcrumb texto1="Minha conta" link1="/minha-conta" texto2="Editar" />
      <Titulo titulo="Editar perfil" />
      <div className={styles.user_infos}>
        <ProfileUSuario userData={userData} />
      </div>
    </div>
  );
};

export default ProfileContainerEdit;
