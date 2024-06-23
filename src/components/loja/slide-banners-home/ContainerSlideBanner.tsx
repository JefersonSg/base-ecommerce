import LoadingBanners from './LoadingBanners';
import Slide from './Slides';
import bannersActiveGet from '@/src/actions/banners-active-get';

const ContainerSlideBanner = async () => {
  const bannersData = await bannersActiveGet();

  console.log(bannersData);
  if (!bannersData?.banners) {
    return <LoadingBanners />;
  }

  return <Slide data={bannersData} />;
};

export default ContainerSlideBanner;
