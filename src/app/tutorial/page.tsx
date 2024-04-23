export default async function Page() {
  return (
    <main className="no-nav overflow-auto">
      <article className="prose mx-auto">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
            alt=""
          />
          <figcaption>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </figcaption>
        </figure>
        <p>
          For more information about how to use the plugin and the features it
          includes,{" "}
          <a href="https://github.com/tailwindcss/typography/blob/master/README.md">
            read the documentation
          </a>
          .
        </p>
        <hr />
        <h2>What to expect from here on out</h2>
        <p>
          What follows from here is just a bunch of absolute nonsense I've
          written to dogfood the plugin itself. It includes every sensible
          typographic element I could think of, like <strong>bold text</strong>,
          unordered lists, ordered lists, code blocks, block quotes,{" "}
          <em>and even italics</em>.
        </p>
        <p>It's important to cover all of these use cases for a few reasons:</p>
        <ol>
          <li>We want everything to look good out of the box.</li>
          <li>
            Really just the first reason, that's the whole point of the plugin.
          </li>
          <li>
            Here's a third pretend reason though a list with three items looks
            more realistic than a list with two items.
          </li>
        </ol>
      </article>
    </main>
  );
}
