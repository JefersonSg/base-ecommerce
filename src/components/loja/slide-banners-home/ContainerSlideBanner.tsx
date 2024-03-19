import { getAllActiveBanners } from '@/src/shared/api/GETS';
import Slide from './Slides';

const ContainerSlideBanner = async () => {
  const bannersData = await getAllActiveBanners();

  if (!bannersData) {
    return <></>;
  }

  return <Slide data={bannersData} />;
};

export default ContainerSlideBanner;
