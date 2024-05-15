import gojek from "/logo-gojek.png";
import fore from "/logo-fore.png";
import trakindo from "/logo-trakindo.png";
import djarum from "/logo-djarum.png";
import hsbc from "/logo-hsbc.png";
import disney from "/logo-disney.png";
import spotify from "/logo-spotify.png";
import telkomsel from "/logo-telkomsel.png";

export default function Company() {
  return (
    <div>
      <h1 className="container company text-3xl font-semibold" style={{ margin: "30px 0px 20px 95px" }}>
        Trusted by the largest companies
      </h1>
      <div class="images-container">
        <div class="images flex flex-row justify-center mx-2">
          <img src={gojek} alt="gojek" />
          <img src={fore} alt="fore" />
          <img src={trakindo} alt="trakindo" />
          <img src={djarum} alt="djarum" />
          <img src={hsbc} alt="hsbc" />
          <img src={disney} alt="disney" />
          <img src={spotify} alt="spotify" />
          <img src={telkomsel} alt="telkomsel" />
        </div>
      </div>

      <div className="text-tnc text-center self-stretch font-semibold mx-10" style={{ marginBottom: "49px" }}>
        <p>
          All prices displayed are valid at the time the question is asked. Prices may change and vary depending on the products and services selected.
          <br />
          <span className="text-red-500 italic">Terms and Conditions apply.</span>
        </p>
      </div>
    </div>
  );
}
