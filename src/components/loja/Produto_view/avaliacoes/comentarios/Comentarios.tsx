import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Comentario from './Comentario';
import styles from './Comentarios.module.css';

function Comentarios() {
  return (
    <div className={styles.comentarios_container}>
      <div className={styles.botao_comentar}>
        <BotaoColorido texto="Comentar" />
      </div>
      <Comentario
        data={'Hoje, há 2 horas atrás'}
        nome={'Ludimila'}
        estrelas={4}
        tamanho="300ml"
        cor="Branco"
        comentario="Perfeito para quem quer resultados 
                    rápidos e funcionais, comprei e não 
                    me arrependo, muito bom e barato."
      />
    </div>
  );
}

export default Comentarios;
