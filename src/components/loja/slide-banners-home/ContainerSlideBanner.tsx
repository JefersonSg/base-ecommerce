import { getAllActiveBanners } from '@/src/shared/api/GETS';
import Slide from './Slides';

const ContainerSlideBanner = async () => {
  const bannersData = await getAllActiveBanners();

  return <Slide data={bannersData} />;
};

export default ContainerSlideBanner;
