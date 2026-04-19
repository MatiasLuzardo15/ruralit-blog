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
    };

    // Optimized Scroll Reveal with IntersectionObserver
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      const isActive = navLinks?.classList.toggle('active');
      const openIcon = menuToggle?.querySelector('.open-icon');
      const closeIcon = menuToggle?.querySelector('.close-icon');
      
      if (openIcon && closeIcon) {
        openIcon.style.display = isActive ? 'none' : 'block';
        closeIcon.style.display = isActive ? 'block' : 'none';
      }
    };

    menuToggle?.addEventListener('click', handleMenuToggle);

    const navItems = navLinks?.querySelectorAll('a');
    navItems?.forEach(link => {
      link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        const openIcon = menuToggle?.querySelector('.open-icon');
        const closeIcon = menuToggle?.querySelector('.close-icon');
        if (openIcon && closeIcon) {
          openIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
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

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close other items in the same accordion
        const parentAccordion = item.parentElement;
        parentAccordion.querySelectorAll('.accordion-item').forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-body').style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          const body = item.querySelector('.accordion-body');
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
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
