<template>
  <div class="home">
    <h1>Bienvenue sur BookVerse</h1>
    <section class="hero">
      <h2>Découvrez votre prochaine lecture</h2>
      <p>Explorez notre vaste collection de livres et partagez vos impressions avec notre communauté.</p>
      <div class="cta-buttons">
        <router-link to="/books" class="cta-button" aria-label="Parcourir notre catalogue">
          Parcourir le catalogue
        </router-link>
        <router-link to="/search" class="cta-button secondary" aria-label="Rechercher un livre">
          Rechercher un livre
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 3rem 1rem;
}

h1 {
  font-size: 2.8rem;
  color: var(--primary-color);
  margin-bottom: 2.5rem;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

h1::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: var(--header-gradient);
  border-radius: 2px;
}

.hero {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(74, 103, 65, 0.08);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--header-gradient);
  border-radius: 30px 30px 0 0;
}

h2 {
  font-size: 2.2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  line-height: 1.8;
  color: var(--text-color);
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: var(--header-gradient);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 4px 15px rgba(74, 103, 65, 0.15);
}

.cta-button:hover,
.cta-button:focus {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(74, 103, 65, 0.2);
  outline: none;
}

.cta-button.secondary {
  background: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.cta-button.secondary:hover,
.cta-button.secondary:focus {
  background: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem;
    border-radius: 20px;
  }
  
  h1 {
    font-size: 2.2rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
  
  p {
    font-size: 1.1rem;
  }
  
  .cta-button {
    width: 100%;
    text-align: center;
  }
}
</style> 