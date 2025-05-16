// Toggle dark mode with localStorage support
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Check for saved theme preference or use system preference
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

if (savedTheme === "dark") {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Mobile menu toggle (if needed)
const mobileMenuButton = document.getElementById("mobile-menu-button");
// Add mobile menu functionality here if needed

// Tilt Effect
document.addEventListener("DOMContentLoaded", function () {
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });
});

// Formspree
document.addEventListener('DOMContentLoaded', function() {
    // Form Utama (misalnya form contact)
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        handleFormSubmission(contactForm);
    }

    // Form Newsletter
    const newsletterForm = document.querySelector('#newsletterForm');
    
    if (newsletterForm) {
        handleFormSubmission(newsletterForm);
    }

    function handleFormSubmission(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            try {
                // Tampilkan loading
                submitButton.disabled = true;
                submitButton.innerHTML = 'Mengirim...';

                const formData = new FormData(form);

                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sukses!',
                        text: 'Pesan Anda telah terkirim',
                        confirmButtonColor: '#3b82f6'
                    });
                    form.reset();
                } else {
                    throw new Error();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Gagal mengirim pesan',
                    confirmButtonColor: '#ef4444'
                });
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }
});

