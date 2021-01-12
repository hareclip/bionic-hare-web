import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

export default function SocialTab({ social }) {

  if (!social) {
    return <></>;
  }

  return (
    <div className="flex flex-col md:items-end">
      <p className="text-lg mb-3">Connect with Us</p>
      <div className="flex flex-row">
        {
          social.facebook
            ? (
              <a className="mr-3 ml-0 md:ml-3 md:mr-0" href={social.facebook}>
                <FontAwesomeIcon size="2x" icon={faFacebookSquare} />
              </a>
            )
            : <></>
        }
        {
          social.twitter
            ? (
              <a className="mr-3 ml-0 md:ml-3 md:mr-0" href={social.twitter}>
                <FontAwesomeIcon size="2x" icon={faTwitterSquare} />
              </a>
            )
            : <></>
        }
        {
          social.instagram
            ? (
              <a className="mr-3 ml-0 md:ml-3 md:mr-0" href={social.instagram}>
                <FontAwesomeIcon size="2x" icon={faInstagramSquare} />
              </a>
            )
            : <></>
        }
      </div>
    </div >
  );
}