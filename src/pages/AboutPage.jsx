import logo from "../assets/logo.png";
import { FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";

export default function AboutPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
          <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
            Bienvenidos a
          </h1>
          <div className="stats bg-primary shadow">
            <div className="stat">
              <div className="stat-title text-primary-content text-6xl font-stolen">
                Ember
              </div>
            </div>
          </div>
        </div>

        <div></div>
        {/* Description Text */}
        <p className="relative z-10 mt-6 text-lg leading-8 max-w-2xl mx-auto ">
          En Ember, el estilo se lleva sin esfuerzo y sin reglas. Joyería
          hipoalergénica, resistente y lista para tu día a día, diseñada para
          elevar tu vibe con un toque fresh y auténtico. Desde Nicaragua,
          ofrecemos piezas funcionales, versátiles y con personalidad que dura.
          Más que accesorios, son tu statement diario para brillar con confianza
          y sin complicaciones.
        </p>

        {/* Logo After Paragraph */}
        <div
          style={{
            backgroundImage: `url(${logo})`,
          }}
          className="relative mt-10 h-64 w-full bg-center bg-no-repeat bg-contain pointer-events-none"
          aria-hidden="true"
        />

        <ul class="flex gap-x-4 mt-2">
          <li>
            <a
              href="https://www.instagram.com/ember.nic/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram class="w-8 h-8 hover:scale-110 hover:text-orange-300" />
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/+50581647886"
              target="_blank"
              rel="noreferrer"
            >
              <IoLogoWhatsapp class="w-8 h-8 hover:scale-110 hover:text-orange-300" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
