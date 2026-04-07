import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import BlogSection from './BlogSection';

const App = () => {
  useEffect(() => {
    // Initialize Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }

      // Scroll Reveal Animation
      const revealElements = document.querySelectorAll('.reveal');
      const triggerBottom = window.innerHeight / 5 * 4;
      revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    const setTheme = (theme) => {
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    const handleThemeToggle = () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    };

    themeToggle?.addEventListener('click', handleThemeToggle);

    // Mobile Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    const handleMenuToggle = () => {
      navLinks?.classList.toggle('active');
    };

    menuToggle?.addEventListener('click', handleMenuToggle);

    const navItems = navLinks?.querySelectorAll('a');
    navItems?.forEach(link => {
      link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
      });
    });

    // Smooth Scrolling for Anchor Links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      themeToggle?.removeEventListener('click', handleThemeToggle);
      menuToggle?.removeEventListener('click', handleMenuToggle);
    };
  }, []);

  return <BlogSection />;
};

ReactDOM.createRoot(document.getElementById('react-blog-root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
