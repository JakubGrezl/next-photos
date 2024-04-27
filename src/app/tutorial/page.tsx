export default async function Page() {
  return (
    <main className="no-nav overflow-auto">
      <article className="prose mx-auto">
        <h1>Začátky focení</h1>
        <p>
          Ahoj, vítám tě na stránce <strong>Next-Photos</strong>, tato stránka
          slouží k vytváření vlastního portfolia fotografií, také se naučíš jak
          fotit a jak zpracovávat fotografie.
        </p>
        <h2>Co budu potřebovat?</h2>
        <p>
          Na začátek si řekneme, co potřebuješ k cestě na to se stát
          profesionálním fotografem. Na prvním místě je samozřejmě{" "}
          <strong>fotoaparát</strong>, ovšem toto je tak trochu lež, protože na
          začátek ti postačí i mobilní telefon s funkcí manuálního nastavení.
          Dále budeš potřebovat počítač s aplikací <strong>Lightroom</strong>,
          nebo jiné alternativy této aplikace.
        </p>
        <hr />
        <h1>První fotografie</h1>
        <p>Tak už máš všechno připravené? Tudíž se na to můžeme vrhnout</p>
        <p>
          Foťák si zapneme a přepneme ho do tzv.{" "}
          <strong>manuálního módu</strong>
        </p>
        <figure>
          <img src="/tutorial/manual.jpg" alt="Manuální mód" />
          <figcaption>
            Přepnutí do manuálního módu, zdroj:
            https://www.tamaggo.com/2022/10/27/a-quick-guide-to-using-manual-settings-on-your-canon-camera/
          </figcaption>
        </figure>
        <p>
          teď ti na hlavním displaji pravděpodobně vyskočilo hrozně moc
          nastavení, NELEKEJ SE, vše si vysvětlíme!
        </p>
        <p>
          Hlavní nastavení fotoaparátu je důležité pochopit, protože ovlivňuje
          výslednou kvalitu fotografií.
        </p>
        <h1>ISO, clona a rychlost uzávěrky</h1>
        <hr />
        <h2>ISO</h2>
        <p>
          ISO je citlivost snímače na světlo, čím vyšší ISO, tím více světla
          fotoaparát zachytí, bohužel zvyšováním isa se následně zhorší kvalita
          fotografie <strong>zrněním</strong>.
        </p>
        <pre className="overflow-hidden whitespace-normal">
          Tuto funkci použijeme, pokud si chceme zanechat rychlost uzávěrky a
          clonu na jedné hodnotě, ale fotíme v tmavém prostředí, takže fotka je
          při tomto nastavění moc tmavá.
        </pre>

        <figure>
          <img src="/tutorial/iso.avif" alt="ukázka ISO" />
          <figcaption>
            Takto vypadají fotografie s různým isem, zdroj:
            https://photographylife.com/what-is-iso-in-photography
          </figcaption>
        </figure>
        <hr />
        <h2>Clona</h2>
        <p>
          Clona je otvor v objektivu, který ovlivňuje hloubku ostrosti. Nižší
          clonové číslo (např. f/1.8) znamená větší otvor a menší hloubku
          ostrosti, zatímco vyšší clonové číslo (např. f/16) znamená menší otvor
          a větší hloubku ostrosti.
        </p>
        <p>
          <strong>Hloubka ostrosti</strong> je vzdálenost, ve které je
          fotografie ostrá, používá se tedy pro rozmazání pozadí
        </p>

        <figure>
          <img src="/tutorial/aperture.jpg" alt="Ukázka clony" />
          <figcaption>
            Ukázka různých clonových hodnot a jejich vliv na hloubku ostrosti,
            zdroj: https://www.pinterest.com/pin/aperture--714665034588088334/
          </figcaption>
        </figure>

        <hr />
        <h2>Rychlost uzávěrky</h2>
        <p>
          Rychlost uzávěrky je doba, po kterou je snímač fotoaparátu vystaven
          světlu. Rychlost uzávěrky se měří v sekundách a zlomcích sekundy.
        </p>
        <p>
          Rychlost uzávěrky ovlivňuje to, jak dlouho je snímač fotoaparátu
          vystaven světlu, čím delší čas, tím více světla se dostane na snímač.
        </p>
        <figure>
          <img
            src="/tutorial/shutterspeed.png"
            alt="Ukázka rychlosti uzávěrky"
          />
          <figcaption>
            Ukázka rychlosti uzávěrky, zdroj:
            https://www.pinterest.com/pin/examples-of-shutter-speed-in-photography--637189047252210187/
          </figcaption>
        </figure>
      </article>
    </main>
  );
}
