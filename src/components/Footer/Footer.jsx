import logo from "/logo-website.png";
import instagram from "/socmed-instagram.png";
import facebook from "/socmed-facebook.png";
import twitter from "/socmed-twitter.png";
import linkedin from "/socmed-instagram.png";
import appStore from "/app-store.png";
import googlePlay from "/google-play.png";

const socialMedia = [
  { icon: instagram, text: "Instagram", domain: "https://www.instagram.com" },
  { icon: facebook, text: "Facebook", domain: "https://www.facebook.com" },
  { icon: twitter, text: "Twitter", domain: "https://twitter.com" },
  { icon: linkedin, text: "LinkedIn", domain: "https://www.linkedin.com" }, 
];

export default function Footer() {
  return (
    <div className="flex flex-row justify-center items-center bg-white border" style={{ padding:"10px" }}>
      <div>
        <img src={logo} alt="meet mate" style={{ width: "200px", height: "auto" }} />
      </div>

      <div className="flex flex-row text">
        <ul className="list-disc mx-20">
          <p className="font-semibold text-xl mb-3 text-center">Others</p>
          {["Meet Mate Affiliate", "Blog", "Privacy Notice", "Terms & Conditions", "Meet Mate Ads"].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul>
          <p className="font-semibold text-xl mb-3 text-center ">Follow Us On</p>
          {socialMedia.map(({ icon, text, domain }) => (
            <li key={text} className="sosmed flex flex-row items-center mb-2">
              <a href={domain} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt={text} className="mr-2.5" />
              </a>
              {text}
            </li>
          ))}
        </ul>
        <ul className="mx-20">
          <p className="font-semibold text-xl mb-3 text-center">Download Meet Mate App</p>
          <section className="flex flex-row gap-5">
            <li>
              <a href="https://www.apple.com/app-store/" target="_blank">
                <img src={appStore} alt="app-store" />
              </a>
            </li>
            <li>
              <a href="https://play.google.com/store" target="_blank">
                <img src={googlePlay} alt="google-play" />
              </a>
            </li>
          </section>
        </ul>
      </div>
    </div>
  );
}
