import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/max.png"
          alt="An image showing Max"
          width={400}
          height={400}
        />
      </div>

      <h1>Hi, I'm Woncheol</h1>

      <p>
        I'm a web developer in South Korea - especially frontend frameworks like
        React.
      </p>
    </section>
  );
}

export default Hero;
