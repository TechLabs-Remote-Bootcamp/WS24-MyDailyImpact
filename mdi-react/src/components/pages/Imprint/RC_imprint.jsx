import ColoredContainers from "../../PageComponents/ColoredContainers/Colored-Containers";

export default function RC_imprint() {
  return (
    <div className="imprint-container">
      <ColoredContainers h2Text="Imprint" h3Text="">
        <div className="imprint-text">
          <p>
            <span className="bold">Owners: </span> Techlabs Bootcamp team
            members, Vivian Sandler, Christine Stockert, Tomislav Varga, Ruchie
            Roell, Vanessa Türker, Menglan Liu, Anna von Bank, Elisabeth
            Prossinger, Kate Kozelkova
          </p>
          <p>
            <span className="bold">Postal address: </span> TechLabs e. V.
            Hafenweg 16 48155 Münster
          </p>
          <p>
            <span className="bold">Contact: </span> info@techlabs.org
          </p>
          <p>
            <span className="bold">Responsible for this content: </span>
            TechLabs & team members listed above
          </p>
          <p>
            <span className="bold">Copyright: </span> &copy;2025 MyDailyImpact
            &copy;2024 TechLabs; All rights reserved. Text, images, graphics,
            sounds, animations and videos as well as their arrangement on the
            website are protected by copyright and other protective laws. The
            content of this website may not be copied, distributed, modified, or
            made accessible to thrid parties for commercial purposes.
          </p>
        </div>
      </ColoredContainers>
    </div>
  );
}
