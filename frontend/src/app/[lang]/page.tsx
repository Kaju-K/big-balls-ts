import Image from "next/image";
import React from "react";
import homePageImage from "@/../public/home-page.jpg";
import homeBallImage from "@/../public/home-ball.jpg";
import homePlayerImage from "@/../public/home-player.jpg";
import goalImage from "@/../public/goal-icon.png";
import ballImage from "@/../public/ball-icon.png";
import logo from "@/../public/logo.png";
import Link from "next/link";

export default function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className="flex flex-col">
      <div className="relative w-full">
        <Image
          src={homePageImage}
          sizes="100w"
          // fill
          alt=""
          className="w-full"
          priority
        />
        <Image
          src={logo}
          alt="big balls logo"
          className="absolute left-5 top-5"
          priority
        />
        <Link
          href={`/${lang}/sign-in`}
          className="absolute bottom-5 right-5 rounded-2xl bg-background px-6 py-1 text-2xl text-accent-foreground"
        >
          Inscrever-se
        </Link>
      </div>
      <div className="relative w-full">
        <Image src={homeBallImage} alt="" sizes="100w" className="w-full" />
        <div className="absolute left-1/2 top-1/2 z-10 flex w-4/5 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-4 text-center text-2xl">
        {/* Tough guy */}
          <h2 className="text-secondary-foreground">Fala, Marrento!</h2>
          <p className="text-accent-foreground">
            Big Balls é sua nova aposta para aquele bolão entre amigos,
            marrentos como você. Simples, divertido e gratuito!
            <br /> E aí, você tem?
          </p>
          <Link
            href={`/${lang}/sign-in`}
            className="rounded-2xl bg-destructive-foreground px-6 py-1 text-accent-foreground"
          >
            Inscrever-se
          </Link>
        </div>
        <Image src={goalImage} alt="" className="absolute bottom-12 left-8" />
      </div>
      <div className="relative w-full">
        <Image src={homePlayerImage} alt="" sizes="100w" className="w-full" />
        <div className="absolute left-1/2 top-1/2 z-10 flex w-4/5 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-3 text-center">
          <h2 className="text-x1 text-secondary-foreground">
            SOMOS MARRENTOS, MAS SOMOS FACINHOS!
          </h2>
          <p className="text-base text-accent-foreground">
            Crie uma liga e convide seus amigos, ou inscreva-se em uma liga já
            existente.
          </p>
          <p className="text-base text-accent-foreground">
            A cada rodada, você aposta no Mandante do jogo, no Empate ou no
            Visitante. O sistema automaticamente vai te exibindo as estatísticas
            de cada um, de acordo com os marrentos da sua liga e de todo o
            serviço.
          </p>
          <p className="text-base text-accent-foreground">
            Se você acertar sua aposta, ganha na sua pontuação 100 menos a
            estatística do seu resultado. Exemplo: Apostou no time Mandante, que
            tem 63% dos apostadores, e esse time ganhou na rodada, você ganha 37
            pontos (100 - 63).
          </p>
          <Link
            href={`/${lang}/learn-more`}
            className="rounded-2xl bg-background px-6 py-1 text-accent-foreground"
          >
            Saiba Mais
          </Link>
          <p className="text-base text-accent-foreground">
            Acumule pontos a cada rodada e curta com a cara de seus amigos.
            Afinal, você é o Big!
          </p>
        </div>
        <Image src={ballImage} alt="" className="absolute bottom-12 right-8" />
      </div>
    </div>
  );
}
