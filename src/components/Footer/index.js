import SocialTab from './SocialTab';
import siteInfo from 'config/siteInfo.json';

/**
 * Site footer
 */
export default function Footer() {

  return (
    <div className="w-100 bg-gray-500 text-white p-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="col-span-full md:col-start-1 md:col-span-4">
          <p className="italic">{siteInfo.tagline}</p>
        </div>
        <div className="col-span-full md:col-start-9 md:col-span-4">
          <SocialTab social={siteInfo.social} />
        </div>
        <div className="col-span-full">
          <div className="flex justify-center text-xs text-gray-700">
            {siteInfo.copyright
              ? <p>{siteInfo.name} - ©{siteInfo.copyright}</p>
              : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}