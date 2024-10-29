import { useAdContext } from '../context/AdContext';

const AdComponent = () => {
  const { adsEnabled } = useAdContext();

  return (
    <>
      {adsEnabled && (
        <div id="ad-container">
          <script src="//by.reicezenana.com/r42sXNu9GFHjdSXjY/109807" async />
        </div>
      )}
    </>
  );
};

export default AdComponent;
